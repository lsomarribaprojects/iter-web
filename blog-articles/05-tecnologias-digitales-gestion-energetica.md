# Tecnologías Digitales para la Gestión Energética: IoT, Big Data e IA

**Metadata:**
- **Title:** Tecnologías Digitales para la Gestión Energética: IoT, Big Data e IA
- **Slug:** tecnologias-digitales-iot-big-data-ia-gestion-energetica
- **Excerpt:** Guía completa sobre cómo las tecnologías digitales (IoT, Big Data, Inteligencia Artificial) están revolucionando la gestión energética, incluyendo arquitecturas de sistemas, casos de uso y ROI esperado.
- **Category:** energia
- **Tags:** IoT, Big Data, Inteligencia Artificial, Industria 4.0, EMIS, gestión energética digital
- **Author:** ITER Energy Solutions
- **PublishedDate:** 2024-01-28
- **UpdatedDate:** 2024-01-28
- **Featured:** true
- **Reading Time:** 15 min

---

## Introducción

La convergencia de tecnologías digitales con la gestión energética está transformando radicalmente cómo las organizaciones monitorean, analizan y optimizan su consumo energético. Lo que antes requería mediciones manuales, hojas de cálculo y análisis semanales, ahora se realiza en tiempo real con precisión y escala sin precedentes.

Las tecnologías clave de esta revolución digital energética incluyen:

- **IoT (Internet of Things):** Sensores inteligentes y medidores conectados
- **Big Data:** Procesamiento de millones de puntos de datos
- **Inteligencia Artificial:** Machine Learning para predicción y optimización
- **Cloud Computing:** Plataformas escalables y accesibles
- **Edge Computing:** Procesamiento en el punto de medición

Según la Agencia Internacional de Energía (IEA), la digitalización puede desbloquear ahorros energéticos del **10-20%** adicionales a medidas tradicionales, con inversiones que se pagan en **1.5-3 años**.

Este artículo explora cómo implementar estas tecnologías efectivamente en sistemas de gestión energética ISO 50001.

## IoT en Gestión Energética

### Arquitectura de Sistemas IoT Energéticos

**Stack Tecnológico Típico:**

```
┌─────────────────────────────────────────────────────┐
│              CAPA 5: APLICACIONES                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │Dashboard │ │ Reportes │ │Alertas   │            │
│  │Web/Móvil │ │ISO 50001 │ │Automáticas│           │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
                        ▲
┌─────────────────────────────────────────────────────┐
│         CAPA 4: PLATAFORMA IoT / EMIS               │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ Base de Datos│  │ Motor Analytics│              │
│  │ (InfluxDB,   │  │ (Python, R,   │              │
│  │  TimescaleDB)│  │  Spark)       │              │
│  └──────────────┘  └──────────────┘                │
└─────────────────────────────────────────────────────┘
                        ▲
┌─────────────────────────────────────────────────────┐
│           CAPA 3: CONECTIVIDAD                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ 4G/5G    │ │ Wi-Fi    │ │ Ethernet │            │
│  │ LoRaWAN  │ │ Zigbee   │ │ Modbus   │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└─────────────────────────────────────────────────────┘
                        ▲
┌─────────────────────────────────────────────────────┐
│          CAPA 2: GATEWAY / EDGE                     │
│  ┌──────────────────────────────────┐               │
│  │ Concentrador de Datos            │               │
│  │ - Agregación de sensores         │               │
│  │ - Pre-procesamiento local        │               │
│  │ - Almacenamiento temporal        │               │
│  └──────────────────────────────────┘               │
└─────────────────────────────────────────────────────┘
                        ▲
┌─────────────────────────────────────────────────────┐
│       CAPA 1: SENSORES Y MEDIDORES                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐      │
│  │ Medidores  │ │ Sensores   │ │ Actuadores │      │
│  │ Energía    │ │ Temp/HR/   │ │ (Válvulas, │      │
│  │ (kWh, kW)  │ │ Presión    │ │  VFDs)     │      │
│  └────────────┘ └────────────┘ └────────────┘      │
└─────────────────────────────────────────────────────┘
```

### Tipos de Dispositivos IoT

#### 1. Medidores Inteligentes de Energía

**Medidores Eléctricos IoT:**

```
Especificaciones típicas:
- Clase de precisión: 1 o superior (IEC 61557-12)
- Parámetros medidos:
  * Energía activa (kWh) por tarifa
  * Energía reactiva (kVArh)
  * Potencia activa/reactiva instantánea (kW, kVAr)
  * Tensión, corriente por fase
  * Factor de potencia (cos φ)
  * Armónicos (THD-V, THD-I hasta orden 31)
  * Frecuencia
- Intervalo de registro: 1-15 minutos (configurable)
- Comunicación: Modbus RTU/TCP, M-Bus, LoRaWAN
- Alimentación: Red eléctrica o batería (10 años autonomía)

Ejemplos comerciales:
- Schneider Electric PowerLogic PM5000 Series
- Siemens SENTRON PAC Series
- Carlo Gavazzi EM340
- Eastron SDM630-Modbus

Costo: €150-€800/unidad (según funcionalidades)
```

**Medidores de Gas Inteligentes:**

```
Tecnologías:
- Ultrasónicos (alta precisión, sin partes móviles)
- Turbina (económicos, requieren mantenimiento)

Parámetros:
- Caudal instantáneo (m³/h)
- Volumen totalizado (m³)
- Temperatura gas
- Presión (si integrado)
- Poder calorífico (si integrado)

Comunicación: M-Bus, LoRaWAN, NB-IoT
Precisión: ±1-2% (clase 1.5 según EN 1359)

Ejemplo: Itron Cyble 5
Costo: €200-€600/unidad
```

**Medidores de Agua IoT:**

