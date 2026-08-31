import json
from pathlib import Path
from datetime import datetime

rows = json.loads(Path('/home/ubuntu/estudo-jdp/ipca_bcb_433.json').read_text())
start = datetime.strptime('01/10/2015','%d/%m/%Y')
end = datetime.strptime('01/07/2026','%d/%m/%Y')
sel=[]
for r in rows:
    d=datetime.strptime(r['data'],'%d/%m/%Y')
    if start <= d <= end:
        sel.append((d, float(r['valor'])))
acc=1.0
for _, pct in sel:
    acc *= 1+pct/100
print('months', len(sel))
print('start', sel[0], 'end', sel[-1])
print('inflation_pct', (acc-1)*100)
print('deflator', acc)
# comparisons p2015->p2026; real change = nominal ratio / acc -1
pairs=[
('Araucaria',13338.29,16242.04),
('Jequitiba',13416.90,18867.92),
('Jacaranda',14562.87,18287.04),
('Manaca',11000.28,20053.03),
('Time',12546.00,17460.32),
]
for name, old, new in pairs:
    nom=new/old-1
    real=(new/old)/acc-1
    print(name, 'nominal_pct',nom*100, 'real_pct', real*100)
