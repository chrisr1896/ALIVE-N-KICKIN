import models
import meta
from flask import Flask

app=Flask(__name__)

def user_serializer(User):
    return {
        'id': User.id,
        'username': User.username
    }

@app.route('/', methods=['GET'])
def index():
    return jsonify([*map(user_serializer, User.query.all())])


@app.route('/api/signup', methods=['POST', 'GET'])
def sign_up():
    user = User(name=name, password=password, email_address=email_address)
    session.add(user)
    session.commit()
    return '<h1>Added NEW USER!</h1>'


# @app.route('/api/email', methods=['POST', 'GET'])
# def sign_up2():
#     email = Address(email_address=email_address)
#     session.add(email)
#     session.commit()
#     return '<h1>ADDED NEW EMAIL!!</h1>'


if __name__ == "__main__":
    meta.Base.metadata.drop_all(bind=meta.session.bind)
    meta.Base.metadata.create_all(bind=meta.session.bind)
    meta.session.commit()
    app.run()
