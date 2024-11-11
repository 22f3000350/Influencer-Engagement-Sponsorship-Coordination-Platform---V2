class Config():
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class LocalDevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.sqlite3'
    DEBUG = True
    SECRET_KEY = 'Influencer-Engagement-Sponsorship-Co-ordination-Platform'
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_PASSWORD_SALT = 'Mad-2-Project'
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'
    CACHE_TYPE = "RedisCache"
    CACHE_DEFAULT_TIMEOUT = 5
    CACHE_KEY_PREFIX = "cache_prefix"
    CACHE_REDIS_URL = "redis://localhost:6379/2"

      