import csv
from collections import Counter
path = '/home/ubuntu/jardim-perdizes-fontes-inventario.csv'
with open(path, encoding='utf-8') as f:
    rows = list(csv.DictReader(f, delimiter=';'))
print('total', len(rows))
print('categorias')
for key, value in Counter(r['categoria'] for r in rows).most_common():
    print(key, value)
print('confianca')
for key, value in Counter(r['confianca'] for r in rows).most_common():
    print(key, value)
print('temas')
terms = Counter()
for r in rows:
    for term in r['temas_principais'].split(','):
        terms[term.strip()] += 1
for key, value in terms.most_common(20):
    print(key, value)
