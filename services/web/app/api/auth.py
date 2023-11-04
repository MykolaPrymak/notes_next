from flask import Blueprint, jsonify, request
from werkzeug.exceptions import HTTPException
from app.db import User, Post, Tag

auth_bp = Blueprint('api_auth', __name__, url_prefix='auth/')

@auth_bp.route("/")
def auth_base():
    return jsonify(hello="world_2")

@auth_bp.route("/me")
def auth_me():
    return jsonify(hello="world")
