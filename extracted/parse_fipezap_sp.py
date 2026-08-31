from pathlib import Path
import pandas as pd

path = Path('/home/ubuntu/estudo-jdp/fipezap-serieshistoricas.xlsx')
df = pd.read_excel(path, sheet_name='São Paulo', header=49)
print('COLUMNS')
for i, c in enumerate(df.columns):
    print(i, repr(c))
print('\nTAIL')
print(df.tail(15).to_string(index=False))
