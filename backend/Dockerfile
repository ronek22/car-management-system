FROM python:3.8

RUN apt-get update
RUN apt-get install git -y

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

WORKDIR /code

RUN pip install --upgrade pip
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --dev --ignore-pipfile --system

COPY . .

RUN python manage.py collectstatic --no-input

EXPOSE 8000