```
Tecnologías:
- Electromagnéticos (sin obstrucciones, alta precisión)
- Ultrasónicos (no invasivos, instalación sencilla)

Aplicaciones en gestión energética:
- Monitoreo consumo torres de enfriamiento
- Detección fugas (pérdidas energéticas indirectas)
- Optimización circuitos hidráulicos HVAC

Comunicación: M-Bus, LoRaWAN
Precisión: ±2% (clase B según EN 14154)

Ejemplo: Kamstrup MULTICAL 21
Costo: €180-€500/unidad
```

#### 2. Sensores Ambientales

**Sensor Temperatura/Humedad:**

```
Parámetros:
- Temperatura: -40°C a +85°C (±0.3°C precisión)
- Humedad relativa: 0-100% (±2% precisión)

Protocolos: Zigbee, LoRaWAN, Wi-Fi
Alimentación: Batería (2-5 años autonomía)

Aplicaciones:
- Monitoreo confort térmico (HVAC)
- Detección sobrecalentamientos equipos
- Validación modelos de regresión (HDD/CDD)

Ejemplos:
- Dragino LHT65 (LoRaWAN): €45
- Shelly H&T (Wi-Fi): €35
- Sonoff SNZB-02 (Zigbee): €12

ROI: Payback <1 año mediante optimización HVAC
```

**Sensor CO₂:**

```
Rango: 0-5000 ppm
Precisión: ±30 ppm + 3% de lectura

Aplicación clave:
Ventilación demand-controlled (DCV):
- Ventilación proporcional a ocupación
- Ahorro 30-50% energía HVAC vs. caudal constante

Cálculo de ahorro:
Sistema HVAC: 200 kW eléctricos
Horas operación: 4,000 h/año
Consumo actual: 800,000 kWh/año
Ahorro con DCV: 40% = 320,000 kWh/año
Valor ahorro: 320,000 × €0.14 = €44,800/año

Inversión:
20 sensores CO₂: 20 × €180 = €3,600
Integración BMS: €8,000
Total: €11,600

Payback: 0.26 años (3 meses)

Ejemplos:
- Aranet4 PRO (wireless): €300
- Telaire T6615 (Modbus): €180
```

#### 3. Actuadores Inteligentes

**VFDs (Variadores de Frecuencia) con IoT:**

```
Funcionalidades IoT integradas:
- Monitoreo consumo en tiempo real
- Diagnóstico predictivo (vibración, temperatura)
- Optimización automática según demanda
- Alarmas remotas

Protocolos: Modbus, Profinet, EtherNet/IP, OPC UA

Datos expuestos:
- Frecuencia de salida (Hz)
- Corriente motor (A)
- Potencia activa (kW)
- Horas de operación
- Temperatura inversor
- Códigos de fallo

Ejemplo: ABB ACS880 con módulo IoT
Costo adicional IoT: €300-€800 vs. VFD estándar

Beneficio:
- Optimización continua basada en ML
- Mantenimiento predictivo (↓ 25% paros no planificados)
- Ahorro adicional 5-8% vs. VFD sin IoT
```

**Válvulas Motorizadas con Feedback:**

```
Aplicación: Control preciso circuitos térmicos

Características IoT:
- Posición actual válvula (0-100%)
- Comando remoto apertura/cierre
- Contador ciclos (mantenimiento predictivo)
- Detección obstrucciones

Protocolo: BACnet, Modbus

Ejemplo:
Sistema calefacción 15 zonas térmicas:
- Sin control zonal: Sobrecalentamiento zonas → desperdicio
- Con válvulas IoT + termostatos: Calefacción por demanda real

Ahorro típico: 20-30% energía térmica

Costo: €200-€500/válvula motorizada con IoT
```

### Protocolos de Comunicación IoT

#### Comparativa de Tecnologías

| Protocolo | Alcance | Ancho Banda | Consumo | Penetración | Costo | Uso Típico |
|-----------|---------|-------------|---------|-------------|-------|------------|
| **LoRaWAN** | 2-15 km | 0.3-50 kbps | Muy bajo | Excelente | Bajo | Exteriores, campus |
| **NB-IoT** | 1-10 km | 200 kbps | Bajo | Buena | Medio | Medidores urbanos |
| **Zigbee** | 10-100 m | 250 kbps | Bajo | Regular | Bajo | Interiores, mesh |
| **Wi-Fi** | 30-100 m | 1-300 Mbps | Alto | Limitada | Bajo | Interiores, datos |
| **Modbus** | 1200 m | 19.2 kbps | N/A | N/A | Muy bajo | Industrial, cableado |
| **BACnet** | Variable | Variable | N/A | N/A | Medio | HVAC, BMS |

**Recomendaciones por Escenario:**

```
CAMPUS/MÚLTIPLES EDIFICIOS:
→ LoRaWAN
Ventajas:
- 1 gateway cubre 2-5 km radio
- Sin cableado
- Batería sensores: 5-10 años
- Bajo costo operativo

Arquitectura:
Gateway LoRaWAN → Servidor (TTN o privado) → EMIS

PLANTA INDUSTRIAL:
→ Modbus RTU/TCP sobre Ethernet
Ventajas:
- Robusto, probado
- Interoperable con equipos industriales
- Baja latencia
- Determinista

Arquitectura:
Medidores Modbus → Gateway industrial → SCADA/EMIS

EDIFICIO INTELIGENTE:
→ BACnet/IP + Zigbee
Ventajas:
- BACnet: Estándar HVAC
- Zigbee: Red mesh para sensores
- Integración nativa BMS

Arquitectura:
Sensores Zigbee + Equipos BACnet → BMS → EMIS
```

### Implementación Práctica IoT

**Caso de Estudio: Planta Manufactura 50,000 m²**

