FROM python:3.9-buster

ENV MICRO_SERVICE=/opt
RUN mkdir -p $MICRO_SERVICE
WORKDIR $MICRO_SERVICE

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONASYNCIODEBUG 1

RUN apt update

# copy project
COPY . $MICRO_SERVICE
RUN pip install -r requirements.txt

CMD ["/bin/bash", "/opt/entrypoint.sh"]
