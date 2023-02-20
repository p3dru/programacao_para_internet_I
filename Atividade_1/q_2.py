import requests
from bs4 import BeautifulSoup

response = requests.get('https://innsite.com.br/7-sites-para-colocar-link-na-bio/')
soup = BeautifulSoup(response.text, 'html.parser')

tag = input('Digite uma tag a ser retornada: ')
pesquisa = soup.find_all(tag)

for resultado in pesquisa:
    print(resultado)
