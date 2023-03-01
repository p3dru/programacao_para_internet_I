from defs import *

#para listar as ocorrências
dicionario_de_ocorrencias = {}
links_encontrados = []
links_acessados = []
url = "https://innsite.com.br/7-sites-para-colocar-link-na-bio/"
palavra_chave = 'bio'
depth = 0
#para fazer a requisição
requisicao, links_acessados = request(url, links_acessados) 
#print(request)

#search(palavra_chave, url, depth)

contador_depth = 0
#Se o contador dor < ou igual a depth (modificar depois)
while contador_depth <= depth:
    #para encontrar ocorrências 
    posicoes = encontrar_ocorrencias(palavra_chave, requisicao)

    if len(posicoes) > 0:
        #para retornar uma lista com todas as posições da substring
        dicionario_de_ocorrencias = guardar_ocorrencias(requisicao, posicoes, url, dicionario_de_ocorrencias, palavra_chave)

    ler_dicionario(dicionario_de_ocorrencias)

    #pegar todos os links da página
    links = buscar_links(requisicao)

    #for link in links
    print()
    print(links)
    print(len(links))
    print()
    print(links_acessados)
    print(len(links_acessados))

    contador_depth += 1 

