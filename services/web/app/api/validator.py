from schema import Schema, And, Use, Optional, SchemaError

post_shema = Schema({'title': And(str, len),
                     'body': And(str, len),
                     Optional('tags'): str,
                     Optional('is_private', default="false"): And(str, len, Use(str.lower), lambda s: s in ('true', 'false'))}, ignore_extra_keys=True)