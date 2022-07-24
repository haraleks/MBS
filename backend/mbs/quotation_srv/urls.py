from django.urls import path

from quotation_srv.views import get_quotation, get_currencies

urlpatterns = [
    path('get', get_quotation, name="get_quotation"),
    path('get_currencies', get_currencies, name="get_get_currencies"),
]