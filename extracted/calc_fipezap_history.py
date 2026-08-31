from pathlib import Path
import pandas as pd
import numpy as np

path = Path('/home/ubuntu/estudo-jdp/fipezap-serieshistoricas.xlsx')
raw = pd.read_excel(path, sheet_name='São Paulo', header=3)
# A primeira coluna é uma coluna de formatação vazia; a segunda é Data.
df = raw.iloc[:, 1:].copy()
df = df.rename(columns={df.columns[0]: 'date'})
df['date'] = pd.to_datetime(df['date'], errors='coerce')
df = df[df['date'].notna()].copy()
# Coerce all metrics to numeric; dots and strings become NaN.
for c in df.columns[1:]:
    df[c] = pd.to_numeric(df[c], errors='coerce')
# Mapping based on official 4-row header layout.
metrics = {
    'sale_index_total': 2,
    'sale_price_total': 17,
    'rent_index_total': 22,
    'rent_price_total': 37,
    'rent_yield_monthly': 42,
}
clean = pd.DataFrame({'date': df['date']})
for name, pos in metrics.items():
    # df includes date as first column, so pos from raw is pos-1 after iloc[:,1:]
    clean[name] = df.iloc[:, pos-1]
clean = clean.dropna(subset=['sale_price_total', 'rent_price_total']).sort_values('date')
# Save clean long table.
clean.to_csv('/home/ubuntu/estudo-jdp/fipezap_sp_clean.csv', index=False, float_format='%.10f')

latest = clean.iloc[-1]
print('LATEST', latest.to_dict())
print('DATE_RANGE', clean['date'].min().date(), clean['date'].max().date(), 'ROWS', len(clean))

for label, target in [('12m', latest['date'] - pd.DateOffset(years=1)), ('3y', latest['date'] - pd.DateOffset(years=3)), ('5y', latest['date'] - pd.DateOffset(years=5)), ('10y', latest['date'] - pd.DateOffset(years=10)), ('since_2011', pd.Timestamp('2011-10-01'))]:
    prior = clean.iloc[(clean['date']-target).abs().argsort()[:1]].iloc[0]
    out = {'period': label, 'prior_date': prior['date'].date(), 'latest_date': latest['date'].date()}
    for metric in ['sale_price_total', 'rent_price_total', 'sale_index_total', 'rent_index_total']:
        out[metric+'_prior'] = prior[metric]
        out[metric+'_latest'] = latest[metric]
        out[metric+'_change_pct'] = (latest[metric]/prior[metric]-1)*100 if prior[metric] and not pd.isna(prior[metric]) else np.nan
    out['yield_monthly_latest_pct'] = latest['rent_yield_monthly']*100
    print('PERIOD', out)

# Annual year-end values and YoY changes for recent years.
clean['year'] = clean['date'].dt.year
clean['month'] = clean['date'].dt.month
annual = clean.sort_values('date').groupby('year').tail(1).copy()
annual['sale_yoy_pct'] = annual['sale_price_total'].pct_change()*100
annual['rent_yoy_pct'] = annual['rent_price_total'].pct_change()*100
print('ANNUAL_TAIL')
print(annual[['date','sale_price_total','sale_yoy_pct','rent_price_total','rent_yoy_pct','rent_yield_monthly']].tail(12).to_string(index=False))
