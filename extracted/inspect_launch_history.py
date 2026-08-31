from pathlib import Path
import pandas as pd

path = Path('/home/ubuntu/estudo-jdp/historico-lancamentos-tecnisa.xlsx')
xl = pd.ExcelFile(path)
print('SHEETS', xl.sheet_names)
for sheet in xl.sheet_names:
    print('\n=== SHEET', sheet, '===')
    raw = pd.read_excel(path, sheet_name=sheet, header=None)
    print('shape', raw.shape)
    print(raw.head(12).to_string(index=False, header=False))
    mask = raw.astype(str).apply(lambda col: col.str.contains('JDP|Jardim|Perdizes|Jacarand|Jequit|Arauc|Manac|Time|Figue|Pitang|Olive|Cereje|Flamb', case=False, na=False))
    hits = raw[mask.any(axis=1)]
    if not hits.empty:
        print('HITS')
        print(hits.to_string(index=False, header=False))
