import os

bind = "0.0.0.0:8000"
wsgi_app = "aurora.wsgi:application"
workers = 4
timeout = 120
