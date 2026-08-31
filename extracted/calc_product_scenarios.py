from pathlib import Path
import pandas as pd
import numpy as np

base=Path('/home/ubuntu/estudo-jdp')
s=pd.read_csv(base/'base-longitudinal-produtos.csv', sep=';')
# five-year sensitivity, not forecast
rates={'Bear nominal 2%':0.02,'Base nominal 5%':0.05,'Bull nominal 8%':0.08}
rows=[]
for _,r in s.iterrows():
    if pd.isna(r['current_price_median_brl']): continue
    d={'produto':r['family'],'preco_atual_medio_mediano':r['current_price_median_brl'],'n_obs':r['current_n']}
    for name,rate in rates.items():
        fv=r['current_price_median_brl']*(1+rate)**5
        d[name]=fv
        d[name+';real_4%_inflacao']=fv/(1.04**5)-1
    rows.append(d)
out=pd.DataFrame(rows)
out.to_csv(base/'cenarios-5anos-por-produto.csv', sep=';', index=False, float_format='%.2f')
print(out.to_string(index=False))
