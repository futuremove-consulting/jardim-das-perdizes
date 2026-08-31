from pathlib import Path
import pandas as pd
import numpy as np
import json
from datetime import datetime

base=Path('/home/ubuntu/estudo-jdp')
launch=pd.read_csv(base/'jdp_lancamentos_tecnisa.csv', sep=';')
# Aggregate official history to product/family where phases are explicit.
launch['family']=launch['empreendimento'].str.replace(r'\s*\(Fase [12]\)','',regex=True).str.replace('JDP - ','',regex=False)
agg=launch.groupby('family', as_index=False).agg(
    launch_year=('ano','min'), launch_quarter=('trim','first'), launch_rows=('empreendimento','count'),
    launch_units=('unidades','sum'), launch_vgv_m=('vgv_total_milhoes','sum'), launch_vgv_tecnisa_m=('vgv_tecnisa_milhoes','sum'))
agg['launch_avg_unit_brl']=agg['launch_vgv_m']*1_000_000/agg['launch_units']

# Public 2015 price references from Folha. These are not original launch prices; they are published offer/table references.
folha=[
 ('Bosque Araucária', '2015-09-11', 158, 2107450, 'Folha 2015'),
 ('Bosque Araucária', '2015-09-11', 170, 1835970, 'Folha 2015'),
 ('Bosque Jequitibá', '2015-09-11', 158, 2119870, 'Folha 2015'),
 ('Bosque Jequitibá', '2015-09-11', 201, 2650880, 'Folha 2015'),
 ('Recanto Jacarandá', '2015-09-11', 80, 1132270, 'Folha 2015'),
 ('Recanto Jacarandá', '2015-09-11', 108, 1572790, 'Folha 2015'),
 ('Reserva Manacá', '2015-09-11', 242, 2817700, 'Folha 2015'),
 ('Reserva Manacá', '2015-09-11', 283, 3113080, 'Folha 2015'),
 ('Time (Residencial)', '2015-09-11', 60, 752760, 'Folha 2015'),
 ('Time (Residencial)', '2015-09-11', 83, 971440, 'Folha 2015'),
]
folha=pd.DataFrame(folha, columns=['family','date_2015','area_m2','price_2015_brl','source_2015'])
folha['price_2015_per_m2']=folha['price_2015_brl']/folha['area_m2']

