from schema import Schema, And, Use, Optional, SchemaError
import bleach
from .consts import MIN_ITEMS_PER_PAGE, MAX_ITEMS_PER_PAGE


"""
We strip and sanitizing the title, body and tags fields
"""
post_shema = Schema({'title': And(str, Use(str.strip), len, Use(bleach.clean)),
                     'body': And(str, Use(str.strip), len, Use(bleach.clean)),
                     Optional('tags', default=[]): And(str,
                                                       Use(lambda tags: [
                                                           tag.strip() for tag in str(tags).split(' ') if len(tag)
                                                       ]),
                                                       Use(lambda tags: [
                                                           bleach.clean(tag) for tag in tags
                                                       ])
                                                       ),
                     Optional('private', default=False): And(str, Use(str.lower), Use(lambda s: s == 'true'))
                     }, ignore_extra_keys=True)


def normalize_page_num(page_num: int) -> int:
    return min(max(page_num, MIN_ITEMS_PER_PAGE), MAX_ITEMS_PER_PAGE)
