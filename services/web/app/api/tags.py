from flask import Blueprint, jsonify
from app.db import Tag

tags_bp = Blueprint('api_tags', __name__, url_prefix='tags/')

@tags_bp.route("/")
def tags_api():
    return jsonify([tag.name for tag in Tag.query.all()])

@tags_bp.route("/<string:name>")
def tag_api(name:str = ''):
    return jsonify(Tag.query.filter_by(name=name).first_or_404().to_dict())
