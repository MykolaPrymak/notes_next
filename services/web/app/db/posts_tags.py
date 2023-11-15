from .base import db


class PostsTags(db.Model):
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id'), primary_key=True)
