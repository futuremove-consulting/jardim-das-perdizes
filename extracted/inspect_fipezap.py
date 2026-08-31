from pathlib import Path
import pandas as pd

path = Path('/home/ubuntu/estudo-jdp/historico-fipezap-01.xlsx')
xl = pd.ExcelFile(path)
print('SHEETS', xl.sheet_names)
for sheet in xl.sheet_names:
    df = pd.read_excel(path, sheet_name=sheet, header=None)
    print('\nSHEET', sheet, 'shape', df.shape)
    print(df.head(12).to_string(index=False, header=False))
