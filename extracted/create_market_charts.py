from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

base = Path('/home/ubuntu/estudo-jdp')
fz = pd.read_csv(base/'fipezap_sp_clean.csv', parse_dates=['date'])
fz = fz.sort_values('date')
# Font and colors
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10,'axes.titlesize':14,'axes.labelsize':10})
blue = '#133B5C'; orange = '#C86428'; green = '#2E7D5B'; gray = '#616161'

# Chart 1: historical price per m2
fig, axes = plt.subplots(2, 1, figsize=(12, 8), sharex=True)
axes[0].plot(fz['date'], fz['sale_price_total'], color=blue, linewidth=2)
axes[0].set_title('São Paulo — preço pedido médio por m² (FipeZAP)')
axes[0].set_ylabel('Venda (R$/m²)')
axes[0].grid(alpha=.2)
axes[0].annotate('jul/2026: R$ 12.098,86/m²', xy=(fz.iloc[-1]['date'], fz.iloc[-1]['sale_price_total']), xytext=(-160, 20), textcoords='offset points', arrowprops=dict(arrowstyle='->', color=gray), color=blue)
axes[1].plot(fz['date'], fz['rent_price_total'], color=orange, linewidth=2)
axes[1].set_title('São Paulo — preço pedido médio de locação por m²/mês (FipeZAP)')
axes[1].set_ylabel('Aluguel (R$/m²/mês)')
axes[1].grid(alpha=.2)
axes[1].annotate('jul/2026: R$ 65,18/m²/mês', xy=(fz.iloc[-1]['date'], fz.iloc[-1]['rent_price_total']), xytext=(-175, 18), textcoords='offset points', arrowprops=dict(arrowstyle='->', color=gray), color=orange)
fig.text(0.01, 0.01, 'Fonte: FipeZAP/Fipe; preços de anúncios e médias móveis trimestrais. Data de referência: jul/2026.', fontsize=9, color=gray)
fig.tight_layout(rect=[0,0.04,1,1])
fig.savefig(base/'fipezap-sp-historico-precos.png', dpi=180, bbox_inches='tight')
plt.close(fig)

# Chart 2: scenario outcomes
segments = pd.DataFrame([
    {'segment':'79 m² / 2 dorm.', 'price':1300000},
    {'segment':'111 m² / 2 dorm.', 'price':2050000},
    {'segment':'157 m² / 3 dorm.', 'price':2600000},
    {'segment':'188 m² / 3 dorm.', 'price':3500000},
    {'segment':'241 m² / 4 dorm.', 'price':4400000},
])
scenarios = {'Bear (2% a.a.)':0.02, 'Base (5% a.a.)':0.05, 'Bull (8% a.a.)':0.08}
for name, rate in scenarios.items():
    segments[name] = segments['price']*((1+rate)**5)
fig, ax = plt.subplots(figsize=(12, 6.5))
x = np.arange(len(segments)); width=.25
colors=[ '#A65C5C', '#386FA4', '#3A8C6E']
for i, (name, color) in enumerate(zip(scenarios, colors)):
    bars=ax.bar(x+(i-1)*width, segments[name]/1e6, width, label=name, color=color)
    for b in bars:
        ax.text(b.get_x()+b.get_width()/2, b.get_height()+0.03, f'R$ {b.get_height():.2f} mi', ha='center', va='bottom', fontsize=8, rotation=90)
ax.set_xticks(x); ax.set_xticklabels(segments['segment'])
ax.set_ylabel('Preço nominal projetado em 5 anos (R$ milhões)')
ax.set_title('Jardim das Perdizes — cenários ilustrativos de preço em 5 anos')
ax.grid(axis='y', alpha=.2); ax.legend(frameon=False, ncols=3, loc='upper left')
fig.text(0.01, 0.01, 'Não é previsão nem garantia. Cenários aplicam crescimento nominal constante a preços pedidos observados em 27/08/2026.', fontsize=9, color=gray)
fig.tight_layout(rect=[0,0.04,1,1])
fig.savefig(base/'cenarios-preco-jardim-perdizes.png', dpi=180, bbox_inches='tight')
plt.close(fig)

print('created', base/'fipezap-sp-historico-precos.png')
print('created', base/'cenarios-preco-jardim-perdizes.png')
