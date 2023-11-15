from .base import db
from .posts_tags import PostsTags

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    #  backref2='post_tags'
    posts = db.relationship(
        'Post', secondary=PostsTags.__tablename__, back_populates="tags", lazy='dynamic')

    def __init__(self, name: str):
        self.name = name.lower().strip()
        if len(self.name) == 0:
            raise ValueError("Tag name can't be empy")

        # print('post_tag_association_table', post_tag_association_table)
        print('post_tag_association_table', PostsTags.__tablename__)

    def __repr__(self):
        return '<Tag {id}:{name}>'.format(id=self.id, name=self.name)

    def to_dict(self):
        return {k: getattr(self, k) for k in self.__table__.columns.keys()}
