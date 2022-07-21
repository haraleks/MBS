import requests
from django.conf import settings


class Currencies:
    data = None
    instance = None

    def __new__(cls):
        if cls.instance is None:
            cls.instance = super().__new__(cls)
        return cls.instance

    def __init__(self):
        self.load_cur()

    def load_cur(self):
        res = requests.get(f"https://free.currconv.com/api/v7/currencies?apiKey={settings.API_KEY}")
        if res.status_code == 200:
            self.data = res.json().get('results')

    def get_set(self):
        return set(self.data.keys())

    def get(self, key):
        return self.data.get(key)
