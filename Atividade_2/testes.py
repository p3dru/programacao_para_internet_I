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

dicionario = {}
for x in range(4):
    dicionario[f'{x}'] = 'as'

for chave, valor in dicionario.items():
    print(chave + ": ", valor)