**Situación Inicial:**
- 1 medidor principal (acometida)
- Facturas mensuales únicas
- Sin visibilidad consumo por proceso
- Análisis energético manual trimestral

**Solución IoT Implementada:**

```
MEDIDORES INSTALADOS (Total: 28 unidades):

Nivel 1 - Acometida (1 medidor):
├─ Medidor principal trifásico clase 0.5S
   └─ Schneider PM5560 (€650)
   └─ Modbus TCP/IP
   └─ Intervalo: 1 minuto

Nivel 2 - Submedidores por Área (8 medidores):
├─ Producción Nave A: Carlo Gavazzi EM340 (€320)
├─ Producción Nave B: Carlo Gavazzi EM340 (€320)
├─ Producción Nave C: Carlo Gavazzi EM340 (€320)
├─ HVAC Total: Carlo Gavazzi EM340 (€320)
├─ Aire Comprimido: Carlo Gavazzi EM340 (€320)
├─ Iluminación: Carlo Gavazzi EM340 (€320)
├─ Oficinas: Carlo Gavazzi EM340 (€320)
└─ Almacén: Carlo Gavazzi EM340 (€320)
   └─ Modbus RTU → Gateway
   └─ Intervalo: 5 minutos

Nivel 3 - SEUs Específicos (19 medidores):
├─ Compresor 1 (75 kW): Eastron SDM630 (€180)
├─ Compresor 2 (75 kW): Eastron SDM630 (€180)
├─ Chiller 1 (150 kW): Eastron SDM630 (€180)
├─ Chiller 2 (150 kW): Eastron SDM630 (€180)
├─ Línea Producción 1: Eastron SDM630 (€180)
├─ Línea Producción 2: Eastron SDM630 (€180)
├─ Línea Producción 3: Eastron SDM630 (€180)
├─ Horno Principal: Eastron SDM630 (€180)
├─ ... (11 medidores adicionales)
   └─ Modbus RTU → Gateway
   └─ Intervalo: 1 minuto

SENSORES AMBIENTALES (Total: 35 unidades):
├─ Temperatura/Humedad (25× zonas térmicas)
│  └─ Dragino LHT65 (LoRaWAN): €45 × 25 = €1,125
├─ CO₂ (10× salas principales)
│  └─ Telaire T6615: €180 × 10 = €1,800

INFRAESTRUCTURA:
├─ Gateway Modbus → Ethernet: €800
├─ Gateway LoRaWAN: €350
├─ Switch industrial 24 puertos: €450
└─ Servidor edge (procesamiento local): €2,500

PLATAFORMA SOFTWARE:
└─ Licencia EMIS anual: €8,000/año

INVERSIÓN TOTAL:
Medidores: €9,210
Sensores: €2,925
Infraestructura: €4,100
Instalación eléctrica: €8,500
Software (año 1): €8,000
──────────────────
Total: €32,735
```

**Resultados Después de 12 Meses:**

```
AHORROS IDENTIFICADOS Y EJECUTADOS:

1. Aire Comprimido (Detección Fugas):
   - Consumo base nocturno detectado: 18 kW (antes no visible)
   - Fugas identificadas con auditoría ultrasónica
   - Reparación fugas: €2,500
   - Ahorro: 157,680 kWh/año × €0.14 = €22,075/año

2. HVAC (Optimización Horarios):
   - Datos temperatura/ocupación → ajuste automático
   - Reducción horas operación: 15%
   - Ahorro: 120,000 kWh/año × €0.14 = €16,800/año

3. Producción (Peak Shaving):
   - Visibilidad demanda en tiempo real
   - Redistribución cargas no críticas
   - Reducción potencia contratada: -50 kW
   - Ahorro: 50 kW × €40/kW·año = €2,000/año
   - Ahorro energía valle: 35,000 kWh/año × €0.04 = €1,400/año

4. Iluminación (Detección Sobreconsumo):
   - Identificadas 85 luminarias encendidas 24/7 innecesariamente
   - Instalación sensores ocupación
   - Ahorro: 44,200 kWh/año × €0.14 = €6,188/año

5. Optimización Chillers (Secuenciación):
   - Algoritmo ML para carga óptima
   - Mejora eficiencia 8%
   - Ahorro: 96,000 kWh/año × €0.14 = €13,440/año

AHORRO TOTAL ANUAL: €61,903

ROI:
Inversión: €32,735
Ahorro año 1: €61,903
Payback: 0.53 años (6.4 meses)
VAN (10 años, 5%): €445,180
TIR: 186%

BENEFICIOS ADICIONALES NO MONETIZADOS:
- Cumplimiento ISO 50001 simplificado
- Datos para EnPIs robustos
- Alertas proactivas (evitados 3 paros por sobrecarga)
- Base para mantenimiento predictivo
```

## Big Data en Gestión Energética

### Características de Big Data Energético

**Las 5 V's del Big Data Aplicado a Energía:**

**1. Volumen:**
```
Instalación típica 500 medidores IoT:
- Frecuencia muestreo: 1 minuto
- Parámetros por medidor: 20 (kW, kWh, V, I, cosφ, THD, etc.)
- Datos/mes: 500 × 20 × 60×24×30 = 432,000,000 datos
- Tamaño almacenamiento: ~15 GB/mes (comprimido)
- Retención 3 años: ~540 GB

Procesamiento:
Bases de datos especializadas en series temporales:
- InfluxDB (open source)
- TimescaleDB (PostgreSQL extension)
- Prometheus + Grafana

Ventajas vs. bases de datos relacionales:
- Compresión 10-20×
- Queries temporales 100× más rápidas
```

