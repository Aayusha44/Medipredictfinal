import type { PredictionResponse } from "@shared/routes";

export function clientPredictDiabetes(input: {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}): PredictionResponse {
  let score = 0;
  if (input.glucose > 140) score += 3;
  else if (input.glucose > 100) score += 1;
  if (input.bmi > 30) score += 2;
  else if (input.bmi > 25) score += 1;
  if (input.age > 55) score += 2;
  else if (input.age > 45) score += 1;
  if (input.pregnancies > 6) score += 1;
  if (input.diabetesPedigreeFunction > 1.0) score += 1;
  if (input.insulin > 200) score += 1;

  const probability = Math.min(0.97, Math.max(0.03, (score / 9) * 0.88 + 0.06));
  const isPositive = probability > 0.5;

  return {
    prediction: isPositive ? "High Probability of Diabetes" : "Low Probability of Diabetes",
    confidence: (probability * 100).toFixed(1) + "%",
    riskLevel: probability > 0.7 ? "High" : probability > 0.4 ? "Medium" : "Low",
    details: isPositive
      ? "Analysis indicates elevated risk due to high glucose levels and clinical markers. Further clinical consultation is recommended."
      : "Clinical markers appear within normal ranges. Continue regular monitoring.",
  };
}

export function clientPredictHeart(input: {
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
}): PredictionResponse {
  let score = 0;
  if (input.age > 65) score += 2;
  else if (input.age > 55) score += 1;
  if (input.maxHR < 100) score += 2;
  else if (input.maxHR < 140) score += 1;
  if (input.chestPainType === 3) score += 3;
  else if (input.chestPainType === 2) score += 2;
  else if (input.chestPainType >= 1) score += 1;
  if (input.cholesterol > 280) score += 2;
  else if (input.cholesterol > 240) score += 1;
  if (input.restingBP > 160) score += 2;
  else if (input.restingBP > 140) score += 1;
  if (input.exerciseAngina === 1) score += 2;
  if (input.oldpeak > 2) score += 1;
  if (input.fastingBS === 1) score += 1;

  const probability = Math.min(0.96, Math.max(0.04, (score / 14) * 0.85 + 0.07));
  const isPositive = probability > 0.5;

  return {
    prediction: isPositive ? "Cardiovascular Risk Detected" : "Stable Cardiac Profile",
    confidence: (probability * 100).toFixed(1) + "%",
    riskLevel: probability > 0.7 ? "High" : probability > 0.4 ? "Medium" : "Low",
    details: isPositive
      ? "Detected patterns consistent with cardiovascular strain. Evaluation by a specialist is advised."
      : "Cardiac performance indicators are within healthy parameters.",
  };
}

export function clientPredictParkinsons(input: {
  mdvpFo: number;
  mdvpFhi: number;
  mdvpFlo: number;
  mdvpJitterPct: number;
  mdvpJitterAbs: number;
  mdvpRap: number;
  mdvpPpq: number;
  jitterDdp: number;
  mdvpShimmer: number;
  mdvpShimmerDb: number;
  shimmerApq3: number;
  shimmerApq5: number;
  mdvpApq: number;
  shimmerDda: number;
  nhr: number;
  hnr: number;
  rpde: number;
  dfa: number;
  spread1: number;
  spread2: number;
  d2: number;
  ppe: number;
}): PredictionResponse {
  let score = 0;
  if (input.mdvpJitterPct > 0.012) score += 3;
  else if (input.mdvpJitterPct > 0.007) score += 2;
  else if (input.mdvpJitterPct > 0.004) score += 1;

  if (input.mdvpShimmer > 0.07) score += 3;
  else if (input.mdvpShimmer > 0.04) score += 2;
  else if (input.mdvpShimmer > 0.025) score += 1;

  if (input.ppe > 0.4) score += 3;
  else if (input.ppe > 0.25) score += 2;
  else if (input.ppe > 0.15) score += 1;

  if (input.nhr > 0.08) score += 2;
  else if (input.nhr > 0.04) score += 1;

  if (input.hnr < 14) score += 2;
  else if (input.hnr < 18) score += 1;

  const probability = Math.min(0.96, Math.max(0.04, (score / 13) * 0.85 + 0.07));
  const isPositive = probability > 0.5;

  return {
    prediction: isPositive ? "Early Parkinson's Indicators Detected" : "Healthy Neurological Profile",
    confidence: (probability * 100).toFixed(1) + "%",
    riskLevel: probability > 0.7 ? "High" : probability > 0.4 ? "Medium" : "Low",
    details: isPositive
      ? "Vocal bio-markers show deviations consistent with early-stage neurological changes. Specialist follow-up recommended."
      : "Vocal stability and neurological markers are within standard deviations.",
  };
}
