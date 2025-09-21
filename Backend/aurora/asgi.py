import os
import django
import traceback
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "aurora.settings")
django.setup()

try:
    from django.core.asgi import get_asgi_application
    from chat.middleware import JWTAuthMiddleware
    import chat.routing

    django_asgi_app = get_asgi_application()
    print("✅ Django ASGI app loaded")
except Exception as e:
    print("❌ Error loading Django:", str(e))
    traceback.print_exc()
    raise

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JWTAuthMiddleware(
        URLRouter(chat.routing.websocket_urlpatterns)
    ),
})