**2. Velocidad:**
```
Requerimientos tiempo real:
- Ingestión: 10,000+ puntos/segundo
- Procesamiento streaming: Apache Kafka, Apache Flink
- Visualización: Actualización cada 5-15 segundos

Ejemplo alertas en tiempo real:
IF (Potencia_actual > Potencia_contratada × 0.95) THEN
   SEND_ALERT("Warning: Acercándose a límite potencia contratada")
   SUGGEST_ACTION("Reducir carga no crítica en Área X")

Latencia objetivo: <5 segundos (desde medición hasta alerta)
```

**3. Variedad:**
```
Fuentes de datos heterogéneas:
- Medidores energía (Modbus, M-Bus)
- Sensores IoT (LoRaWAN, Zigbee)
- BMS/SCADA (OPC UA, BACnet)
- ERP (producción, ventas)
- APIs externas (clima, precios energía)
- Mantenimiento (CMMS)

Integración:
Plataforma middleware: Node-RED, Apache NiFi
Normalización datos → Modelo común
```

**4. Veracidad:**
```
Desafíos calidad de datos:
- Sensores descalibrados: ±5-10% error
- Gaps en datos (pérdida conectividad): 2-5%
- Outliers (lecturas anómalas): 1-3%

Técnicas de limpieza:
1. Detección outliers: Isolation Forest, Z-score
2. Imputación gaps: Interpolación lineal, k-NN
3. Validación cruzada: Comparar con medidores redundantes

Ejemplo código Python:
```python
import pandas as pd
from sklearn.ensemble import IsolationForest

# Cargar datos
df = pd.read_csv('consumo_energia.csv', parse_dates=['timestamp'])

# Detección outliers
iso_forest = IsolationForest(contamination=0.05)
df['outlier'] = iso_forest.fit_predict(df[['kW']])

# Filtrar outliers
df_clean = df[df['outlier'] == 1]

# Imputar gaps
df_clean = df_clean.set_index('timestamp')
df_clean = df_clean.resample('5T').interpolate(method='time')

print(f"Datos originales: {len(df)}")
print(f"Datos limpios: {len(df_clean)}")
print(f"Outliers removidos: {(df['outlier'] == -1).sum()}")
```

**5. Valor:**
```
Conversión datos → insights → acciones:

Datos crudos → Procesamiento → Insights → Acciones → Valor

Ejemplo cadena de valor:
1. Datos: Consumo horario último año (8,760 datos/medidor)
2. Procesamiento: Clustering k-means → identificar patrones
3. Insight: "Consumo base fin de semana 35% del pico"
4. Acción: Apagar equipos no críticos sábado-domingo
5. Valor: Ahorro €15,000/año

ROI análisis Big Data:
Inversión plataforma: €25,000
Valor insights implementados: €80,000/año
ROI: 320% anual
```

### Técnicas Analíticas Big Data

#### 1. Análisis Descriptivo

**Objetivo:** ¿Qué pasó?

**Técnicas:**
```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar datos
df = pd.read_csv('energia_2023.csv', parse_dates=['timestamp'])

# Estadísticas básicas
print(df['kW'].describe())
#        count    8760.00
#        mean      285.3
#        std        78.2
#        min       125.0
#        25%       220.5
#        50%       275.0
#        75%       340.2
#        max       495.0

# Análisis por hora del día
df['hora'] = df['timestamp'].dt.hour
consumo_horario = df.groupby('hora')['kW'].mean()

plt.figure(figsize=(12,5))
consumo_horario.plot(kind='bar')
plt.xlabel('Hora del Día')
plt.ylabel('Consumo Promedio (kW)')
plt.title('Perfil de Carga Diario Promedio')
plt.show()

# Análisis por día de semana
df['dia_semana'] = df['timestamp'].dt.dayofweek
consumo_semanal = df.groupby('dia_semana')['kWh'].sum()
print("Consumo por día (0=Lunes, 6=Domingo):")
print(consumo_semanal)

# Insight: Domingo consume 40% menos → Oportunidad apagar equipos
```

#### 2. Análisis Diagnóstico

**Objetivo:** ¿Por qué pasó?

**Análisis de Correlación:**
```python
import numpy as np
from scipy.stats import pearsonr

# Cargar datos con variables contextuales
df = pd.read_csv('energia_contexto.csv', parse_dates=['timestamp'])

# Matriz de correlación
variables = ['kW', 'Produccion_ton', 'Temp_exterior', 'HDD', 'CDD']
matriz_corr = df[variables].corr()

# Visualización
sns.heatmap(matriz_corr, annot=True, cmap='coolwarm', center=0)
plt.title('Matriz de Correlación Consumo Energético')
plt.show()

# Análisis individual
corr_produccion, p_value = pearsonr(df['kW'], df['Produccion_ton'])
print(f"Correlación kW vs. Producción: {corr_produccion:.3f} (p={p_value:.4f})")
# Salida: Correlación kW vs. Producción: 0.823 (p=0.0000)
# → Fuerte correlación positiva (esperado)

corr_temp, p_value = pearsonr(df['kW'], df['Temp_exterior'])
print(f"Correlación kW vs. Temperatura: {corr_temp:.3f} (p={p_value:.4f})")
# Salida: Correlación kW vs. Temperatura: -0.456 (p=0.0012)
# → Correlación negativa moderada (↑temp → ↓calefacción)

# Insight: Temperatura explica parte de variabilidad
# → Necesario normalizar EnPIs por temperatura
```

**Análisis de Causa Raíz (Descomposición):**
```python
from statsmodels.tsa.seasonal import seasonal_decompose

# Serie temporal consumo
serie = df.set_index('timestamp')['kW']

# Descomposición
decomposition = seasonal_decompose(serie, model='additive', period=24*7)

# Componentes
tendencia = decomposition.trend
estacionalidad = decomposition.seasonal
residuo = decomposition.resid

