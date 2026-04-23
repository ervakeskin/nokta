import { analyzePitchText } from "../services/scoring";

describe("analyzePitchText", () => {
  it("returns all required axes with bounded scores", () => {
    const result = analyzePitchText(
      "We target university students who struggle with monthly budgeting. " +
        "Our React Native MVP sends weekly budget nudges and tracks retention with a 20% spending reduction goal."
    );

    expect(result.axes).toHaveLength(4);
    expect(result.slopScore).toBeGreaterThanOrEqual(0);
    expect(result.slopScore).toBeLessThanOrEqual(100);
    for (const axis of result.axes) {
      expect(axis.score).toBeGreaterThanOrEqual(0);
      expect(axis.score).toBeLessThanOrEqual(100);
      expect(axis.reasons.length).toBeGreaterThan(0);
      expect(axis.guidance.length).toBeGreaterThan(0);
    }
  });

  it("penalizes high AI-generated risk language", () => {
    const genericPitch =
      "A revolutionary next-gen ai-powered seamless platform that is a game changer for everyone.";
    const specificPitch =
      "Campus-focused budgeting app for first-year students with weekly spend caps and a measurable 15% savings target.";

    const genericResult = analyzePitchText(genericPitch);
    const specificResult = analyzePitchText(specificPitch);

    const genericRisk = genericResult.axes.find((axis) => axis.key === "aiGeneratedRisk");
    const specificRisk = specificResult.axes.find((axis) => axis.key === "aiGeneratedRisk");

    expect(genericRisk).toBeDefined();
    expect(specificRisk).toBeDefined();
    expect((genericRisk?.score ?? 0)).toBeGreaterThan((specificRisk?.score ?? 0));
  });
});
