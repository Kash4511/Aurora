# chat/middleware.py
from urllib.parse import parse_qs
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
import jwt
from django.conf import settings

User = get_user_model()

class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return JWTAuthMiddlewareInstance(scope, self.inner)

class JWTAuthMiddlewareInstance:
    def __init__(self, scope, inner):
        self.scope = dict(scope)
        self.inner = inner

    async def __call__(self, receive, send):
        token = parse_qs(self.scope.get("query_string", b"").decode()).get("token", [None])[0]
        self.scope["user"] = AnonymousUser()
        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user = await self.get_user(payload.get("user_id"))
                if user:
                    self.scope["user"] = user
            except jwt.ExpiredSignatureError:
                pass
            except jwt.InvalidTokenError:
                pass

        inner = self.inner(self.scope)
        return await inner(receive, send)

    @staticmethod
    @sync_to_async
    def get_user(user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
