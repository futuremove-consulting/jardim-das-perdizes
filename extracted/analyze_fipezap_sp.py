from pathlib import Path
import pandas as pd

path = Path('/home/ubuntu/estudo-jdp/fipezap-serieshistoricas.xlsx')
df = pd.read_excel(path, sheet_name='São Paulo', header=3)
print('COLUMNS')
for i, c in enumerate(df.columns):
    print(i, repr(c))
print('\nHEAD')
print(df.head(3).to_string(index=False))
print('\nTAIL')
print(df.tail(12).to_string(index=False))
