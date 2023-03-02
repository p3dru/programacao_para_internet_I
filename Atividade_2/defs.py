import requests
import requests_cache
from bs4 import BeautifulSoup


requests_cache.install_cache('atv_2')

#def search(keyword: str, url: str, depth: int):


def buscar_links(soup):
    requisicao_feita = soup.find_all('a')
    links = []
    
    for link in requisicao_feita:
        ref = link.get('href')
        links.append(ref)

    return links


#fazer a requisição
def request(url: str, acessados: list):
    if url not in acessados:
        resposta = requests.get(url)
        soup = BeautifulSoup(resposta.text, 'html.parser')
        #retorna um objeto soup para processamento futuro
        acessados.append(url)
        
        return soup, acessados


#para guardar todas as ocorrências da palavra chave no texto, em uma posição de lista
def encontrar_ocorrencias(substring: str, soup):
    texto = soup.get_text()
    posicoes = []
    posicao = -1

    while True:
        posicao = texto.find(substring, posicao + 1)
        if posicao == -1:
            break
        posicoes.append(posicao)
    #retorna a lista de posições no texto
    return posicoes

#para registrar as ocorrências no dicionario
def guardar_ocorrencias(soup, posicao: list, url, dicionario, substring, depth: int):
    texto = soup.get_text()
    contador = 1
    
    for x in posicao:
        if x >= 20 or x <= len(texto - 20):
            dicionario[f'Ocorrencia {contador}:'] = f'||{texto[x - 20 : x + (20 + len(substring))] }|| em: {url}, Depth: {depth}'
            contador += 1

    return dicionario

#para ler melhor o dicionario
def ler_dicionario(dicionario: dict):
    for chave, valor in dicionario.items():
        print(chave, "->", valor)

#aqui serve para pegar todos os links dos links associados
def acessar_links_de_links(lista_de_links: list, acessados: list, palavra_chave: str, url, contador, dicionario):
    dicionario = {}
    pocicoes = []
    links_de_links = []
    for link in lista_de_links:
        requisicao, links_acessados = request(link, links_acessados)
        posicoes = encontrar_ocorrencias(palavra_chave, requisicao)
        dicionario = guardar_ocorrencias(requisicao, posicoes, url, dicionario, palavra_chave, contador)
        links_de_links = buscar_links(link)
        dicionario, links_acessados = acessar_links_de_links(lista_de_links, acessados, palavra_chave, url, contador,
                                                             dicionario)
    
    return dicionario, links_acessados

        


