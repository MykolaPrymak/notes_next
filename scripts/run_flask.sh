#!/bin/bash
cd services/web

export FLASK_APP=project/__init__.py

source .env/bin/activate

python manage.py run --host=0.0.0.0

deactivate