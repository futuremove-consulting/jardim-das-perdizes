from pathlib import Path
import pandas as pd
import numpy as np

base = Path('/home/ubuntu/estudo-jdp')
path = base/'historico-lancamentos-tecnisa.xlsx'
raw = pd.read_excel(path, sheet_name=0, header=None)
# first data row is row 1; columns are row 0
raw = raw.iloc[1:].copy()
raw.columns = ['ano','trim','empreendimento','unidades','pct_tecnisa','vgv_total_milhoes','vgv_tecnisa_milhoes']
raw = raw.dropna(subset=['ano','empreendimento'])
raw['ano'] = pd.to_numeric(raw['ano'], errors='coerce').astype('Int64')
for c in ['unidades','pct_tecnisa','vgv_total_milhoes','vgv_tecnisa_milhoes']:
    raw[c] = pd.to_numeric(raw[c], errors='coerce')
mask = raw['empreendimento'].astype(str).str.contains(r'JDP|Jardim das Perdizes|Recanto Oliveiras|Bosque Cerejeiras|Reserva Flamboyant|Bosque Pitangueiras|Reserva Figueiras', case=False, regex=True, na=False)
jdp = raw[mask].copy()
jdp['vgv_total_brl'] = jdp['vgv_total_milhoes']*1_000_000
jdp['vgv_tecnisa_brl'] = jdp['vgv_tecnisa_milhoes']*1_000_000
jdp['launch_avg_price_per_unit_brl'] = jdp['vgv_total_brl']/jdp['unidades']
jdp['launch_avg_tecnisa_value_per_unit_brl'] = jdp['vgv_tecnisa_brl']/jdp['unidades']
jdp['id'] = jdp['ano'].astype(str)+'_'+jdp['trim'].astype(str)+'_'+jdp['empreendimento'].astype(str).str.replace(r'[^A-Za-z0-9]+','_',regex=True).str.strip('_')
cols = ['id','ano','trim','empreendimento','unidades','pct_tecnisa','vgv_total_milhoes','vgv_tecnisa_milhoes','vgv_total_brl','vgv_tecnisa_brl','launch_avg_price_per_unit_brl','launch_avg_tecnisa_value_per_unit_brl']
jdp[cols].to_csv(base/'jdp_lancamentos_tecnisa.csv', sep=';', index=False, float_format='%.6f')

print('JDP_ROWS', len(jdp))
print(jdp[cols].to_string(index=False))
print('\nSUMMARY_BY_YEAR')
print(jdp.groupby('ano').agg(rows=('empreendimento','count'), unidades=('unidades','sum'), vgv_total_milhoes=('vgv_total_milhoes','sum'), vgv_tecnisa_milhoes=('vgv_tecnisa_milhoes','sum')).to_string())
print('\nTOTAL')
print(jdp[['unidades','vgv_total_milhoes','vgv_tecnisa_milhoes']].sum().to_string())
