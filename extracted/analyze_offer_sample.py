from pathlib import Path
import pandas as pd
import numpy as np

base = Path('/home/ubuntu/estudo-jdp')
df = pd.read_csv(base/'amostra-oferta-27-08-2026.csv', sep=';')
for c in ['area_m2','bedrooms','suites','parking_spaces','asking_price_brl','rent_brl_month','condo_brl_month','iptu_brl_month']:
    df[c] = pd.to_numeric(df[c], errors='coerce')
df['asking_price_m2'] = df['asking_price_brl']/df['area_m2']
df['rent_m2'] = df['rent_brl_month']/df['area_m2']
df['gross_yield_annual_pct'] = df['rent_brl_month']*12/df['asking_price_brl']*100

# descriptive tables
for op in ['venda','aluguel']:
    s = df[df.operation==op].copy()
    if op == 'venda':
        s = s[s.quality_flag != 'amostra_portal_anomalia']
        print('\nOPERATION', op, 'N', len(s))
        print(s.groupby(pd.cut(s.area_m2, bins=[0,100,180,1000], labels=['<=100m2','101-180m2','>180m2']), observed=False)['asking_price_m2'].agg(['count','median','mean','min','max']).to_string())
        print('\nBY_SOURCE')
        print(s.groupby('source')['asking_price_m2'].agg(['count','median','min','max']).to_string())
        print('\nBY_BEDROOMS')
        print(s.groupby('bedrooms')['asking_price_m2'].agg(['count','median','min','max']).to_string())
    else:
        print('\nOPERATION', op, 'N', len(s))
        print(s.groupby(pd.cut(s.area_m2, bins=[0,70,110,1000], labels=['<=70m2','71-110m2','>110m2']), observed=False)['rent_m2'].agg(['count','median','mean','min','max']).to_string())
        print('\nBY_FURNISHED')
        print(s.groupby('furnished')['rent_m2'].agg(['count','median','min','max']).to_string())
        print('\nGROSS_YIELD_FOR_MATCHED_SAMPLE')
        # Only same-source with both sale and rent cannot be matched by unit, so only show illustrative yield using price and rent bands separately not exact pairing.
        print(s[['source','location_label','area_m2','rent_brl_month','rent_m2','quality_flag']].to_string(index=False))

# Sample row-level output for audit.
df.to_csv(base/'amostra-oferta-27-08-2026-enriquecida.csv', sep=';', index=False, float_format='%.6f')
