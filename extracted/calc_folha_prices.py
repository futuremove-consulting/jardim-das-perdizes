rows = [
    ('Bosque Araucaria 158', 158, 2107450),
    ('Bosque Araucaria 170', 170, 1835970),
    ('Bosque Jequitiba 158', 158, 2119870),
    ('Bosque Jequitiba 201', 201, 2650880),
    ('Recanto Jacaranda 80', 80, 1132270),
    ('Recanto Jacaranda 108', 108, 1572790),
    ('Reserva Manaca 242', 242, 2817700),
    ('Reserva Manaca 283', 283, 3113080),
    ('Time 60', 60, 752760),
    ('Time 83', 83, 971440),
]
for label, area, price in rows:
    print(f'{label}: R$ {price/area:,.2f}/m²'.replace(',', 'X').replace('.', ',').replace('X','.'))
