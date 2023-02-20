import requests
from bs4 import BeautifulSoup


def encontrar_posicoes(texto, substring):
    posicoes = []
    posicao = -1

    while True:
        posicao = texto.find(substring, posicao + 1)
        if posicao == -1:
            break
        posicoes.append(posicao)
    
    return posicoes


def printar_ocorrencias(texto, posicao):
    ocorrencias = 1
    for x in posicao:
        if x >= 20 or x <= len(texto) - 20:
            print(f"Ocorrência {ocorrencias}:")
            print(f"{texto[x - 20 : x + 20]}")
            print()
        else:
            if x < 20:
                print(f"Ocorrência {ocorrencias}:")
                print(f"{texto[: x + 20]}")
                print()
            else:
                if x > len(texto) - 20:
                    print(f"Ocorrência {ocorrencias}:")
                    print(f"{texto[x - 20 : ]}")
                    print()   

        ocorrencias += 1

        


site = input("Digite um site: ")
response = requests.get(site)

soup = BeautifulSoup(response.text, 'html.parser')
texto = soup.get_text()
total_len = len(texto)

to_search = input("Digite um termo a ser encontrado: ")
posicoes_no_texto = encontrar_posicoes(texto, to_search)

print(posicoes_no_texto)

printar_ocorrencias(texto, posicoes_no_texto)
#print(total_len)
#print(text)