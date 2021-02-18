from flask import Flask, jsonify, request, json, Response
import requests
from bs4 import BeautifulSoup
from requests_html import AsyncHTMLSession, HTMLSession
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
import flask_cors
from datetime import datetime, timedelta
from flask_bcrypt import generate_password_hash, check_password_hash, Bcrypt
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
import flask_praetorian

guard = flask_praetorian.Praetorian()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///example.db'
app.config['SQLALCHEMY_ECHO'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
db = SQLAlchemy(app)
jwt = JWTManager(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
api = Api(app)
bcrypt = Bcrypt(app)
cors = flask_cors.CORS()
asession = AsyncHTMLSession()
URL = 'https://www.espn.com/soccer/table/_/league/eng.1'
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')




class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True, server_default='true')


    def __str__(self):
        return f"{self.username} {self.id} {self.password} {self.email} {self.date_created}"
    
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    
    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active

guard.init_app(app, User)
cors.init_app(app)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        users = User
        sqla_session = db.session
        load_instance = True


def user_serializer(User):
    return {
        'id': User.id,
        'username': User.username,
        'password': User.password,
        'email': User.email,
        'date_created': User.date_created,
    }


class UsersApi(Resource):
    
    def get(self):        
        user = User.query.all()
        return jsonify([*map(user_serializer, user)])

    def post(self):
        print(request.get_json())
        body = request.get_json(force=True)
        user = User(**body)
        user.hash_password()
        db.session.add(user)
        db.session.commit()
        user_name = user.get('username')
        return {"user": user_name}, 201


class LoginApi(Resource):
    def post(self):
        body = request.get_json(force=True)
        print(body)
        user = db.session.query(User).filter_by(username=body.get('username')).first()
        print(user)
        authorized = user.check_password(body.get('password'))
        print(authorized)
        if not authorized:
            return None
        expires = timedelta(hours=24)
        access_token = create_access_token(identity=user.username, expires_delta=expires)
        return {'accessToken': access_token}, 200


class Refresh(Resource):
    def post(self):
        print("refresh request")
        old_token = request.get_data()
        print(old_token)
        new_token = create_access_token(old_token)
        ret = {'refreshToken': new_token}
        return ret, 200
        


@app.route('/api/protected')
@jwt_required
def protected():
    current_user = get_jwt_identity()
    if not current_user:
        return 401
    print(current_user)
    return {"message": f'Welcome: {current_user}'}



@app.route('/api/<int:id>')
def showid(id):
    return jsonify([*map(user_serializer, User.query.filter_by(id = id))])




@app.route('/api/<int:id>', methods=['POST'])
def delete(id):
    request_data = json.loads(request.data)
    User.query.filter_by(username = request_data['id']).delete()
    db.session.commit()
    return {'204': 'Deleted Successfully'}

@app.route('/api/soup')
def get_info():
    teams = soup.find('tbody', class_="Table__TBODY")
    teamers = []
    for team in teams.find_all('div'):
        teamer = {}
        name = team.find('a')
        teamer['img'] = team.img
        teamer['team'] = team.img['title']
        teamer['url'] = team.a['href']
        teamers.append(teamer)
        return {'teams':teamers}

    


api.add_resource(Refresh, "/api/refresh")
api.add_resource(UsersApi, "/api/create")
api.add_resource(LoginApi, "/api/login")

if __name__ == '__main__':
    db.create_all()
    db.session.commit()
    app.run(debug=True)
