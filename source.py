def check_param(param):
    if param == 0:
        return True
    else:
        return check_param(param)
