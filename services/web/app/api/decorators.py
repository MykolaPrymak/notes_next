
from functools import wraps
from flask import jsonify, session

def user_authentificated(f):
    @wraps(f)

    def wrapper(*args, **kwds):
        if session.get("is_authenticated") is not True:
            return jsonify({'error': 401, "message": "User is not authenticated"}), 401

        return f(*args, **kwds)

    return wrapper