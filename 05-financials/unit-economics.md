# Unit Economics — Deep Dive

> Numeri di dettaglio per supportare conversazioni con investitori e selection panel.
> Tutti i valori sono **ipotesi pre-pilot** — da aggiornare con dati reali.

---

## Cliente tipo: editore Professional

**Profilo**: editore italiano medio-grande, 3 collane attive, ~1.500 manoscritti ricevuti/anno, 6 editor interni.

### Anno 1 (acquisizione + delivery)

| Voce | € |
|---|---|
| Setup fee | 10.000 |
| Annual subscription | 42.000 |
| **Revenue Y1** | **52.000** |
| Costo API + infra (1.500 ms × €7) | -10.500 |
| Customer success (10% time × 1 CSM €60K) | -6.000 |
| Editor calibration sessions | -2.500 |
| **COGS Y1** | **-19.000** |
| **Gross profit Y1** | **33.000** |
| Gross margin Y1 | 63% |

### Anno 2+ (steady state)

| Voce | € |
|---|---|
| Annual subscription | 42.000 |
| Expansion (1 collana aggiuntiva) | +12.000 |
| **Revenue Y2** | **54.000** |
| COGS (no setup, infra ridotta) | -13.500 |
| **Gross profit Y2** | **40.500** |
| Gross margin Y2 | 75% |

---

## CAC breakdown

Sales ciclo enterprise editoriale: 4–9 mesi.

| Componente CAC | € |
|---|---|
| Eventi di settore (Tempo di Libri, Più Libri Più Liberi, Bologna Children's) | 4.000 |
| Founder time in sales (allocato) | 8.000 |
| Materiali, demo, viaggi | 2.000 |
| Tooling sales (CRM, calendario, video) | 1.000 |
| **CAC totale per cliente Pro** | **15.000** |

CAC payback: ~4.5 mesi su gross profit Y1.

---

## LTV (scenario conservativo)

Ipotesi: durata media cliente 5 anni, expansion 5%/anno, churn 8%/anno.

| Anno | Revenue | Gross profit | Cumulativo |
|---|---|---|---|
| 1 | 52.000 | 33.000 | 33.000 |
| 2 | 54.000 | 40.500 | 73.500 |
| 3 | 56.700 | 42.500 | 116.000 |
| 4 | 59.500 | 44.600 | 160.600 |
| 5 | 62.500 | 46.900 | 207.500 |

**LTV stimato: ~€207K** | **LTV/CAC: 13.8x**

*Nota: ratio aggressivo, da abbattere del 30-40% in scenario pessimistico (churn 15%, no expansion).*

---

## Burn-to-revenue (scenario seed)

| Trimestre | Headcount | Burn mensile | ARR end | Burn/ARR |
|---|---|---|---|---|
| Q1 Y1 | 4 | 30K | 50K | 7.2 |
| Q4 Y1 | 5 | 40K | 170K | 2.8 |
| Q4 Y2 | 11 | 75K | 640K | 1.4 |
| Q4 Y3 | 22 | 130K | 1.8M | 0.87 |

Obiettivo: burn/ARR < 1.0 entro Q3 Y3.

---

## Sensitivity (cosa cambia se...)

| Variabile | Caso base | Pessimistico | Ottimistico |
|---|---|---|---|
| ARPU medio | 55K | 38K | 75K |
| CAC | 15K | 22K | 10K |
| Churn annuo | 8% | 18% | 4% |
| LTV/CAC | 13.8 | 4.2 | 28+ |
| Break-even mese | M28 | M44 | M19 |

---

## Cose da NON dire al panel
- "Il margine è il 90%". Non è vero. I costi API sono reali e variabili.
- "Il sales ciclo è 60 giorni". Non in editoria enterprise. Sii onesto: 4-9 mesi.
- "Churn zero". Nessuno crede al churn zero. 5-10% è la realtà attesa.

## Cose da dire al panel
- "LTV/CAC è il numero su cui abbiamo più incertezza. Lo validiamo nei primi 3 contratti."
- "Il modello è cash-positive sul singolo cliente già dal mese 5."
- "L'espansione su collane aggiuntive è il nostro vero motore di crescita anni 2-3."
