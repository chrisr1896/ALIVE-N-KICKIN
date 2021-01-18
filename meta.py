import os
from collections import OrderedDict

from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine(
    "sqlite:///user.db", 
    echo = True, 
)

session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    ),
)

class Base(object):

    def __json__(self):
        def maybe_convert(v: any):
            if hasattr(v, "__json__"):
                return v.__json__()
            else:
                return v

        ret = OrderedDict()
        for attr in inspect(self).attrs.keys():
            val = getattr(self, attr)

            if isinstance(val, list):
                ret[attr] = []
                for v in val:
                    ret[attr].append(maybe_convert(v))
            else:
                ret[attr] = maybe_convert(val)

        return ret

Base = declarative_base(cls=Base)