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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    _password = db.Column('password', db.String(128),
                          unique=True, nullable=False)

    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __init__(self, email: str, **kwargs):
        self.email = email
        self.name = kwargs.get("name", email)
        self.username = kwargs.get("username", email)

        self.password = kwargs.get('password')

    def __repr__(self):
        # bb = {k: getattr(self, k) for k in self.__table__.columns.keys()}
        print(self.to_dict())
        return json.dumps(self.to_dict())

    def __str__(self):
        return "User<>"

    def to_dict(self, short: bool = False):
        """Convert user object to dict. The password field will be omited
        """
        dict_keys = self.__table__.columns.keys()

        if short is True:
            dict_keys = ['id', 'username']
        else:
            dict_keys.remove('password')

        return {k: getattr(self, k) for k in dict_keys}

    def verify_passowrd(self, password: str) -> bool:
        return ph.verify(self._password, password)
        # return None

    @property
    def password(self):
        # password is not accessible directly
        return None

    @property
    def hash(self) -> str | None:
        return self._password

    @password.setter
    def password(self, password):
        if (password is not None):
            hash = ph.hash(password)
            self._password = hash
