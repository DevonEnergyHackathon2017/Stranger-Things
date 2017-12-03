WITH Snapshot AS (
SELECT
    MIN(CAST([Timestamp] as datetime)) WINDOW_START,
    MAX(CAST([Timestamp] as datetime)) WINDOW_END,
    AVG(SlurryRate) as AVG_SR,
    AVG(TreatingPressure) as AVG_TP,
    AVG(FrictionReducer / CleanRate * 1000/42) as AVG_FR,
    AVG(BlenderPropConc) as AVG_SC,
    MIN(BlenderPropTotal) as MIN_BPT,
    MAX(BlenderPropTotal) as MAX_BPT,
    MIN(CleanTotal) as MIN_CT,
    MAX(CleanTotal) as MAX_CT,
    UDF.GetCumPropLookupValue(MAX(BlenderPropTotal)) as CP_LOOKUP,
    4000 as TP_LOWER,
    7000 as TP_UPPER,
    60 as SR_LOWER,
    80 as SR_UPPER
FROM 
    [PiDataHub]
    TIMESTAMP BY [DttmOffset]
GROUP BY TumblingWindow(second, 15)
)

,Averages AS (
SELECT
    AVG(pdh.SlurryRate) as AVG_SR,
    MAX(pdh.BlenderPropTotal) as MAX_BPT,
    MIN(CAST(pdh.[Timestamp] as datetime)) AS WINDOW_START,
    MAX(CAST(pdh.[Timestamp] as datetime)) AS WINDOW_END,
    AVG(pdh.TreatingPressure) as AVG_TP
FROM 
    [PiDataHub] pdh
    TIMESTAMP BY [DttmOffset]
WHERE pdh.BlenderPropTotal <= LAST(pdh.BlenderPropTotal) OVER (PARTITION BY pdh.WellName LIMIT DURATION(minute, 10)) 
GROUP BY TumblingWindow(minute, 10)
)

,Avg2 AS (
SELECT 
    a.*,
    pdh.TreatingPressure,
    pdh.SlurryRate,
    60*286/pdh.SlurryRate + 58000/(pdh.SlurryRate*2*42/60) + ((113750 - a.MAX_BPT)/(pdh.SlurryRate*1.5*42/60)) + ((164500-113750)/(pdh.SlurryRate*1.75*42/60)) AS TIME_LEFT_SEC
FROM Averages a JOIN [PiDataHub] pdh
TIMESTAMP BY [DttmOffset]
 on DATEDIFF(second, a, pdh) BETWEEN 0 AND 1
)

,Avg3 AS (
SELECT a2.*,
    (((39*60+43) * 5100 ) + (DATEDIFF( second , a2.WINDOW_START, a2.WINDOW_END ) * a2.AVG_TP) + (a2.TreatingPressure * a2.TIME_LEFT_SEC)) / (39 * 60 + 43 + DATEDIFF( second , a2.WINDOW_START, a2.WINDOW_END ) + a2.TIME_LEFT_SEC) AS AVG_PROJ_TP,
    (((39*60+43) * 49 ) + (DATEDIFF( second , a2.WINDOW_START, a2.WINDOW_END ) * a2.AVG_SR) + (a2.SlurryRate * a2.TIME_LEFT_SEC)) / (39 * 60 + 43 + DATEDIFF( second , a2.WINDOW_START, a2.WINDOW_END ) + a2.TIME_LEFT_SEC) AS AVG_PROJ_SR
FROM Avg2 a2
)

SELECT s.*,
60 AS SR_DESIGN,
6000 AS TR_DESIGN,
CASE
    WHEN s.CP_LOOKUP = 113750 THEN 1.5
    WHEN s.CP_LOOKUP = 164500 THEN 1.75
    ELSE -1
END PC_DESIGN,
0.75 AS FR_DESIGN,
0.0645 - 15/3600 * 15460/AVG_SC * AVG_SR * 0.25 * 42 AS SCORE_1,
125 - 0.0645 - 15/3600 * 15460/AVG_SC * AVG_SR * 0.25 * 42 * 100 AS SCORE_2,
'spider' AS TYP
INTO
    [appdatahub]
FROM Snapshot s


SELECT 
    a3.*,
    CASE WHEN a3.AVG_PROJ_TP > 7000 THEN 7000
    ELSE 4000
    END AS LOW_TP,
    CASE WHEN a3.AVG_PROJ_TP > 7000 THEN 9500
    ELSE 7000
    END AS HIGH_TP,
    CASE WHEN a3.AVG_PROJ_SR > 60 THEN 60
    ELSE 40
    END AS LOW_SR,
    CASE WHEN a3.AVG_PROJ_SR > 60 THEN 80
    ELSE 60
    END AS HIGH_SR,
    'values' AS TYP
INTO
    [appdatahub2]
FROM Avg3 a3




