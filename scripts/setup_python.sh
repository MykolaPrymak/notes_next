#!/bin/bash

sudo apt install python3.10-venv

cd services/web

python3 -m venv venv
source venv/bin/activate

pip install -r ./requirements.txt

deactivate