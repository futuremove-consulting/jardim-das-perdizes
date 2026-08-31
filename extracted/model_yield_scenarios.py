from pathlib import Path
import pandas as pd
import numpy as np

base = Path('/home/ubuntu/estudo-jdp')
# Representative observed asking prices from the audited sample / product ladder.
units = pd.DataFrame([
    {'segment':'79 m² / 2 dorm.', 'area_m2':79, 'price_brl':1300000},
    {'segment':'111 m² / 2 dorm.', 'area_m2':111, 'price_brl':2050000},
    {'segment':'157 m² / 3 dorm.', 'area_m2':157, 'price_brl':2600000},
    {'segment':'188 m² / 3 dorm.', 'area_m2':188, 'price_brl':3500000},
    {'segment':'241 m² / 4 dorm.', 'area_m2':241, 'price_brl':4400000},
])
# Observed sample medians from the cleaned offer sample.
standard_rent_m2 = 84.337349  # median of non-furnished sample
furnished_rent_m2 = 105.833333  # median of furnished sample
# FipeZAP SP benchmark July 2026
fipezap_rent_m2 = 65.177167
for label, rent_m2 in [('FipeZAP SP benchmark', fipezap_rent_m2), ('Observed standard sample', standard_rent_m2), ('Observed furnished sample', furnished_rent_m2)]:
    units[label+'_gross_yield_pct'] = units.area_m2*rent_m2*12/units.price_brl*100
    units[label+'_net_20pct_costs_pct'] = units[label+'_gross_yield_pct']*0.8
    units[label+'_net_30pct_costs_pct'] = units[label+'_gross_yield_pct']*0.7

out = units.round(4)
out.to_csv(base/'yield_scenario_table.csv', index=False, float_format='%.4f')
print(out.to_string(index=False))
print('\nAssumption note: net columns are illustrative gross yield less 20% or 30% operating-cost/vacancy haircut; not a tax or financing calculation.')
