import os
from flask import Flask
from .db import db

def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_prefixed_env()
    app.config.from_object("app.config.Config")

    if test_config is not None:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Init Flask SQLAlchemy
    db.init_app(app)

    @app.route("/health")
    def app_health():
        return "OK"

    # Blueprint
    from . import api
    app.register_blueprint(api.bp)

    return app