# Visualización
fig, axes = plt.subplots(4, 1, figsize=(12, 10))
serie.plot(ax=axes[0], title='Serie Original')
tendencia.plot(ax=axes[1], title='Tendencia')
estacionalidad.plot(ax=axes[2], title='Estacionalidad Semanal')
residuo.plot(ax=axes[3], title='Residuo')
plt.tight_layout()
plt.show()

# Insight:
# - Tendencia: ↑5% consumo últimos 6 meses (sin aumento producción)
#   → Investigar degradación eficiencia equipos
# - Estacionalidad: Pico lunes 8am, valle domingo
#   → Validar política arranque/paro fin de semana
```

#### 3. Análisis Predictivo

**Objetivo:** ¿Qué pasará?

**Predicción con Machine Learning:**
```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

# Preparar datos
X = df[['Produccion_ton', 'HDD', 'CDD', 'dia_semana', 'hora']]
y = df['kW']

# Dividir train/test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Entrenar modelo
modelo = RandomForestRegressor(n_estimators=100, random_state=42)
modelo.fit(X_train, y_train)

# Predicciones
y_pred = modelo.predict(X_test)

# Evaluación
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MAE: {mae:.2f} kW")
print(f"R²: {r2:.3f}")
# MAE: 12.5 kW (±4.4% del promedio)
# R²: 0.912 (modelo explica 91.2% variabilidad)

# Importancia de variables
importancias = pd.DataFrame({
    'variable': X.columns,
    'importancia': modelo.feature_importances_
}).sort_values('importancia', ascending=False)

print(importancias)
#       variable  importancia
# 0  Produccion_ton    0.58
# 1            hora    0.18
# 2             HDD    0.12
# 3             CDD    0.08
# 4      dia_semana    0.04

# Insight: Producción explica 58% de variabilidad consumo
# → EnPI 'kWh/tonelada' muy apropiado
```

**Predicción Próximas 24 Horas:**
```python
# Datos futuro (de forecast producción + clima)
futuro = pd.DataFrame({
    'Produccion_ton': [850]*24,  # Forecast producción
    'HDD': [12]*24,  # Forecast HDD
    'CDD': [0]*24,
    'dia_semana': [1]*24,  # Martes
    'hora': range(24)
})

# Predicción
consumo_predicho = modelo.predict(futuro)

# Visualización
plt.figure(figsize=(12,5))
plt.plot(range(24), consumo_predicho, marker='o')
plt.xlabel('Hora del Día')
plt.ylabel('Consumo Predicho (kW)')
plt.title('Predicción Consumo Energético - Próximas 24h')
plt.grid(True, alpha=0.3)
plt.show()

# Aplicación: Peak shaving proactivo
pico_predicho_hora = consumo_predicho.argmax()
pico_predicho_valor = consumo_predicho.max()

print(f"Pico predicho: {pico_predicho_valor:.0f} kW a las {pico_predicho_hora}:00h")

if pico_predicho_valor > 450:  # Umbral potencia contratada
    print("⚠ ALERTA: Pico excederá potencia contratada")
    print("ACCIÓN: Programar cargas flexibles fuera de hora pico")
    # Integración con BMS para gestión automática demanda
```

#### 4. Análisis Prescriptivo

**Objetivo:** ¿Qué debo hacer?

**Optimización con Algoritmos Genéticos:**
```python
from deap import base, creator, tools, algorithms
import numpy as np

# Problema: Secuenciar arranque de 5 compresores aire comprimido
# Objetivo: Minimizar pico de demanda eléctrica

# Potencias nominales compresores (kW)
potencias = np.array([75, 75, 55, 55, 37])

# Demanda base otros equipos por hora (kW)
demanda_base = np.array([180, 185, 190, 200, 210, 220, 230, 240,
                         245, 250, 250, 245, 240, 235, 230, 220,
                         215, 210, 205, 200, 195, 190, 185, 180])

# Función objetivo: Minimizar pico de demanda
def evaluar_secuencia(individual):
    demanda_total = demanda_base.copy()
    for i, comp in enumerate(individual):
        hora_arranque = comp
        # Compresor opera desde hora_arranque hasta fin del día
        demanda_total[hora_arranque:] += potencias[i]

    pico = demanda_total.max()
    return (pico,)  # DEAP requiere tupla

# Configuración algoritmo genético
creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

toolbox = base.Toolbox()
toolbox.register("attr_hora", np.random.randint, 6, 18)  # Arranque entre 6-18h
toolbox.register("individual", tools.initRepeat, creator.Individual,
                 toolbox.attr_hora, n=5)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)

toolbox.register("evaluate", evaluar_secuencia)
toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutUniformInt, low=6, up=18, indpb=0.2)
toolbox.register("select", tools.selTournament, tournsize=3)

# Ejecutar optimización
poblacion = toolbox.population(n=100)
resultado = algorithms.eaSimple(poblacion, toolbox,
                                 cxpb=0.7, mutpb=0.2, ngen=50,
                                 verbose=False)

# Mejor solución
mejor = tools.selBest(poblacion, k=1)[0]
horas_optimas = mejor

print("Secuencia Óptima de Arranque:")
for i, hora in enumerate(horas_optimas):
    print(f"Compresor {i+1} ({potencias[i]} kW): {hora}:00h")

# Comparar con arranque simultáneo
demanda_simultanea = demanda_base.copy()
demanda_simultanea[8:] += potencias.sum()  # Todos arrancan 8am
pico_simultaneo = demanda_simultanea.max()

demanda_optimizada = demanda_base.copy()
for i, hora in enumerate(horas_optimas):
    demanda_optimizada[hora:] += potencias[i]
pico_optimizado = demanda_optimizada.max()

