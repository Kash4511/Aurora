import os

bind = "0.0.0.0:8000"
wsgi_app = "aurora.wsgi:application"
pythonpath = "/opt/render/project/src/Backend"
workers = 4
timeout = 120 