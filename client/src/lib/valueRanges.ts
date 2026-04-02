export type RiskStatus = 'normal' | 'medium' | 'high' | 'critical';

export interface FieldAnalysis {
  label: string;
  value: string;
  status: RiskStatus;
  range: string;
}

function classify(
  value: number,
  thresholds: { medium: number; high: number; critical: number },
  inverted = false
): RiskStatus {
  if (!inverted) {
    if (value >= thresholds.critical) return 'critical';
    if (value >= thresholds.high) return 'high';
    if (value >= thresholds.medium) return 'medium';
    return 'normal';
  } else {
    if (value <= thresholds.critical) return 'critical';
    if (value <= thresholds.high) return 'high';
    if (value <= thresholds.medium) return 'medium';
    return 'normal';
  }
}

export function analyzeDiabetes(input: {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}): FieldAnalysis[] {
  return [
    {
      label: 'Glucose',
      value: `${input.glucose} mg/dL`,
      status: classify(input.glucose, { medium: 100, high: 126, critical: 200 }),
      range: 'Normal <100 | Pre-diabetic 100–125 | Diabetic ≥126 | Severe ≥200',
    },
    {
      label: 'BMI',
      value: `${input.bmi.toFixed(1)}`,
      status: classify(input.bmi, { medium: 25, high: 30, critical: 40 }),
      range: 'Normal <25 | Overweight 25–30 | Obese ≥30 | Severely Obese ≥40',
    },
    {
      label: 'Blood Pressure',
      value: `${input.bloodPressure} mmHg`,
      status: classify(input.bloodPressure, { medium: 80, high: 90, critical: 120 }),
      range: 'Normal <80 | Elevated 80–89 | High ≥90 | Critical ≥120',
    },
    {
      label: 'Age',
      value: `${input.age} yrs`,
      status: classify(input.age, { medium: 45, high: 56, critical: 65 }),
      range: 'Low risk <45 | Medium 45–55 | High 56–65 | Critical >65',
    },
    {
      label: 'Insulin',
      value: `${input.insulin} μU/mL`,
      status: input.insulin > 250 ? 'critical' : input.insulin > 166 ? 'high' : input.insulin < 16 && input.insulin !== 0 ? 'medium' : 'normal',
      range: 'Normal 16–166 | High >166 | Very High >250',
    },
    {
      label: 'Pregnancies',
      value: `${input.pregnancies}`,
      status: classify(input.pregnancies, { medium: 4, high: 7, critical: 10 }),
      range: 'Low 0–3 | Medium 4–6 | High 7–9 | Critical ≥10',
    },
    {
      label: 'Pedigree',
      value: `${input.diabetesPedigreeFunction.toFixed(3)}`,
      status: classify(input.diabetesPedigreeFunction, { medium: 0.5, high: 1.0, critical: 1.5 }),
      range: 'Low <0.5 | Medium 0.5–1.0 | High >1.0 | Critical >1.5',
    },
  ];
}

export function analyzeHeart(input: {
  age: number;
  sex: number;
  chestPainType: number;
  restingBP: number;
  cholesterol: number;
  fastingBS: number;
  restingECG: number;
  maxHR: number;
  exerciseAngina: number;
  oldpeak: number;
  stSlope: number;
}): FieldAnalysis[] {
  const chestPainLabels = ['Typical Angina', 'Atypical Angina', 'Non-Anginal Pain', 'Asymptomatic'];
  const chestPainStatus: RiskStatus[] = ['medium', 'medium', 'high', 'critical'];

  return [
    {
      label: 'Age',
      value: `${input.age} yrs`,
      status: classify(input.age, { medium: 45, high: 55, critical: 65 }),
      range: 'Low risk <45 | Medium 45–55 | High 55–65 | Critical >65',
    },
    {
      label: 'Cholesterol',
      value: `${input.cholesterol} mg/dL`,
      status: classify(input.cholesterol, { medium: 200, high: 240, critical: 280 }),
      range: 'Normal <200 | Borderline 200–239 | High ≥240 | Critical ≥280',
    },
    {
      label: 'Resting BP',
      value: `${input.restingBP} mmHg`,
      status: classify(input.restingBP, { medium: 120, high: 140, critical: 160 }),
      range: 'Normal <120 | Elevated 120–139 | High ≥140 | Critical ≥160',
    },
    {
      label: 'Max Heart Rate',
      value: `${input.maxHR} bpm`,
      status: classify(input.maxHR, { medium: 130, high: 110, critical: 90 }, true),
      range: 'Good >150 | Medium 110–130 | Low 90–110 | Critical <90',
    },
    {
      label: 'Chest Pain',
      value: chestPainLabels[input.chestPainType] ?? `Type ${input.chestPainType}`,
      status: chestPainStatus[input.chestPainType] ?? 'normal',
      range: 'TA (medium) | ATA (medium) | NAP (high) | ASY (critical)',
    },
    {
      label: 'Oldpeak',
      value: `${input.oldpeak.toFixed(1)}`,
      status: classify(input.oldpeak, { medium: 1, high: 2, critical: 4 }),
      range: 'Normal 0–1 | Elevated 1–2 | High 2–4 | Critical >4',
    },
    {
      label: 'Exercise Angina',
      value: input.exerciseAngina === 1 ? 'Yes' : 'No',
      status: input.exerciseAngina === 1 ? 'high' : 'normal',
      range: 'No = Low risk | Yes = High risk',
    },
    {
      label: 'Fasting BS >120',
      value: input.fastingBS === 1 ? 'Yes' : 'No',
      status: input.fastingBS === 1 ? 'medium' : 'normal',
      range: 'No = Normal | Yes = Elevated risk',
    },
  ];
}

