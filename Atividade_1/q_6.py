from defs import *


link = "https://www.meutimao.com.br/tabela-de-classificacao/campeonato_brasileiro/2022/"
soup = request(link)

search = "table"
tables = to_search(soup, search)
for table in tables:
   print(table)
