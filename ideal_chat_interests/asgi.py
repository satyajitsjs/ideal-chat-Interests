"""
ASGI config for ideal_chat_interests project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import interest_app.routing
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ideal_chat_interests.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter(
            interest_app.routing.websocket_urlpatterns
        )
    ),
})
