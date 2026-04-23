# Track 2 Submission - Slop Score Analyzer

## Student
- Student No: `00000000` (replace with your real student number)
- Slug: `track2-slop-score`

## Selected Track
- **Track 2:** Pitch paragraph is analyzed for market-claim quality and a `slop score` is produced with reasons.

## Expo Access
- App path: `submissions/00000000-track2-slop-score/app`
- Expo QR / Link: `ADD_EXPO_LINK_HERE`

## 60-Second Demo
- Video link: `ADD_DEMO_VIDEO_LINK_HERE`

## Decision Log
1. Implemented four scoring axes: originality, market fit, technical clarity, and AI-generated risk.
2. Used weighted formula for a single explainable score:
   - `slopScore = originality*0.30 + marketFit*0.30 + technicalClarity*0.25 + (100-aiGeneratedRisk)*0.15`
3. Added reason and guidance blocks per axis so user sees both diagnosis and next-action prompts.
4. Stored the last 10 analysis results in AsyncStorage for local history.
5. Kept architecture simple: React Native UI + Zustand store + service layer.

## Local Verification
- `npm run typecheck` ✅
- `npm run lint` ✅
- `npm test` ✅

## Notes
- Replace placeholder student number and links before final submission.
- `app-release.apk` exists as a placeholder file and should be replaced with a real release APK build.
