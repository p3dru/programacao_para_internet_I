"""def teste(a, b):
    a = a + 2
    b = b + 2
    
    return a, b

a = 1
b = 2

a, b = teste(a, b)

print(a)
print(b)
"""

"""dicionario = {}
for x in range(4):
    dicionario[f'{x}'] = 'as'

print(dicionario)"""

"""lista = [1, 2, 2, 3, 4]
print(len(lista))"""

"""
dicionario = {}
for x in range(4):
    dicionario[f'{x}'] = 'as'

for chave, valor in dicionario.items():
    print(chave + ": ", valor)
"""
'''
lista_1 = ['1', '2', '3', '4']
lista_2 = ['5', '6', '7']

for x in range(len(lista_2)):
    lista_1.append(lista_2[x])

print(lista_1)
'''
'''
lista_1 = ['asssssssssss', 'asasasasas', 'ansansa', 'https://scdsvsvsd']
lista_2 = []

for x in range(len(lista_1)):
    if 'https://' in lista_1[x] or 'http://' in lista_1[x]:
        lista_2.append(lista_1[x])

print(lista_2)
'''

dicionario = {}

nome = ['csdmcskdmc', 'csdvdsd', 'ndscn']
valor = [1, 3, 5]

for x in range(len(nome)):
    dicionario[nome[x]] = valor[x]

print(dicionario)