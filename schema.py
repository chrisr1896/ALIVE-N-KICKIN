from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, create_engine, ForeignKey, type_coerce, text, MetaData, Sequence
from sqlalchemy import inspect
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from sqlalchemy.sql import select, table, or_, and_, not_
import sqlite3

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
engine = create_engine("sqlite:///user.db", echo = True, future = True)
Session = sessionmaker(bind=engine)
inspector = inspect(engine)
Session = sessionmaker()
Session.configure(bind=engine)
session = Session()
Base = declarative_base()
metadata = MetaData(engine)
# db = SQLAlchemy(app)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer,Sequence('user_id_seq'), primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    nickname = Column(String(50))
    
    # def __init__(self):
    #     self.name = name
    #     self.fullname = fullname
    #     self.nickname = nickname

    # def __repr__(self):##this is optional to show examples nicely user objects.
    #     return "<User(name = '%s', fullname = '%s', nickname = '%s')>" % (self.name, self.fullname, self.nickname)

# class Address(Base):
#     __tablename__ = 'addresses'
#     id = Column(Integer, primary_key=True)
#     email_address = Column(String(50))
#     user_id = Column(Integer, ForeignKey('users.id'))

#     def __init__(self):
#         self.email_address = email_address

    # user = relationship('User', back_populates="addresses")

    # def __repr__(self):
    #     return "<Address(email_address='%s)>" % self.email_address
# User.addresses = relationship("Address", order_by = Address.id, back_populates="users")

@app.route('/<name>/<fullname>/<nickname>')
def index(name, fullname, nickname):
    user = User(name=name, fullname=fullname, nickname=nickname)
    session.add(user)
    session.commit()
    return '<h1>Added NEW USER!</h1>'
# def update(self):
#     with engine.begin() as conn:
#         conn.execute()
#         pass

# def main():
#     e = create_engine("sqlite:///user.db", echo = True, future = True)
#     Base.metadata.create_all(e)
#     session = Session(e)
#     session.commit()
#     state= {}
#     start(session, state)
#     while True:
#         update_state(session, state)
#         draw(session, state)
#         time.sleep(0.01)
# s = select([User.c.name])
# chris_user = User(name='chris', fullname='Chris Russell', nickname='Popsi')
# chris = Address(email_address= "chrisr1896.cr@gmail.com")
# session.add(chris)
# engine.execute(User.select().where(User.c.fullname == 'ch'))
# conn = engine.connect()
# # result = conn.execute(s)
# # row = result.fetchall()
# print()
# session.commit()

if __name__ =='__main__':
    app.run()
