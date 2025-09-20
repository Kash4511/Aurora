from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import AnonymousUser


@database_sync_to_async
def get_user_from_token(token):
    try:
        from django.contrib.auth import get_user_model
        access_token = AccessToken(token)
        user_id = access_token["user_id"]
        return get_user_model().objects.get(id=user_id)
    except Exception:
        return AnonymousUser()


class JWTAuthMiddleware:
    """Custom middleware to authenticate WebSocket via JWT token in query string."""

    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"").decode()
        qs = parse_qs(query_string)
        token = qs.get("token")

        # Default anonymous
        scope["user"] = AnonymousUser()

        if token:
            scope["user"] = await get_user_from_token(token[0])

        return await self.inner(scope, receive, send)


def JWTAuthMiddlewareStack(inner):
    from channels.auth import AuthMiddlewareStack
    return JWTAuthMiddleware(AuthMiddlewareStack(inner))
