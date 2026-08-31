from pathlib import Path
import pandas as pd

path = Path('/home/ubuntu/estudo-jdp/fipezap-serieshistoricas.xlsx')
xl = pd.ExcelFile(path)
print('SHEETS', xl.sheet_names)
for sheet in xl.sheet_names:
    df = pd.read_excel(path, sheet_name=sheet, header=None, nrows=12)
    print('\nSHEET', sheet, 'shape', pd.read_excel(path, sheet_name=sheet, header=None).shape)
    print(df.to_string(index=False, header=False))
