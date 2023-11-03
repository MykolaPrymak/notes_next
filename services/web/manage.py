from flask.cli import FlaskGroup
from dotenv import load_dotenv

load_dotenv()

from app import create_app
from app.db import db, User, Post, Tag

flask_app = create_app()

cli = FlaskGroup(flask_app)


# @flask_app.shell_context_processor
# def make_shell_context():
#     return {'db': db, 'User': User, 'Post' :Post}

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command("seed_db")
def seed_db():
    print('Create user')
    user1 = User(email="michael@mherman.org", password='hash')
    user2 = User(email="john.doe@example.com", password='hash')
    print('Create tag')
    tag1 = Tag('cool')
    tag2 = Tag(' Nice ')
    print('Create post')
    post1 = Post(body="AAAA", author=user1)
    post1.tags.append(tag1)
    post1.tags.append(tag1)
    post1.tags.append(tag1)
    post1.tags.append(tag2)


    print('Read')
    print(user1.password)
    print(user1.hash)
    try:
        print(user1.verify_passowrd('hash'))
    except:
        print('Password verification failed')
    
    db.session.add(user1)
    db.session.add(user2)

    db.session.add(tag1)
    db.session.add(tag2)

    db.session.add(post1)
    db.session.add(Post(body="AAAA", author=user1))
    db.session.add(Post(body="AAAA", author=user1))
    db.session.add(Post(body="BBB", author=user2))

    db.session.commit()

    user1_posts = user1.posts
    print(user1_posts.first().tags.first().posts.all())

    print(Tag.query.filter_by(name = "cool").first().posts.all())

if __name__ == "__main__":
    cli()
