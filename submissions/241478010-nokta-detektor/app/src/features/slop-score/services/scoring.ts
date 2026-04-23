import { AxisEvaluation, SlopAnalysisResult } from "../types";

const GENERIC_PHRASES = [
  "game changer",
  "revolutionary",
  "next-gen",
  "disruptive",
  "seamless",
  "leveraging ai",
  "ai-powered",
  "one-stop",
];

const TECH_TERMS = [
  "api",
  "model",
  "latency",
  "database",
  "pipeline",
  "frontend",
  "backend",
  "expo",
  "react native",
  "deployment",
  "version",
];

const MARKET_TERMS = [
  "target",
  "user",
  "customer",
  "market",
  "segment",
  "pricing",
  "revenue",
  "competitor",
  "growth",
  "retention",
];

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function countMatches(text: string, entries: string[]): number {
  const lowered = text.toLowerCase();
  return entries.reduce((count, entry) => {
    if (lowered.includes(entry)) {
      return count + 1;
    }

    return count;
  }, 0);
}

function hasNumericClaim(text: string): boolean {
  return /\d+%|\d+\s?(ay|month|hafta|week|gün|day|x)/i.test(text);
}

function sentenceCount(text: string): number {
  return text
    .split(/[.!?]/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function evaluateOriginality(text: string): AxisEvaluation {
  const genericHit = countMatches(text, GENERIC_PHRASES);
  const lengthBonus = text.length > 220 ? 18 : text.length > 140 ? 10 : 2;
  const numericBonus = hasNumericClaim(text) ? 12 : 0;
  const score = clamp(62 + lengthBonus + numericBonus - genericHit * 9);

  const reasons = [
    genericHit > 1
      ? "Pitch metninde klişe değer önerileri tekrar ediyor."
      : "Pitch metninde görece özgün ifade kullanımı var.",
    numericBonus > 0
      ? "Somut bir çıktı veya iddia belirtilmiş."
      : "Somut çıktı iddiası zayıf, daha ölçülebilir hedef eklenmeli.",
  ];

  const guidance = [
    "Fikri 1 benzersiz kullanıcı problemiyle bağla.",
    "Benzer çözümlerden farkını tek cümlede netleştir.",
  ];

  return {
    key: "originality",
    title: "Originality",
    score,
    reasons,
    guidance,
  };
}

function evaluateMarketFit(text: string): AxisEvaluation {
  const marketHits = countMatches(text, MARKET_TERMS);
  const numericBonus = hasNumericClaim(text) ? 16 : 0;
  const targetAudienceMention =
    /öğrenci|student|founder|developer|girişimci|kullanıcı/i.test(text) ? 10 : 0;
  const score = clamp(48 + marketHits * 6 + numericBonus + targetAudienceMention);

  const reasons = [
    marketHits >= 2
      ? "Pazar/segment diline dair anahtar ifadeler mevcut."
      : "Hedef pazar ifadesi sınırlı, kullanıcı segmenti daha net yazılmalı.",
    numericBonus > 0
      ? "Doğrulanabilir metrik iddiası içeriyor."
      : "Metrik iddiası eksik; başarı için ölçü tanımlanmalı.",
  ];

  const guidance = [
    "Hedef kullanıcıyı tek bir segmentte sınırla.",
    "Pazar iddiasını yüzde ya da zaman bazlı ölçümle yaz.",
  ];

  return {
    key: "marketFit",
    title: "Market Fit",
    score,
    reasons,
    guidance,
  };
}

function evaluateTechnicalClarity(text: string): AxisEvaluation {
  const techHits = countMatches(text, TECH_TERMS);
  const sentenceBonus = sentenceCount(text) >= 3 ? 10 : 0;
  const architectureMention =
    /how|nasıl|mimari|architecture|workflow|flow/i.test(text) ? 10 : 0;
  const score = clamp(42 + techHits * 7 + sentenceBonus + architectureMention);

  const reasons = [
    techHits >= 2
      ? "Teknik uygulanabilirliğe dair terimler mevcut."
      : "Teknik yaklaşım yüzeysel, çözüm akışı daha somut olmalı.",
    sentenceBonus > 0
      ? "Problem ve çözüm akışı cümle bazında ayrıştırılmış."
      : "Açıklama çok kısa; problem-çözüm-akış üçlüsü eklenmeli.",
  ];

  const guidance = [
    "MVP'de hangi teknolojileri neden seçtiğini belirt.",
    "En az bir teknik risk ve bir önlem yaz.",
  ];

  return {
    key: "technicalClarity",
    title: "Technical Clarity",
    score,
    reasons,
    guidance,
  };
}

function evaluateAiGeneratedRisk(text: string): AxisEvaluation {
  const genericHit = countMatches(text, GENERIC_PHRASES);
  const repeatedPattern = /(very|çok|highly|super)\s+\1/i.test(text) ? 1 : 0;
  const lowSpecificityPenalty = text.length < 120 ? 18 : 0;
  const score = clamp(22 + genericHit * 11 + repeatedPattern * 10 + lowSpecificityPenalty);

  const reasons = [
    genericHit > 1
      ? "Kalıp pazarlama dili yoğun olduğu için AI üretimi riski artıyor."
      : "Metin tonu görece doğal, kalıp ifade yoğunluğu düşük.",
    lowSpecificityPenalty > 0
      ? "Kısa ve soyut anlatım AI-template izlenimini artırıyor."
      : "Yeterli detay bulunduğu için template benzerliği azalıyor.",
  ];

  const guidance = [
    "Kişisel gözlem veya saha verisi ekleyerek metni özgünleştir.",
    "Genel sıfatlar yerine ölçülebilir ifadeler kullan.",
  ];

  return {
    key: "aiGeneratedRisk",
    title: "AI-Generated Risk",
    score,
    reasons,
    guidance,
  };
}

export function analyzePitchText(pitch: string): SlopAnalysisResult {
  const normalized = pitch.trim().replace(/\s+/g, " ");
  const originality = evaluateOriginality(normalized);
  const marketFit = evaluateMarketFit(normalized);
  const technicalClarity = evaluateTechnicalClarity(normalized);
  const aiGeneratedRisk = evaluateAiGeneratedRisk(normalized);

  // Risk score is inverted in total formula: higher risk should reduce the final score.
  const slopScore = clamp(
    originality.score * 0.3 +
      marketFit.score * 0.3 +
      technicalClarity.score * 0.25 +
      (100 - aiGeneratedRisk.score) * 0.15
  );

  return {
    pitch: normalized,
    slopScore,
    analyzedAt: new Date().toISOString(),
    axes: [originality, marketFit, technicalClarity, aiGeneratedRisk],
  };
}
