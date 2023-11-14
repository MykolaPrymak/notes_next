from flask import Blueprint, jsonify
from app.db import User

users_bp = Blueprint('api_users', __name__, url_prefix='users/')

@users_bp.route("/")
def users_api():
    data:list[User] = User.query.all()

    return jsonify([user.to_dict(short=True) for user in data])