export function analyzeParkinsons(input: {
  mdvpJitterPct: number;
  mdvpShimmer: number;
  nhr: number;
  hnr: number;
  ppe: number;
  rpde: number;
  dfa: number;
  spread1: number;
  spread2: number;
  mdvpFo: number;
  mdvpFhi: number;
  mdvpFlo: number;
}): FieldAnalysis[] {
  return [
    {
      label: 'Jitter (%)',
      value: `${(input.mdvpJitterPct * 100).toFixed(4)}%`,
      status: classify(input.mdvpJitterPct, { medium: 0.004, high: 0.007, critical: 0.012 }),
      range: 'Normal <0.004 | Medium 0.004–0.007 | High 0.007–0.012 | Critical >0.012',
    },
    {
      label: 'Shimmer',
      value: `${input.mdvpShimmer.toFixed(5)}`,
      status: classify(input.mdvpShimmer, { medium: 0.025, high: 0.04, critical: 0.07 }),
      range: 'Normal <0.025 | Medium 0.025–0.04 | High 0.04–0.07 | Critical >0.07',
    },
    {
      label: 'PPE',
      value: `${input.ppe.toFixed(4)}`,
      status: classify(input.ppe, { medium: 0.15, high: 0.25, critical: 0.4 }),
      range: 'Normal <0.15 | Medium 0.15–0.25 | High 0.25–0.4 | Critical >0.4',
    },
    {
      label: 'NHR',
      value: `${input.nhr.toFixed(5)}`,
      status: classify(input.nhr, { medium: 0.02, high: 0.04, critical: 0.08 }),
      range: 'Normal <0.02 | Medium 0.02–0.04 | High 0.04–0.08 | Critical >0.08',
    },
    {
      label: 'HNR',
      value: `${input.hnr.toFixed(3)} dB`,
      status: classify(input.hnr, { medium: 22, high: 18, critical: 14 }, true),
      range: 'Good >22 | Medium 18–22 | Low 14–18 | Critical <14',
    },
    {
      label: 'RPDE',
      value: `${input.rpde.toFixed(4)}`,
      status: classify(input.rpde, { medium: 0.4, high: 0.6, critical: 0.8 }),
      range: 'Normal <0.4 | Medium 0.4–0.6 | High 0.6–0.8 | Critical >0.8',
    },
    {
      label: 'Spread1',
      value: `${input.spread1.toFixed(4)}`,
      status: classify(Math.abs(input.spread1), { medium: 4.5, high: 6, critical: 7.5 }),
      range: 'Normal |spread| <4.5 | Medium 4.5–6 | High 6–7.5 | Critical >7.5',
    },
    {
      label: 'DFA',
      value: `${input.dfa.toFixed(4)}`,
      status: classify(input.dfa, { medium: 0.7, high: 0.8, critical: 0.9 }),
      range: 'Normal <0.7 | Medium 0.7–0.8 | High 0.8–0.9 | Critical >0.9',
    },
  ];
}
