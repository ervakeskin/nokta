# idea.md - Track 2 Customization

## 1) Product Idea
Users paste a startup-style pitch paragraph. The system tests market-claim quality and returns a `slop score` with transparent reasons.

## 2) Target User
- Software-aware founders/students who evaluate product ideas quickly.
- Non-technical users who want to turn raw ideas into clearer software opportunities.

## 3) What the AI Evaluates
1. **Originality** - Is the idea specific and differentiated, or generic?
2. **Market Fit** - Are user segment and market claims concrete and measurable?
3. **Technical Clarity** - Is there enough technical feasibility detail for MVP direction?
4. **AI-Generated Risk** - Does the text look like template-generated generic content?

## 4) Output Contract
- `slop score` (0-100)
- Per-axis scores
- Reason bullets per axis
- Improvement prompts per axis

## 5) Prompting / Guidance Direction
- Ask user to define one specific audience.
- Force at least one measurable success metric.
- Require one clear technical implementation signal.
- Encourage replacing generic marketing phrases with concrete observations.

## 6) Why This Matters
This flow helps students and builders avoid shallow pitch writing by converting vague claims into measurable, technically grounded statements.