# Current public observations on 27/08/2026. Separate status and comparability.
current=[
 ('Recanto Jacarandá','2026-08-27',79,1365000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',79,1485000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',79,1500000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',108,1855000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',108,1980000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',108,1990000,'Imovelweb','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',108,2050000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Jacarandá','2026-08-27',108,2100000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Jequitibá','2026-08-27',159,2970000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Jequitibá','2026-08-27',159,3000000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Jequitibá','2026-08-27',159,3180000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Jequitibá','2026-08-27',242,4197000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Araucária','2026-08-27',157,2550000,'revenda','Imoveis JN', 'JDP-specific'),
 ('Time (Residencial)','2026-08-27',63,1100000,'revenda','Unyk Home', 'JDP-specific'),
 ('Reserva Manacá','2026-08-27',283,5350000,'revenda','Imovelweb', 'JDP-specific'),
 ('Reserva Manacá','2026-08-27',283,6000000,'revenda','Imovelweb', 'JDP-specific'),
 ('Reserva Manacá','2026-08-27',421,11000000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',79,1300000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',79,1500000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',79,1750000,'revenda','Imovelweb/Imoveis JN', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',98,2020000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',136,2200000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',136,2400000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',136,2550000,'revenda','Imovelweb', 'JDP-specific'),
 ('Bosque Pitangueiras','2026-08-27',151,1999000,'revenda_or_outlier','Imovelweb', 'JDP-specific; area/price needs validation'),
 ('Reserva Figueiras','2026-08-27',165,3200000,'revenda','Imoveis JN', 'JDP-specific'),
 ('Reserva Figueiras','2026-08-27',188,3690000,'revenda','Imovelweb', 'JDP-specific'),
 ('Recanto Oliveiras','2026-08-27',109,1692000,'primary_stock_table','Imoveis JN', 'JDP-specific; table Aug 2026, delivery Aug 2027'),
 ('Bosque Cerejeiras','2026-08-27',222,3430000,'primary_stock_table','Imoveis JN', 'JDP-specific; cash price from, delivery Oct 2027'),
 ('Reserva Flamboyant','2026-08-27',157,2555000,'primary_stock_table','Imoveis JN', 'JDP-specific; launch/new stock'),
]
current=pd.DataFrame(current, columns=['family','date_current','area_m2','price_current_brl','status','source_current','note'])
current['price_current_per_m2']=current['price_current_brl']/current['area_m2']

# IPCA accumulated from Oct 2015 through Jul 2026 to compare Folha reference to current observation.
ipca=json.loads((base/'ipca_bcb_433.json').read_text())
start=datetime.strptime('01/10/2015','%d/%m/%Y'); end=datetime.strptime('01/07/2026','%d/%m/%Y')
acc=1.0
for r in ipca:
    d=datetime.strptime(r['data'],'%d/%m/%Y')
    if start <= d <= end: acc *= 1+float(r['valor'])/100

# Product summary: current median by exact area; match 2015 reference by closest area.
rows=[]
for fam, g in current.groupby('family'):
    g=g.sort_values('price_current_per_m2')
    med_price=float(g['price_current_brl'].median())
    med_m2=float(g['price_current_per_m2'].median())
    exact_launch=agg[agg['family'].eq(fam)]
    launch_year=int(exact_launch['launch_year'].iloc[0]) if len(exact_launch) else None
    launch_units=float(exact_launch['launch_units'].iloc[0]) if len(exact_launch) else None
    launch_vgv=float(exact_launch['launch_vgv_m'].iloc[0]) if len(exact_launch) else None
    launch_avg=float(exact_launch['launch_avg_unit_brl'].iloc[0]) if len(exact_launch) else None
    f=folha[folha['family'].eq(fam)]
    if len(f):
        # closest area to median current area
        med_area=float(g['area_m2'].median())
        ff=f.iloc[(f['area_m2']-med_area).abs().argsort()[:1]]
        old_m2=float(ff['price_2015_per_m2'].iloc[0]); old_area=float(ff['area_m2'].iloc[0]); old_price=float(ff['price_2015_brl'].iloc[0])
        nominal=med_m2/old_m2-1
        real=(med_m2/old_m2)/acc-1
        cagr=(med_m2/old_m2)**(1/((datetime(2026,7,1)-datetime(2015,9,11)).days/365.2425))-1
        real_cagr=((med_m2/old_m2)/acc)**(1/((datetime(2026,7,1)-datetime(2015,9,11)).days/365.2425))-1
    else:
        old_m2=old_area=old_price=nominal=real=cagr=real_cagr=np.nan
    rows.append({
        'family':fam,'launch_year':launch_year,'launch_units':launch_units,'launch_vgv_m':launch_vgv,'launch_avg_unit_brl':launch_avg,
        'current_n':len(g),'current_area_median':float(g['area_m2'].median()),'current_price_median_brl':med_price,'current_m2_median':med_m2,
        'reference_2015_area_m2':old_area,'reference_2015_price_brl':old_price,'reference_2015_m2':old_m2,
        'nominal_change_2015_to_current_pct':nominal*100,'real_change_2015_to_current_pct':real*100,'nominal_cagr_pct':cagr*100,'real_cagr_pct':real_cagr*100,
        'current_sources':'; '.join(sorted(set(g['source_current']))),'comparability_note':'Price asked/current observation; not transaction; exact-unit match unavailable.'
    })
summary=pd.DataFrame(rows)
summary.to_csv(base/'base-longitudinal-produtos.csv', sep=';', index=False, float_format='%.6f')
folha.to_csv(base/'precos-publicados-folha-2015.csv', sep=';', index=False, float_format='%.6f')
current.to_csv(base/'precos-atuais-por-produto-2026-08-27.csv', sep=';', index=False, float_format='%.6f')

print('IPCA_OCT2015_JUL2026_PCT', (acc-1)*100)
print('\nPRODUCT_SUMMARY')
print(summary.to_string(index=False))
print('\nOFFICIAL_LAUNCH_AGG')
print(agg.to_string(index=False))
