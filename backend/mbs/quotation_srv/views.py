import requests
import datetime
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from quotation_srv.fixtures import Currencies
from quotation_srv.utils import validatate_cur, make_q, export_to

currency = Currencies()


@api_view(["GET"])
@permission_classes([AllowAny])
def get_quotation(request):
    q = request.GET.get('q')

    q_lst = q.split(',')
    validatate_cur(q_lst)
    q_lst = make_q(q_lst)
    data = []
    for q in q_lst:
        res = requests.get(f"https://free.currconv.com/api/v7/convert?apiKey={settings.API_KEY}&q={q}")
        if res.status_code == 200:
            now = datetime.datetime.now()
            r = res.json().get("results")
            for k in r.keys():
                data.append({
                    "code": r.get(k).get('id') if r.get(k) else None,
                    "name": r.get(k).get('to') if r.get(k) else None,
                    "price": r.get(k).get('val') if r.get(k) else None,
                    "date": now,
                    "nominal": 1
                })

    res = {
        "result": data
    }
    return Response(res)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_currencies(request):
    data = currency.get_set()
    return Response(data)