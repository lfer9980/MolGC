from sqlalchemy.orm import configure_mappers

from .models_registry import *
from .relations_registry import register_all_relationships

register_all_relationships()


configure_mappers()

__all__ = []
