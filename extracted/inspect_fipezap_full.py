from pathlib import Path
import pandas as pd

path = Path('/home/ubuntu/estudo-jdp/historico-fipezap-01.xlsx')
df = pd.read_excel(path, sheet_name=0, header=None)
pd.set_option('display.max_rows', 200)
pd.set_option('display.max_columns', 20)
print(df.to_string(index=True, header=False))
