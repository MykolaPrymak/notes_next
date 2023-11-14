from flask import Blueprint, jsonify, request
from .validator import post_shema, SchemaError
from .decorators import user_authentificated
from app.db import Post

posts_bp = Blueprint('api_posts', __name__, url_prefix='posts/')

@posts_bp.route("/")
def posts_list():
    tag = request.args.get('tag')
    user_id = request.args.get('user_id')

    db_query = Post.query

    # Apply filters
    if (user_id is not None):
        db_query = db_query.filter_by(user_id=user_id)

    if (tag is not None):
        db_query = db_query.filter(Post.tags.any(name=tag))

    return jsonify({
        "tag": tag,
        "posts": [post.to_dict(include_author=True, include_tags=True) for post in db_query.all()],
        "count": db_query.count()
    })

@posts_bp.route("/", methods=["POST"])
@user_authentificated
def posts_add():
    print("Adding post")
    print(request.form)

    try:
        post = post_shema.validate(request.form.to_dict())
    except SchemaError:
        return jsonify({"code": 400, "name": "form validation error"}), 400
    except:
        return jsonify({"code": 400, "name": "error"}), 400

    post_title = post.get('title', None)
    post_body = post.get('body', None)
    post_tags = post.get('tags', None)
    is_post_private = post.get('is_private', None) == 'true'

    print('validated post')
    print(post)

    if (post_title is not None and post_body is not None):
        pass

    return jsonify({"status":"OK"})


@posts_bp.route("/<int:post_id>")
def single_post_api(post_id:int = None):
    return jsonify(Post.query.filter_by(id=post_id).first_or_404().to_dict(include_author=True, include_tags=True))


