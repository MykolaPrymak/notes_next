from flask import Blueprint, jsonify
from app.db import User

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route("/")
def hello_world():
    return jsonify(hello="world")

@bp.route("/users")
def list_users():
    # users = db.session.query(User).all()
    data = User.query.all()
    # data = User.query.filter_by(id = 2)
    # data = User.query.filter_by(email = "aaa")
    print(data)
    result = [{
        "id": d.id,
        "login": d.login,
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


# from app.errors import handlers