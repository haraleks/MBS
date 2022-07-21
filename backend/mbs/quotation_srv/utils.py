from rest_framework.exceptions import ValidationError

from quotation_srv.fixtures import Currencies

currency = Currencies()


def validatate_cur(q_lst):
    for q in q_lst:
        cur_par = q.split("_")
        if len(cur_par) != 2:
            raise ValidationError("No correct currency. Example: EUR_RUB, USD_RUB")

        if len(set(cur_par) & currency.get_set()) != 2:
            raise ValidationError("No correct currency. Example: EUR_RUB, USD_RUB")


def make_q(q_lst, param=2):
    new_q = []
    for i in range(0, len(q_lst), param):
        if len(q_lst)% 2 > 0 and i == len(q_lst) - 1:
            new_q.append(q_lst[i])
            continue
        new_q.append(",".join([q_lst[i], q_lst[i + 1]]))
    return new_q


def export_to(frmt, data):
    pass