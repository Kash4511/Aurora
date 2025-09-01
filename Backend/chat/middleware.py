# chat/middleware.py

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs
from asgiref.sync import sync_to_async

User = get_user_model()

class JWTAuthMiddleware:
    """Custom middleware for JWT WebSocket authentication."""

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return JWTAuthMiddlewareInstance(scope, self.inner)

class JWTAuthMiddlewareInstance:
    def __init__(self, scope, inner):
        self.scope = scope
        self.inner = inner

    async def __call__(self, receive, send):
        query_string = self.scope.get("query_string", b"").decode()
        token = parse_qs(query_string).get("token", [None])[0]

        self.scope["user"] = AnonymousUser()

        if token:
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user = await self.get_user(payload.get("user_id"))
                if user:
                    self.scope["user"] = user
            except jwt.ExpiredSignatureError:
                print("JWT expired.")
            except jwt.InvalidTokenError:
                print("Invalid JWT.")

        return await self.inner(self.scope, receive, send)

    @staticmethod
    async def get_user(user_id):
        try:
            return await sync_to_async(User.objects.get)(id=user_id)
        except User.DoesNotExist:
            return None