print(f"\nPico demanda (arranque simultáneo 8am): {pico_simultaneo:.0f} kW")
print(f"Pico demanda (secuencia optimizada): {pico_optimizado:.0f} kW")
print(f"Reducción: {pico_simultaneo - pico_optimizado:.0f} kW ({(pico_simultaneo-pico_optimizado)/pico_simultaneo*100:.1f}%)")

# Salida típica:
# Compresor 1 (75 kW): 10:00h
# Compresor 2 (75 kW): 15:00h
# Compresor 3 (55 kW): 8:00h
# Compresor 4 (55 kW): 12:00h
# Compresor 5 (37 kW): 7:00h
#
# Pico demanda (arranque simultáneo 8am): 547 kW
# Pico demanda (secuencia optimizada): 485 kW
# Reducción: 62 kW (11.3%)
#
# Ahorro potencia contratada: 62 kW × €40/kW·año = €2,480/año
```

## Inteligencia Artificial en Gestión Energética

### Aplicaciones de Machine Learning

#### 1. Clustering (Agrupamiento)

**Segmentación de Patrones de Consumo:**

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

# Cargar datos consumo por hora del día (365 días × 24 horas)
df = pd.read_csv('consumo_horario_365dias.csv')
# Forma: matriz 365 × 24 (cada fila = perfil diario)

# Normalizar
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

# K-means clustering
kmeans = KMeans(n_clusters=4, random_state=42)
clusters = kmeans.fit_predict(X_scaled)

# Añadir cluster a datos originales
df['cluster'] = clusters

# Analizar clusters
for i in range(4):
    dias_cluster = df[df['cluster'] == i]
    print(f"\nCluster {i}: {len(dias_cluster)} días")
    print(f"  Consumo promedio: {dias_cluster.iloc[:, :24].mean().mean():.1f} kW")
    print(f"  Consumo pico: {dias_cluster.iloc[:, :24].max().max():.1f} kW")
    print(f"  Horas con mayor consumo: {dias_cluster.iloc[:, :24].mean().idxmax()}")

# Salida típica:
# Cluster 0: 104 días (Días laborables alta producción)
#   Consumo promedio: 320.5 kW
#   Consumo pico: 485.2 kW
#   Horas con mayor consumo: 14 (2pm)
#
# Cluster 1: 52 días (Fines de semana)
#   Consumo promedio: 185.3 kW
#   Consumo pico: 225.8 kW
#   Horas con mayor consumo: 11 (11am)
#
# Cluster 2: 156 días (Días laborables producción normal)
#   Consumo promedio: 275.8 kW
#   Consumo pico: 410.5 kW
#   Horas con mayor consumo: 10 (10am)
#
# Cluster 3: 53 días (Días con paros/mantenimiento)
#   Consumo promedio: 140.2 kW
#   Consumo pico: 180.5 kW
#   Horas con mayor consumo: 9 (9am)

# Insight: 4 tipos de días bien diferenciados
# → Crear EnPIs específicos por tipo de día
# → Detectar anomalías (día laborable con perfil fin de semana)
```

#### 2. Detección de Anomalías

**Identificación Automática de Comportamientos Anómalos:**

```python
from sklearn.ensemble import IsolationForest
import pandas as pd

# Cargar datos
df = pd.read_csv('consumo_con_contexto.csv', parse_dates=['timestamp'])

# Features para detección anomalías
features = ['kW', 'Produccion_ton', 'Temp_exterior', 'hora', 'dia_semana']
X = df[features]

# Modelo Isolation Forest
iso_forest = IsolationForest(contamination=0.02, random_state=42)
anomalias = iso_forest.fit_predict(X)

# Añadir etiquetas (-1 = anomalía, 1 = normal)
df['anomalia'] = anomalias

# Analizar anomalías
df_anomalias = df[df['anomalia'] == -1]
print(f"Anomalías detectadas: {len(df_anomalias)} de {len(df)} ({len(df_anomalias)/len(df)*100:.1f}%)")

# Ejemplos de anomalías
print("\nEjemplos de anomalías:")
print(df_anomalias[['timestamp', 'kW', 'Produccion_ton']].head(10))

# timestamp              kW  Produccion_ton
# 2024-03-15 03:25:00   385      0  ← Alto consumo sin producción (fuga?)
# 2024-05-22 14:15:00    95    850  ← Bajo consumo con alta producción (medidor?)
# 2024-08-10 22:00:00   420     25  ← Consumo anómalo noche
# ...

# Sistema de alertas
for idx, row in df_anomalias.iterrows():
    if row['kW'] > 350 and row['Produccion_ton'] < 100:
        print(f"⚠ ALERTA: Alto consumo ({row['kW']:.0f} kW) sin producción en {row['timestamp']}")
        print(f"  ACCIÓN: Verificar equipos funcionando innecesariamente")
    elif row['kW'] < 150 and row['Produccion_ton'] > 700:
        print(f"⚠ ALERTA: Consumo anormalmente bajo ({row['kW']:.0f} kW) con producción alta en {row['timestamp']}")
        print(f"  ACCIÓN: Verificar medidores, posible fallo lectura")
```

#### 3. Mantenimiento Predictivo

**Predicción de Fallos en Equipos Energéticos:**

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import pandas as pd

# Datos históricos: Fallos compresores aire comprimido
# Features: vibracion, temperatura, presion, consumo_electrico, horas_operacion
df_mantenimiento = pd.read_csv('compresores_historico.csv')

# Variable objetivo: fallo_proximo_30dias (0=No, 1=Sí)
X = df_mantenimiento[['vibracion_mm_s', 'temperatura_C', 'presion_bar',
                       'consumo_kW', 'horas_operacion']]
y = df_mantenimiento['fallo_proximo_30dias']

# Dividir datos
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# Modelo
modelo_fallo = RandomForestClassifier(n_estimators=200, random_state=42)
modelo_fallo.fit(X_train, y_train)

