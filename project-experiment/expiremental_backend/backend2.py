from flask import Flask, jsonify, request, redirect, abort
from flask_script import Manager
from flask_sqlalchemy_session import flask_scoped_session
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from datetime import datetime
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///example.db'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
session_factory = sessionmaker()
session = flask_scoped_session(session_factory, app)
api = Api(app)
manager = Manager(app)

class User(db.Model):
    id = db.Column(db.Integer, nullable=False, autoincrement=True, primary_key=True)
    username = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    def __repr__(self):
        return f"{self.id} {self.username} {self.password} {self.email} {self.date_created}"


class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "password", "email", "date_created")
        model = User

user_schema = UserSchema()
user_schema = UserSchema(many=True)


class UserListResouce(Resource):
    def get(self):
        users = User.query.all()
        return user_schema.dump(users)

    def post(self):
        new_user = User(
            username=request.json['username'],
            email=request.json['email'],
            password=request.json['password'],
        )
        db.session.add(new_user)
        db.session.commit()
        return user_schema.dump(new_user)

    


# users = {}

class UserResource(Resource):
    # def get(self, user_id):
    #     user = User.query.get(user_id)       
    #     return user_schema.dump(user.username)
    # def user(self, user_id):
    #     user = session.query(User).get(user_id)
    #     if user is None:
    #         abort(404)
    #     return {user_id: users[user_id] }
    def get(self, user_id):
        return {user_id: users[user_id]}
    
    def put(self, user_id):
        users[user_id] = request.form['data']
        return {user_id: users[user_id]}

    def delete(self, user_id):
        abort_if_user_doesnt_exist[user_id]
        del USER[user_id]
        return '', 204





@app.route('/api/delete/<int:id>', methods=["POST", "GET"])
def delete(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/')

@app.route('/update', methods=["POST", "GET"])
def update():
    pass

@app.route('/lookup')
def lookup():
    pass




api.add_resource(UserListResouce, '/api')
api.add_resource(UserResource, '/api/<int:user_id>')

if __name__ =="__main__":
    db.configure_mappers()
    db.create_all()
    db.session.commit()
    app.run(debug=True)