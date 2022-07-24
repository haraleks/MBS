#!/bin/bash -x

./manage.py makemigrations
./manage.py migrate --database master

./manage.py runserver 0.0.0.0:8080