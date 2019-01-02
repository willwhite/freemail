import os

FREE_EMAIL_BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

full_free_email_list = set()


def populate_free_email_list():
    global full_free_email_list, FREE_EMAIL_BASE_DIR
    if full_free_email_list:
        return

    from os import listdir
    from os.path import isfile, join
    path = os.path.join(FREE_EMAIL_BASE_DIR, 'data')
    email_files = [join(path, f) for f in listdir(path) if isfile(join(path, f))]

    for email_file in email_files:
        with open(email_file) as f:
            for line in f.readlines():
                if line.startswith('.'):
                    line = line[1:]
                full_free_email_list.add(line.strip())


def is_free_email(email_address):
    global full_free_email_list
    populate_free_email_list()
    split = str(email_address).split("@")
    if len(split) != 2:
        # this is not even an email
        return False
    return split[1] in full_free_email_list
