from pathlib import Path
import json
import math
import pandas as pd
import numpy as np

base = Path('/home/ubuntu/estudo-jdp')
# Read cleaned FipeZAP data created earlier.
fz = pd.read_csv(base/'fipezap_sp_clean.csv', parse_dates=['date'])
fz = fz.sort_values('date').copy()
# Read BCB SGS 433 monthly IPCA data.
with open(base/'ipca_bcb_433.json', encoding='utf-8') as f:
    ipca_raw = json.load(f)
ipca = pd.DataFrame(ipca_raw)
ipca['date'] = pd.to_datetime(ipca['data'], dayfirst=True)
ipca['ipca_pct'] = pd.to_numeric(ipca['valor'], errors='coerce')
ipca = ipca[['date','ipca_pct']].sort_values('date')

latest = fz.iloc[-1]
rows = []
for label, target in [('12m', latest['date'] - pd.DateOffset(years=1)), ('3y', latest['date'] - pd.DateOffset(years=3)), ('5y', latest['date'] - pd.DateOffset(years=5)), ('10y', latest['date'] - pd.DateOffset(years=10)), ('since_2011', pd.Timestamp('2011-10-01'))]:
    prior = fz.iloc[(fz['date']-target).abs().argsort()[:1]].iloc[0]
    # Inflation from month after prior observation through latest month inclusive.
    infl_window = ipca[(ipca['date'] > prior['date']) & (ipca['date'] <= latest['date'])]
    infl_factor = np.prod(1 + infl_window['ipca_pct'].to_numpy()/100)
    nominal_sale = latest['sale_price_total']/prior['sale_price_total'] - 1
    nominal_rent = latest['rent_price_total']/prior['rent_price_total'] - 1
    real_sale = (1+nominal_sale)/infl_factor - 1
    real_rent = (1+nominal_rent)/infl_factor - 1
    years = (latest['date'] - prior['date']).days/365.2425
    rows.append({
        'period': label, 'prior_date': prior['date'].date(), 'latest_date': latest['date'].date(),
        'sale_prior_r_m2': prior['sale_price_total'], 'sale_latest_r_m2': latest['sale_price_total'],
        'sale_nominal_change_pct': nominal_sale*100, 'ipca_change_pct': (infl_factor-1)*100,
        'sale_real_change_pct': real_sale*100, 'sale_nominal_cagr_pct': ((1+nominal_sale)**(1/years)-1)*100,
        'sale_real_cagr_pct': ((1+real_sale)**(1/years)-1)*100,
        'rent_prior_r_m2': prior['rent_price_total'], 'rent_latest_r_m2': latest['rent_price_total'],
        'rent_nominal_change_pct': nominal_rent*100, 'rent_real_change_pct': real_rent*100,
        'rent_nominal_cagr_pct': ((1+nominal_rent)**(1/years)-1)*100,
        'rent_real_cagr_pct': ((1+real_rent)**(1/years)-1)*100,
        'years': years,
    })
res = pd.DataFrame(rows)
res.to_csv(base/'fipezap_sp_real_returns.csv', index=False, float_format='%.6f')
print(res.to_string(index=False))
print('\nLATEST_YIELD_MONTHLY_PCT', latest['rent_yield_monthly']*100)
print('LATEST_YIELD_ANNUAL_SIMPLE_PCT', latest['rent_yield_monthly']*12*100)
print('LATEST_YIELD_ANNUAL_COMPOUNDED_PCT', ((1+latest['rent_yield_monthly'])**12-1)*100)
