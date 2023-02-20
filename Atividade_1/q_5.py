import requests
from bs4 import BeautifulSoup
from defs import get_link


url = "https://www.google.com/search?="

q = input("Digite o que gostaria de pesquisar: ")

url = url + q

response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")
texto = soup.get_text()

print(texto)
print()

get_link(soup)