from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from argon2 import PasswordHasher
import json

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)


ph = PasswordHasher()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    name = db.Column(db.String(128), unique=False, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    _password = db.Column('password', db.String(64), nullable=False)
    # from sqlalchemy.orm import validates

    def __init__(self, email, **kwargs):
        self.email = email
        self.login = email

        self.password = kwargs.get('password')

    def __repr__(self):
        # bb = {k: getattr(self, k) for k in self.__table__.columns.keys()}
        print(self.to_dict())
        return json.dumps(self.to_dict())

    def __str__(self):
        # return f'The value of pi is approximately {math.pi:.3f}.' self.id + " " + self.lastName
        return "AAAA"

    def to_dict(self):
        return {k: getattr(self, k) for k in self.__table__.columns.keys()}

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

@app.route("/")
def hello_world():
    return jsonify(hello="world")

@app.route("/users")
def list_users():
    # users = db.session.query(User).all()
    # data = User.query.all()
    # data = User.query.filter_by(id = 2)
    data = User.query.filter_by(email = "aaa")
    print(data)
    result = [{
        "id": d.id,
        "login": d.login,
        "email": d.email,
        "active": d.active,
        "password_hash": d.hash,
    } for d in data]
    # result = [d for d in data]

    print(data)
    print(data)
    print(data)
    # print(data.count())
    # return jsonify(result=result)
    return jsonify([user.to_dict() for user in data])
