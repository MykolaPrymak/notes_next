from flask import Blueprint, jsonify, request
from app.db import User, Post, Tag

bp = Blueprint('api', __name__, url_prefix='/api')

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

@bp.route("/posts")
def posts_api():
    # searchword = request.args.get('id', None)
    db_query = Post.query

    return jsonify({
        "posts": [post.to_dict(include_author=True, include_tags=True) for post in db_query.all()],
        "count": db_query.count()
    })

@bp.route("/tags")
def tags_api():
    # searchword = request.args.get('id', None)
    db_query = Tag.query

    return jsonify([tag.name for tag in Tag.query.all()])

# from app.errors import handlers