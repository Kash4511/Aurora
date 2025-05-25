import os
import sys

# Add the Backend directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from aurora.wsgi import application 