from flask.cli import FlaskGroup
from dotenv import load_dotenv

load_dotenv()

from project import app, db, User


cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command("get")
def get_db():
    print('get')
    users = User.query.all()
    for user in users:
        print(vars(user))
        print(user.password, user.hash)

@cli.command("seed_db")
def seed_db():
    print('Create user')
    user = User(email="michael@mherman.org", password='hash')
    print('Read')
    print(user.password)
    print(user.hash)
    try:
        print(user.verify_passowrd('hash'))
    except:
        print('Password verification failed')
    
    db.session.add(user)
    db.session.add(User(email="john.doe@example.com", password='hash'))
    db.session.commit()

if __name__ == "__main__":
    cli()
