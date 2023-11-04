from datetime import datetime
from argon2 import PasswordHasher
import json
from .base import db

ph = PasswordHasher()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    name = db.Column(db.String(128), unique=False, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    _password = db.Column('password', db.String(128), nullable=False)

    posts = db.relationship('Post', backref='author', lazy='dynamic')

    # from sqlalchemy.orm import validates

    def __init__(self, email:str, **kwargs):
        self.email = email
        self.name = kwargs.get("name", email)
        self.username = kwargs.get("username", email)

        self.password = kwargs.get('password')

    def __repr__(self):
        # bb = {k: getattr(self, k) for k in self.__table__.columns.keys()}
        print(self.to_dict())
        return json.dumps(self.to_dict())

    def __str__(self):
        # return f'The value post_tag_association_tableof pi is approximately {math.pi:.3f}.' self.id + " " + self.lastName
        return "AAAA"

    def to_dict(self, short:bool = False):
        dict_keys = self.__table__.columns.keys()

        if (short is True):
            dict_keys = ['id', 'username']

        return {k: getattr(self, k) for k in dict_keys}

    def verify_passowrd(self, password:str) -> bool:
        return ph.verify(self._password, password)
        # return None

    @property
    def password(self):
        print('Try to access the password')
        return None

    @property
    def hash(self) -> str | None:
        print('Try to access the password hash')
        return self._password

    @password.setter
    def password(self, password):
        print('Try to set a password', password)
        if (password is not None):
            hash = ph.hash(password)
            self._password = hash



# post_tag_association_table = db.Table(
#     'post_tags',
#     db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True),
#     db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
# )

class PostsTags(db.Model):
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(512))
    body = db.Column(db.String(8 * 1024 * 1024)) # 8 MB of text for post boy
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

# backref2='post_tags'
    tags = db.relationship('Tag', secondary=PostsTags.__tablename__, back_populates="posts", lazy='dynamic')

    # tags = db.relationship(__table__
    #     'Tag', secondary=post_tag_association_table,
    #     primaryjoin=(post_tag_association_table.c.tag_id == id),
    #     secondaryjoin=(post_tag_association_table.c.post_id == id),
    #     backref=db.backref('post_tags', lazy='dynamic'), lazy='dynamic')


    def __repr__(self):
        return '<Post {id}:{body}>'.format(id=self.id, body=self.body)
    
    def to_dict(self, include_author: bool = False, include_tags:bool = False):
        # Expose basic columns
        post_dict = {k: getattr(self, k) for k in self.__table__.columns.keys()}

        if (include_author):
            post_dict.pop("user_id")
            post_dict = {**post_dict, "author": self.author.to_dict(short=True)}

        if (include_tags):
            post_dict = {**post_dict, "tags": [tag.to_dict().get("name") for tag in self.tags]}

        return post_dict
    
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    #  backref2='post_tags'
    posts = db.relationship('Post', secondary=PostsTags.__tablename__, back_populates="tags", lazy='dynamic')

    def __init__(self, name:str):
        self.name = name.lower().strip()
        # print('post_tag_association_table', post_tag_association_table)
        print('post_tag_association_table', PostsTags.__tablename__)

    def __repr__(self):
        return '<Tag {id}:{name}>'.format(id=self.id, name=self.name)

    def to_dict(self):
        return {k: getattr(self, k) for k in self.__table__.columns.keys()}

