from sqlalchemy import Column, Integer, Text, ForeignKey, String

import meta
import bootstrap


class User(meta.Base):
    __tablename__ = " users"

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    password = Column(String(50))

    def __repr__():
        return "<User(name = '%s')>" % self.name



class Address(meta.Base):
    __tablename__ = "addressess"

    id = Column(Integer, primary_key=True)
    email_address = (String(50))
    # user_id = Column(Integer, ForeignKey("users_id"))

    def __repr__():
        return "<Address(email_address = '%s')>" % self.email_address