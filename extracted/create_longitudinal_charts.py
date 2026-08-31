from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

base=Path('/home/ubuntu/estudo-jdp')
s=pd.read_csv(base/'base-longitudinal-produtos.csv', sep=';')
# readable selected products with 2015 reference
x=s.dropna(subset=['reference_2015_m2']).copy()
x=x.sort_values('current_m2_median')
plt.style.use('seaborn-v0_8-whitegrid')
fig, ax=plt.subplots(figsize=(11,6.5), dpi=180)
labels=[v.replace('Bosque ','B. ').replace('Recanto ','R. ').replace('Reserva ','Res. ').replace(' (Residencial)','') for v in x['family']]
idx=np.arange(len(x)); w=.36
ax.bar(idx-w/2, x['reference_2015_m2'], width=w, label='Preço publicado em set/2015', color='#b9c4d0')
ax.bar(idx+w/2, x['current_m2_median'], width=w, label='Preço pedido atual mediano/observado', color='#1d4e89')
ax.set_xticks(idx, labels, rotation=25, ha='right')
ax.set_ylabel('R$/m² nominal')
ax.set_title('Jardim das Perdizes — referência de preço por m²: 2015 versus 2026')
ax.legend(frameon=True)
ax.text(0.01,-0.18,'Nota: são preços de oferta; não são transações. Plantas/andares/vistas podem não coincidir.', transform=ax.transAxes, fontsize=8)
fig.tight_layout()
fig.savefig(base/'comparacao-preco-m2-2015-2026.png', bbox_inches='tight')
plt.close(fig)

# launch average vs current median for all current products, with caution
z=s.dropna(subset=['launch_avg_unit_brl']).copy().sort_values('launch_avg_unit_brl')
fig, ax=plt.subplots(figsize=(11,7), dpi=180)
labels=[v.replace('Bosque ','B. ').replace('Recanto ','R. ').replace('Reserva ','Res. ').replace(' (Residencial)','') for v in z['family']]
idx=np.arange(len(z)); w=.36
ax.bar(idx-w/2, z['launch_avg_unit_brl']/1e6, width=w, label='VGV / unidades no lançamento', color='#d7a94b')
ax.bar(idx+w/2, z['current_price_median_brl']/1e6, width=w, label='Preço pedido atual mediano/observado', color='#2a7f62')
ax.set_xticks(idx, labels, rotation=32, ha='right')
ax.set_ylabel('R$ milhões por unidade')
ax.set_title('Preço médio implícito no lançamento versus preço pedido atual')
ax.legend(frameon=True)
ax.text(0.01,-0.19,'Nota: o VGV médio é do mix total; o preço atual é uma amostra de unidades. Não interpretar como valorização individual.', transform=ax.transAxes, fontsize=8)
fig.tight_layout()
fig.savefig(base/'lancamento-vs-preco-atual-por-produto.png', bbox_inches='tight')
plt.close(fig)