# Evaluación
y_pred = modelo_fallo.predict(X_test)
print(classification_report(y_test, y_pred))

#               precision    recall  f1-score   support
#
#            0       0.96      0.98      0.97       285
#            1       0.89      0.82      0.85        65
#
#     accuracy                           0.94       350

# Predicción en tiempo real
datos_actuales = pd.DataFrame({
    'vibracion_mm_s': [8.2, 3.5, 12.5],  # 3 compresores
    'temperatura_C': [85, 72, 95],
    'presion_bar': [7.5, 7.8, 7.2],
    'consumo_kW': [78, 76, 82],
    'horas_operacion': [28500, 15200, 42000]
})

probabilidad_fallo = modelo_fallo.predict_proba(datos_actuales)[:, 1]

for i, prob in enumerate(probabilidad_fallo):
    print(f"\nCompresor {i+1}:")
    print(f"  Probabilidad fallo 30 días: {prob*100:.1f}%")
    if prob > 0.7:
        print(f"  ⚠ ACCIÓN: Programar mantenimiento preventivo urgente")
    elif prob > 0.4:
        print(f"  ⚠ ACCIÓN: Incrementar frecuencia monitoreo")

# Salida:
# Compresor 1:
#   Probabilidad fallo 30 días: 78.5%
#   ⚠ ACCIÓN: Programar mantenimiento preventivo urgente
#
# Compresor 2:
#   Probabilidad fallo 30 días: 15.2%
#
# Compresor 3:
#   Probabilidad fallo 30 días: 92.3%
#   ⚠ ACCIÓN: Programar mantenimiento preventivo urgente

# Beneficio:
# - Evitar paros no planificados (costo promedio: €15,000/paro)
# - Extender vida útil equipos (+20%)
# - Reducir consumo energético por degradación (+5-8%)
```

### Deep Learning para Optimización Energética

**Red Neuronal LSTM para Predicción Avanzada:**

```python
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import MinMaxScaler
import numpy as np

# Preparar secuencias temporales
def crear_secuencias(datos, n_pasos=24):
    X, y = [], []
    for i in range(len(datos) - n_pasos):
        X.append(datos[i:i+n_pasos])
        y.append(datos[i+n_pasos])
    return np.array(X), np.array(y)

# Cargar y normalizar datos
df = pd.read_csv('consumo_horario.csv')
datos = df['kW'].values.reshape(-1, 1)

scaler = MinMaxScaler()
datos_norm = scaler.fit_transform(datos)

# Crear secuencias (predecir próxima hora basado en últimas 24h)
X, y = crear_secuencias(datos_norm, n_pasos=24)

# Dividir train/test
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Modelo LSTM
modelo_lstm = keras.Sequential([
    keras.layers.LSTM(64, activation='relu', input_shape=(24, 1), return_sequences=True),
    keras.layers.Dropout(0.2),
    keras.layers.LSTM(32, activation='relu'),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dense(1)
])

modelo_lstm.compile(optimizer='adam', loss='mse')

# Entrenar
history = modelo_lstm.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.2,
    verbose=0
)

# Predicción
y_pred_norm = modelo_lstm.predict(X_test)
y_pred = scaler.inverse_transform(y_pred_norm)
y_test_real = scaler.inverse_transform(y_test)

# Evaluación
mae = mean_absolute_error(y_test_real, y_pred)
print(f"MAE: {mae:.2f} kW")

# Predicción próximas 24 horas
ultima_secuencia = datos_norm[-24:].reshape(1, 24, 1)
predicciones_24h = []

for _ in range(24):
    pred = modelo_lstm.predict(ultima_secuencia, verbose=0)
    predicciones_24h.append(pred[0, 0])
    # Actualizar secuencia
    ultima_secuencia = np.append(ultima_secuencia[:, 1:, :],
                                   pred.reshape(1, 1, 1), axis=1)

# Desnormalizar
predicciones_24h = scaler.inverse_transform(
    np.array(predicciones_24h).reshape(-1, 1)
)

print("\nPredicciones próximas 24h:")
for i, pred in enumerate(predicciones_24h):
    print(f"Hora {i}: {pred[0]:.1f} kW")
```

## Plataformas EMIS (Energy Management Information Systems)

### Características de EMIS Modernos

**Funcionalidades Core:**

```
1. ADQUISICIÓN DE DATOS
   - Conectividad multi-protocolo (Modbus, BACnet, OPC UA, LoRaWAN)
   - Integración APIs (clima, precios energía, ERP)
   - Validación y limpieza automática
   - Almacenamiento series temporales optimizado

2. VISUALIZACIÓN
   - Dashboards interactivos en tiempo real
   - Gráficos de tendencias, comparativas, benchmarking
   - Mapas de calor, diagramas Sankey
   - Vistas personalizables por rol (operador, manager, dirección)

3. ANÁLISIS
   - Cálculo automático EnPIs según ISO 50001
   - Modelos de regresión para normalización
   - Detección de anomalías con ML
   - Descomposición de consumo por uso final

4. ALERTAS Y NOTIFICACIONES
   - Alertas configurables (umbrales, tasas de cambio)
   - Notificaciones multi-canal (email, SMS, push)
   - Escalado automático según criticidad

5. REPORTING
   - Informes ISO 50001 automáticos
   - Reporting regulatorio (Directiva 2012/27/UE)
   - Informes personalizados (PDF, Excel, Word)
   - Programación envío automático

6. GESTIÓN DE PROYECTOS
   - Seguimiento medidas de mejora
   - Cálculo M&V (Medición y Verificación)
   - ROI automático

7. INTEGRACIONES
   - BMS/SCADA (lectura y escritura)
   - ERP (datos producción, costos)
   - CMMS (órdenes de trabajo)
   - APIs abiertas para desarrollos custom
