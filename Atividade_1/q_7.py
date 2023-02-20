from defs import *


cep = input("Digite o CEP a ser pesquisado: ")
url = f"https://viacep.com.br/ws/{cep}/json/"

response = request(url)
print(response.get_text())


#utilizado: https://viacep.com.br/