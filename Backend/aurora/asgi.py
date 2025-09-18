# Backend/aurora/asgi.py

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "aurora.settings")
# initialize Django and load settings (IMPORTANT)
django_asgi_app = get_asgi_application()

# Import routing/middleware AFTER Django is initialized
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing

# import JWTAuthMiddleware from chat.middleware (ASGI-safe version below)
from chat.middleware import JWTAuthMiddleware

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": JWTAuthMiddleware(
            AuthMiddlewareStack(
                URLRouter(chat.routing.websocket_urlpatterns)
            )
        ),
    }
)
