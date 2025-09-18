# Backend/chat/middleware.py

from urllib.parse import parse_qs
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
from django.conf import settings
import jwt

User = get_user_model()


class JWTAuthMiddleware:
    """
    ASGI middleware that reads `?token=...` from the websocket query string,
    decodes JWT using SECRET_KEY and sets scope['user'].
    This middleware avoids importing models at module import time.
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return JWTAuthMiddlewareInstance(scope, self.inner)


class JWTAuthMiddlewareInstance:
    def __init__(self, scope, inner):
        # copy scope so we don't mutate the original
        self.scope = dict(scope)
        self.inner = inner

    async def __call__(self, receive, send):
        # default to anonymous
        self.scope["user"] = AnonymousUser()

        # parse token from query string (ws://.../?token=xxx)
        try:
            query_string = self.scope.get("query_string", b"").decode()
            token = parse_qs(query_string).get("token", [None])[0]
        except Exception:
            token = None

        if token:
            try:
                # IMPORTANT: use same secret and algorithm as your SimpleJWT config.
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = payload.get("user_id") or payload.get("user_id") or payload.get("user")
                if user_id:
                    user = await self._get_user(user_id)
                    if user:
                        self.scope["user"] = user
            except jwt.ExpiredSignatureError:
                # expired token -> keep AnonymousUser
                pass
            except jwt.InvalidTokenError:
                pass
            except Exception:
                pass

        inner = self.inner(self.scope)
        return await inner(receive, send)

    @staticmethod
    @sync_to_async
    def _get_user(user_id):
        try:
            return User.objects.get(id=user_id)
        except Exception:
            return None
