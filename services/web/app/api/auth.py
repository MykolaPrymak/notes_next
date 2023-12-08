from flask import Blueprint, jsonify, session, request
from sqlalchemy.exc import NoResultFound
from app.db import User
from .decorators import user_authentificated

auth_bp = Blueprint('api_auth', __name__, url_prefix='auth/')

@auth_bp.route("/")
def auth_base():
    return jsonify(status="OK")

@auth_bp.route("/login", methods=['POST'])
def auth_login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    user:User | None = None
    try:
        target_user:User = User.query.filter_by(username=username).one()
        target_user.verify_passowrd(password)

        user = target_user
    except NoResultFound:
        print("User not found")
    except Exception:
        print("something bad happend")

    if user is None:
        return jsonify(error="Not found", message="Incorect login or password"), 404

    session['is_authenticated'] = True
    session['user'] = user.to_dict()

    return jsonify(user.to_dict(short=True))

@auth_bp.route("/logout", methods=['POST'])
@user_authentificated
def auth_logout():
    if session.get("is_authenticated") is True:
        session.pop("is_authenticated")
        session.pop("user")

    return jsonify(status="OK")

@auth_bp.route("/me")
def auth_me():
    if session.get('is_authenticated') is True:
        return jsonify(session["user"])

    return jsonify(None)