```

### Soluciones EMIS Comerciales

**Comparativa:**

| Plataforma | Enfoque | Precio | Fortalezas | Debilidades |
|------------|---------|--------|------------|-------------|
| **Schneider EcoStruxure** | Edificios + Industria | €€€€ | Ecosistema completo, hardware + software | Alto costo, lock-in |
| **Siemens Navigator** | Industrial | €€€€ | Integración profunda con SCADA | Complejo, requiere expertise |
| **Honeywell Forge** | Edificios | €€€ | IA avanzada, UX excelente | Menos flexible para industria |
| **EnergyCAP** | Multi-sector | €€ | Enfoque ISO 50001, reporting robusto | UI anticuada |
| **Wattics** | SMEs | €€ | Fácil implementación, bajo costo | Funcionalidades limitadas |
| **Open Source (Grafana + InfluxDB)** | DIY | € | Máxima flexibilidad, sin vendor lock-in | Requiere desarrollo interno |

**Costos Típicos:**

```
EMIS Comercial (100-500 sensores):
- Setup inicial: €15,000 - €40,000
- Licencia anual: €8,000 - €25,000/año
- Soporte: Incluido

Open Source (auto-gestionado):
- Desarrollo inicial: €20,000 - €60,000 (consultoría)
- Servidor cloud: €200 - €800/mes
- Mantenimiento: 1 persona 20% tiempo = €15,000/año

Break-even: 2-3 años (open source más rentable a largo plazo si hay capacidad interna)
```

## ROI de Tecnologías Digitales

### Caso de Estudio Completo

**Empresa:** Planta manufactura 150 empleados, consumo 6.5 GWh/año

**Inversión en Digitalización:**

```
HARDWARE:
- 35 medidores inteligentes: €12,000
- 40 sensores IoT (temp, HR, CO₂): €4,500
- Gateway e infraestructura: €3,500
- Instalación: €8,000
Subtotal hardware: €28,000

SOFTWARE:
- Plataforma EMIS (licencia 3 años): €24,000
- Consultoría implementación: €18,000
- Formación equipo (40h): €3,000
Subtotal software: €45,000

TOTAL INVERSIÓN: €73,000
```

**Ahorros Conseguidos (Año 1-3):**

```
AÑO 1: QUICK WINS
1. Fugas aire comprimido detectadas: €22,000
2. Optimización horarios HVAC: €16,000
3. Detección iluminación 24/7: €6,000
4. Peak shaving (↓potencia contratada): €3,500
TOTAL AÑO 1: €47,500

AÑO 2: OPTIMIZACIONES ML
1. Mantenimiento predictivo (evitar paros): €18,000
2. Secuenciación óptima arranques: €8,500
3. Ajuste fino set-points con IA: €12,000
4. Gestión demanda dinámica: €7,200
TOTAL AÑO 2: €45,700

AÑO 3: MEJORA CONTINUA
1. Expansión medición a procesos secundarios: €9,000
2. Optimización continua algoritmos ML: €15,000
3. Nuevas oportunidades identificadas: €11,500
TOTAL AÑO 3: €35,500

AHORROS ACUMULADOS 3 AÑOS: €128,700
```

**Análisis Financiero:**

```
Inversión: €73,000
Ahorros 3 años: €128,700
VAN (10 años, 5%): €285,400
TIR: 61%
Payback: 1.54 años

Beneficios intangibles:
- Cumplimiento ISO 50001 simplificado
- Datos para reporting ESG
- Base para futura automatización
- Cultura data-driven implantada
```

## Conclusión

La digitalización de la gestión energética mediante IoT, Big Data e IA no es una moda tecnológica, sino una transformación fundamental que multiplica la efectividad de sistemas tradicionales ISO 50001. Los beneficios cuantificables incluyen:

**Mejora de Desempeño Energético:**
- 10-20% ahorro adicional vs. gestión manual
- Identificación del 95% de oportunidades (vs. 60% auditorías tradicionales)
- Tiempo de detección anomalías: minutos vs. semanas

**Reducción de Costos Operativos:**
- ROI típico: 150-300% en 3 años
- Payback: 1.5-3 años
- Reducción 40% en tiempo de gestión administrativa

**Ventajas Estratégicas:**
- Habilitador de ISO 50001 de clase mundial
- Base para mantenimiento predictivo
- Preparación para redes inteligentes y respuesta a demanda
- Diferenciación competitiva (ESG, sostenibilidad)

Las organizaciones que adoptan tecnologías digitales energéticas reportan satisfacción 85% superior vs. métodos manuales y certificación ISO 50001 en 50% menos tiempo.

En el contexto de transformación digital generalizada y urgencia climática, integrar IoT, Big Data e IA en la gestión energética no es opcional sino esencial para organizaciones que aspiran a liderazgo en sostenibilidad.

---

## ¿Listo para Digitalizar tu Gestión Energética?

En **ITER Energy Solutions**, diseñamos e implementamos soluciones digitales end-to-end:

✅ **Arquitectura IoT** - Diseño de red de sensores óptima
✅ **Plataforma EMIS** - Selección e implementación de software adecuado
✅ **Modelos ML** - Algoritmos predictivos personalizados
✅ **Integración Sistemas** - BMS, SCADA, ERP
✅ **Formación Equipos** - Capacitación en análisis de datos energéticos

**Solicita una demo de nuestra plataforma digital de gestión energética.**

📧 [Contacta con nuestros expertos en digitalización →](/contacto)

---

**Referencias:**
- IEA: Digitalisation & Energy (2017)
- ISO 50001:2018 Energy Management Systems
- ISO 50006:2014 Energy Performance Indicators
- IEEE 1888: Ubiquitous Green Community Control Network
- ASHRAE Guideline 14-2014 M&V
- McKinsey: The Internet of Things in Energy (2020)
