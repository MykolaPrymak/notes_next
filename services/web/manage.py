from flask.cli import FlaskGroup
from dotenv import load_dotenv

load_dotenv()

from app import create_app
from app.db import db, User, Post, Tag

cli = FlaskGroup(create_app)


# @flask_app.shell_context_processor
# def make_shell_context():
#     return {'db': db, 'User': User, 'Post' :Post}

def _create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

def _seed_db():
    print('Create user')
    user1 = User(email="michael@mherman.org", password='hash')
    user2 = User(email="john.doe@example.com", password='hash')
    print('Create tag')
    tag1 = Tag('cool')
    tag2 = Tag(' Nice ')
    print('Create post')
    post1 = Post(title="Post 0", body="AAAA", author=user1)
    post1.tags.append(tag1)
    post1.tags.append(tag1)
    post1.tags.append(tag1)
    post1.tags.append(tag2)
    post1.tags.append(Tag('cool2'))


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
    db.session.add(Post(title="Post 1", body="AAAA", author=user1, tags=[tag1]))
    db.session.add(Post(title="Post 2", body="AAAA", author=user1))
    db.session.add(Post(title="Post 3", body="BBB", author=user2, tags=[tag1, tag2]))

    db.session.commit()

    user1_posts = user1.posts
    print(user1_posts.first().tags.first().posts.all())

    print(Tag.query.filter_by(name = "cool").first().posts.all())


@cli.command("create_db")
def create_db():
    _create_db()

@cli.command("seed_db")
def seed_db():
    _seed_db()

@cli.command("init_db")
def init_db():
    _create_db()
    _seed_db()

if __name__ == "__main__":
    cli()
