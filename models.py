from sqlalchemy import Column, Integer, Text, ForeignKey, String

import meta
import bootstrap


class User(meta.Base):
    __tablename__ = " users"

    id = Column(Integer, primary_key = True)
    username = Column(String(50), nullable = False)
    email_address = Column(String(50), nullable = False)
    password = Column(String(50), nullable = False)

    def __repr__():
        return "<User(name = '%s', email_address='%s')>" % self.name, self.email_address



# class Address(meta.Base):
#     __tablename__ = "addressess"

#     id = Column(Integer, primary_key=True)
    
#     # user_id = Column(Integer, ForeignKey("users_id"))

#     def __repr__():
#         return "<Address(email_address = '%s')>" % self.email_address