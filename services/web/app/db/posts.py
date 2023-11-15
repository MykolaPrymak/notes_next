from datetime import datetime
from .base import db
from .posts_tags import PostsTags


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(512))
    body = db.Column(db.String(8 * 1024 * 1024))  # 8 MB of text for post boy
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    private = db.Column(db.Boolean(), default=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    tags = db.relationship(
        'Tag', secondary=PostsTags.__tablename__, back_populates="posts", lazy='dynamic')

    def __repr__(self):
        return '<Post {id}:{body}>'.format(id=self.id, body=self.body)

    def to_dict(self, include_author: bool = False, include_tags: bool = False):
        # Expose basic columns
        post_dict = {k: getattr(self, k)
                     for k in self.__table__.columns.keys()}

        if (include_author):
            post_dict.pop("user_id")
            post_dict = {**post_dict,
                         "author": self.author.to_dict(short=True)}

        if (include_tags):
            post_dict = {
                **post_dict, "tags": [tag.to_dict().get("name") for tag in self.tags]}

        return post_dict
