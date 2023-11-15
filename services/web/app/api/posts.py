from flask import Blueprint, jsonify, request, session
from .validator import post_shema, normalize_page_num, SchemaError
from .decorators import user_authentificated
from app.db import db, Post, User, Tag

posts_bp = Blueprint('api_posts', __name__, url_prefix='posts/')


def create_tags_safe(tag_names: list[str]):
    return map(lambda name: Tag.query.filter_by(name=name).first() or Tag(name), tag_names)


@posts_bp.route("/")
def posts_list():
    tag = request.args.get('tag')
    user_id = request.args.get('user_id')
    page = max(request.args.get('page', 1, int), 1)
    per_page = normalize_page_num(request.args.get('limit', 10, int))

    print({"page": page, "per_page": per_page})

    db_query = Post.query

    # Apply filters
    if (user_id is not None):
        db_query = db_query.filter_by(user_id=user_id)

    if (tag is not None):
        db_query = db_query.filter(Post.tags.any(name=tag))

    # Add pagination
    paginated_query = db_query.paginate(page=page, per_page=per_page)

    return jsonify({
        "posts": [post.to_dict(include_author=True, include_tags=True) for post in paginated_query.items],
        "count": db_query.count()
    })


@posts_bp.route("/", methods=["POST"])
@user_authentificated
def posts_add():
    # Prepare data
    try:
        post_data: dict = post_shema.validate(request.form.to_dict())
    except SchemaError as er:
        print(er)
        return jsonify({"code": 400, "name": "form validation error"}), 400
    except:
        return jsonify({"code": 400, "name": "error"}), 400

    # Add post/tags to DB
    try:
        post_data.update({"tags": create_tags_safe(post_data.get('tags'))})

        author = User.query.filter_by(id=session.get('user').get('id')).first()
        post = Post(**post_data, author=author)

        db.session.add(post)
        db.session.commit()

        return jsonify({"status": "OK", "post": post.to_dict(include_tags=True)})
    except:
        return jsonify({"code": 500, "name": "Server error"}), 500


@posts_bp.route("/<int:post_id>")
def single_post_api(post_id: int = None):
    return jsonify(Post.query.filter_by(id=post_id).first_or_404().to_dict(include_author=True, include_tags=True))
