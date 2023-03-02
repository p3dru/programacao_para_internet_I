from defs import *

#para listar as ocorrências
dicionario_de_ocorrencias = {}
links_encontrados = []
links_acessados = []
url = "https://innsite.com.br/7-sites-para-colocar-link-na-bio/"
palavra_chave = 'bio'
depth = 3
contador = 0
#para fazer a requisição
requisicao, links_acessados = request(url, links_acessados) 
#print(request)

posicoes = encontrar_ocorrencias(palavra_chave, requisicao)
dicionario_de_ocorrencias = guardar_ocorrencias(requisicao, posicoes, url, dicionario_de_ocorrencias, palavra_chave, contador)
#ler_dicionario(dicionario_de_ocorrencias)

links_encontrados = buscar_links(url)
referencias_por_link = {}

contador += 1 

while contador < depth:
    for link in links_encontrados:
        dicionario_de_ocorrencias, links_acessados = acessar_links_de_links(links_encontrados, links_acessados, palavra_chave, url,
                                                                             contador, dicionario_de_ocorrencias)    

    contador += 1

print(dicionario_de_ocorrencias)



depth = 1

