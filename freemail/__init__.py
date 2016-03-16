import tldextract
import subprocess

free_file = './data/free.txt'
disp_file = './data/disposable.txt'


def is_free(email_address):
    if not isinstance(email_address, str):
        raise TypeError('email must be a string')

    with open(free_file, 'r') as free, open(disp_file, 'r') as disposable:
        domain_list = free.read().splitlines() + disposable.read().splitlines()
        domain = tldextract.extract(email_address.split('@')[1]).registered_domain

        return domain in domain_list


def is_disposable(email_address):
    if not isinstance(email_address, str):
        raise TypeError('email must be a string')

    with open(disp_file, 'r') as disposable:
        domain_list = disposable.read().splitlines()
        domain = tldextract.extract(email_address.split('@')[1]).registered_domain

        return domain in domain_list


def update():
    try:
        subprocess.call("./update", shell=True)
        return True
    except subprocess.CalledProcessError:
        return False
