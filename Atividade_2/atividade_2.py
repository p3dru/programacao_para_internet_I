from defs import *

#para listar as ocorrências
dicionario_de_ocorrencias = {}
links_encontrados = []
links_acessados = []
url = "https://innsite.com.br/7-sites-para-colocar-link-na-bio/"
palavra_chave = 'bio'
depth = 3
contador_depth = 0
criterios = {}


#para fazer a requisição
requisicao, links_acessados = request(url, links_acessados) 
#print(request)

#search(palavra_chave, url, depth)

#para encontrar ocorrências 
posicoes, criterios = encontrar_ocorrencias(palavra_chave, requisicao, criterios, url)

if len(posicoes) > 0:
    #para retornar uma lista com todas as posições da substring
    dicionario_de_ocorrencias = guardar_ocorrencias(requisicao, posicoes, url, dicionario_de_ocorrencias, palavra_chave)

#mostra o dicionário de forma legível informando todas as ocorrências e o número de ocorrências
#ler_dicionario(dicionario_de_ocorrencias)

#pegar todos os links da página
links = buscar_links(requisicao)

contador_depth = 1


while contador_depth < depth:
    #aqui começa o processamento de todos os links encontrados
    for link in links:
        try:
            requisicao, links_acessados = request(link, links_acessados) 

            posicoes, criterios_2 = encontrar_ocorrencias(palavra_chave, requisicao, criterios_2, link)
            criterios.update(criterios_2)

            if len(posicoes) > 0:
                #para retornar uma lista com todas as posições da substring
                dicionario_de_ocorrencias = guardar_ocorrencias(requisicao, posicoes, link, dicionario_de_ocorrencias, palavra_chave)

            #mostra o dicionário de forma legível informando todas as ocorrências e o número de ocorrências
            ler_dicionario(dicionario_de_ocorrencias)

            #pegar todos os links da página
            links = buscar_links(requisicao)
        
        except:
            pass
    
    contador_depth += 1



#for link in links
print()
#printa a lista de links encontrados junto com o tamanho da lista de links
print(f"Links encontados:\n {links}\nTotal de links encontrados:\n{len(links)}")
print()
#printa os links acessados junto com o tamanho dos links acessados
print(f"Links acessados: {links_acessados}\nTotal de links acessados:\n{len(links_acessados)}")
print(f'Dicionario de referencias:\n {criterios}')

'preciso saber como criar novas chaves e valores no dicionario'