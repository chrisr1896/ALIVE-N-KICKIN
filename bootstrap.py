import models
import meta
from flask import Flask

app=Flask(__name__)


@app.route('/<name>/<password>')
def sign_up(name, password):
    user = User(name=name, password=password)
    session.add(user)
    session.commit()
    return '<h1>Added NEW USER!</h1>'


@app.route('/index/<email_address>')
def index(email_address):
    email = Address(email_address=email_address)
    session.add(email)
    session.commit()
    return '<h1>ADDED NEW EMAIL!!</h1>'


if __name__ == "__main__":
    meta.Base.metadata.drop_all(bind=meta.session.bind)
    meta.Base.metadata.create_all(bind=meta.session.bind)
    meta.session.commit()
    app.run()