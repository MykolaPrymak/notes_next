from flask import Blueprint, jsonify
from werkzeug.exceptions import HTTPException
from .auth import auth_bp
from .users import users_bp
from .posts import posts_bp
from .tags import tags_bp

bp = Blueprint('api', __name__, url_prefix='/api')

# Add API routes
bp.register_blueprint(auth_bp)
bp.register_blueprint(users_bp)
bp.register_blueprint(posts_bp)
bp.register_blueprint(tags_bp)

@bp.route("/")
def hello_world():
    return jsonify(hello="world")

# Handle API errors
@bp.errorhandler(HTTPException)
def http_api_error(error):
    print("http_api_error", error)
    return jsonify({"code": error.code, "name": error.name}), error.code


# @bp.errorhandler(Exception)
# def generic_api_error(error):
#     print("generic_api_error", error)
#     return jsonify({"code": 500, "name": "Server Error"}), 500
