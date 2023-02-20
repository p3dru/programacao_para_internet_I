import requests
from bs4 import BeautifulSoup

"""
#solução tentada
site = input("Digite um site: ")
response = requests.get(site)

soup = BeautifulSoup(response.content, 'html.parser')

imagem = soup.find_all('img')
for x in imagem:
    local_da_imagem = x['src']
    print(local_da_imagem)
    response = requests.get(local_da_imagem)

    with open(f'{local_da_imagem}.jpg', 'wb') as f:
        f.write(response.content)
"""

#solução chat GPT

url = "https://innsite.com.br/7-sites-para-colocar-link-na-bio/"
response = requests.get(url)

soup = BeautifulSoup(response.content, 'html.parser')

img_tag = soup.find('img')

img_url = img_tag['src']

response = requests.get(img_url)

with open('imagem.jpg', 'wb') as f:
    f.write(response.content)