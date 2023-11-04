from flask import Blueprint, jsonify, request
from werkzeug.exceptions import HTTPException
from app.db import User, Post, Tag
from .auth import auth_bp

bp = Blueprint('api', __name__, url_prefix='/api')

# Add auth routes
bp.register_blueprint(auth_bp)

@bp.route("/")
def hello_world():
    return jsonify(hello="world")

@bp.route("/users")
def users_api():
    # users = db.session.query(User).all()
    data = User.query.all()
    # data = User.query.filter_by(id = 2)
    # data = User.query.filter_by(email = "aaa")
    print(data)
    result = [{
        "id": d.id,
        "login": d.username,
        "email": d.email,
        "active": d.active,
        "password_hash": d.hash,
    } for d in data]
    # result = [d for d in data]

    print(data)
    print(data)
    print(data)
    # print(data.count())
    # return jsonify(result=result)
    return jsonify([user.to_dict() for user in data])

@bp.route("/posts/")
def posts_api():
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

@bp.route("/posts/<int:post_id>")
def single_post_api(post_id:int = None):
    return jsonify(Post.query.filter_by(id=post_id).first_or_404().to_dict(include_author=True, include_tags=True))


@bp.route("/tags")
def tags_api():
    # searchword = request.args.get('id', None)
    db_query = Tag.query

    return jsonify([tag.name for tag in Tag.query.all()])

@bp.route("/tags/<string:name>")
def tag_api(name:str = ''):
    return jsonify(Tag.query.filter_by(name=name).first_or_404().to_dict())


# Handle API errors
@bp.errorhandler(HTTPException)
def http_api_error(error):
    print("http_api_error", error)
    return jsonify({"code": error.code, "name": error.name}), error.code

@bp.errorhandler(Exception)
def generic_api_error(error):
    print("generic_api_error", error)
    return jsonify({"code": 500, "name": "Server Error"}), 500
# from app.errors import handlers