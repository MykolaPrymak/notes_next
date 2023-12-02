from datetime import datetime
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

    db_query = Post.query

    # Apply filters
    if (user_id is not None):
        db_query = db_query.filter_by(user_id=user_id)

    if (tag is not None):
        db_query = db_query.filter(Post.tags.any(name=tag))

    # Add private filter
    if session.get("is_authenticated") is True:
        current_user_id = session.get('user').get("id")
        # comibne public post and all my
        db_query = db_query.filter(
            (Post.private == False) | (Post.user_id == current_user_id))
    else:
        db_query = db_query.filter_by(private=False)

    # Add pagination
    paginated_query = db_query.order_by(
        Post.created_at.desc()).paginate(page=page, per_page=per_page)

    # TODO: return empty list if we out of range
    return jsonify({
        "posts": [post.to_dict(include_author=True, include_tags=True) for post in paginated_query.items],
        "count": db_query.count()
    })

@posts_bp.route("/<int:post_id>")
def single_post_api(post_id: int = None):
    post:Post = Post.query.filter_by(id=post_id).first_or_404()
    
    if session.get("is_authenticated") is True:
        current_user_id = session.get('user').get("id")
    else:
        current_user_id = None

    if (post.private is True) and (post.user_id is not current_user_id):
        return jsonify({"code": 404, "name": "Post not found"}), 404

    return jsonify(post.to_dict(include_author=True, include_tags=True))


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

@posts_bp.route("/<int:post_id>", methods=["PUT"])
@user_authentificated
def update_post_api(post_id: int = None):
    user_id = session.get('user').get('id')
    post:Post = Post.query.get(post_id)
    # , user_id=user_id).first_or_404()

    # Return 404 if we not found post, or current user is not an author of the post
    if (post is None) or (post.user_id is not user_id):
        return jsonify({"code": 404, "name": "Post not found"}), 404

    # Prepare data
    try:
        post_data: dict = post_shema.validate(request.form.to_dict())
    except SchemaError as er:
        print(er)
        return jsonify({"code": 400, "name": "form validation error"}), 400
    except:
        return jsonify({"code": 400, "name": "error"}), 400

    # Update post/tags to DB
    try:
        # Create Tag or get Tag from DB
        post_data.update({"tags": create_tags_safe(post_data.get('tags'))})

        post.title = post_data.get('title', post.title)
        post.body = post_data.get('body', post.body)
        post.tags = post_data.get('tags', [])
        post.private = post_data.get('private', post.private)
        post.updated_at = datetime.utcnow()

        # db.session.add(post)
        db.session.commit()

        return jsonify({"status": "OK", "post": post.to_dict(include_tags=True)})
    except:
        return jsonify({"code": 500, "name": "Server error"}), 500

@posts_bp.route("/<int:post_id>", methods=["DELETE"])
@user_authentificated
def delete_post_api(post_id: int = None):
    current_user_id = session.get('user').get("id")
    post:Post = Post.query.get(post_id)

    print({post})
    # Return 404 if we not found post, or current user is not an author of the post
    if (post is None) or (post.user_id is not current_user_id):
        return jsonify({"code": 404, "name": "Post not found"}), 404

    try:
        db.session.delete(post)
        db.session.commit()

        return jsonify({"status": "OK"})
    except:
        return jsonify({"code": 500, "name": "Server error"}), 500
