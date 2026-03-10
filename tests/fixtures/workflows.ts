import type { NormTable, ScaleDefinition, TrialRecord } from "../../src";

export const choiceReactionTimeTrials: TrialRecord[] = [
  { id: "p1", isPractice: true, phase: "practice", trialIndex: 1, blockIndex: 0, blockId: "practice", stimulusSide: "left", responseSide: "left", reactionTimeMs: 350, isCorrect: true, labels: { scoringPhase: "practice", condition: "left" } },
  { id: "p2", isPractice: true, phase: "practice", trialIndex: 2, blockIndex: 0, blockId: "practice", stimulusSide: "right", responseSide: "right", reactionTimeMs: 330, isCorrect: true, labels: { scoringPhase: "practice", condition: "right" } },
  { id: "c1", phase: "scored", trialIndex: 3, blockIndex: 1, blockId: "early", stimulusSide: "left", responseSide: "left", reactionTimeMs: 320, isCorrect: true, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "c2", phase: "scored", trialIndex: 4, blockIndex: 1, blockId: "early", stimulusSide: "right", responseSide: "right", reactionTimeMs: 340, isCorrect: true, labels: { scoringPhase: "scored", condition: "right" } },
  { id: "c3", phase: "scored", trialIndex: 5, blockIndex: 1, blockId: "early", stimulusSide: "left", responseSide: "left", reactionTimeMs: 360, isCorrect: false, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "c4", phase: "scored", trialIndex: 6, blockIndex: 1, blockId: "early", stimulusSide: "right", responseSide: "right", reactionTimeMs: null, isCorrect: false, isOmission: true, labels: { scoringPhase: "scored", condition: "right" } },
  { id: "c5", phase: "scored", trialIndex: 7, blockIndex: 1, blockId: "early", stimulusSide: "left", responseSide: "left", reactionTimeMs: 120, isCorrect: false, isAnticipation: true, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "c6", phase: "scored", trialIndex: 8, blockIndex: 2, blockId: "late", stimulusSide: "right", responseSide: "right", reactionTimeMs: 410, isCorrect: true, labels: { scoringPhase: "scored", condition: "right" } },
  { id: "c7", phase: "scored", trialIndex: 9, blockIndex: 2, blockId: "late", stimulusSide: "left", responseSide: "left", reactionTimeMs: 390, isCorrect: true, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "c8", phase: "scored", trialIndex: 10, blockIndex: 2, blockId: "late", stimulusSide: "right", responseSide: "right", reactionTimeMs: 430, isCorrect: true, labels: { scoringPhase: "scored", condition: "right" } },
  { id: "c9", phase: "scored", trialIndex: 11, blockIndex: 2, blockId: "late", stimulusSide: "left", responseSide: "left", reactionTimeMs: null, isCorrect: false, isOmission: true, labels: { scoringPhase: "scored", condition: "left" } },
  { id: "c10", phase: "scored", trialIndex: 12, blockIndex: 2, blockId: "late", stimulusSide: "right", responseSide: "right", reactionTimeMs: 440, isCorrect: false, labels: { scoringPhase: "scored", condition: "right" } },
];

export const simpleReactionTimeTrials: TrialRecord[] = [
  { id: "s1", phase: "scored", blockId: "early", blockIndex: 1, trialIndex: 1, reactionTimeMs: 280, isCorrect: true },
  { id: "s2", phase: "scored", blockId: "early", blockIndex: 1, trialIndex: 2, reactionTimeMs: 295, isCorrect: true },
  { id: "s3", phase: "scored", blockId: "early", blockIndex: 1, trialIndex: 3, reactionTimeMs: 310, isCorrect: true },
  { id: "s4", phase: "scored", blockId: "early", blockIndex: 1, trialIndex: 4, reactionTimeMs: 130, isCorrect: false, isAnticipation: true },
  { id: "s5", phase: "scored", blockId: "late", blockIndex: 2, trialIndex: 5, reactionTimeMs: 500, isCorrect: true },
  { id: "s6", phase: "scored", blockId: "late", blockIndex: 2, trialIndex: 6, reactionTimeMs: 2200, isCorrect: true },
  { id: "s7", phase: "scored", blockId: "late", blockIndex: 2, trialIndex: 7, reactionTimeMs: null, isCorrect: false, isOmission: true },
  { id: "s8", phase: "scored", blockId: "late", blockIndex: 2, trialIndex: 8, reactionTimeMs: 320, isCorrect: true },
];

export const spanTaskTrials: TrialRecord<number>[] = [
  {
    id: "practice-1",
    isPractice: true,
    spanLevel: 2,
    expectedSequence: [1, 2],
    responseSequence: [1, 2],
    responses: [1, 2],
    latencyMs: 700,
    durationMs: 1500,
    labels: { direction: "forward", scoringPhase: "practice" },
    metadata: { direction: "forward" },
  },
  {
    id: "span-1",
    spanLevel: 2,
    expectedSequence: [1, 2],
    responseSequence: [1, 2],
    responses: [1, 2],
    latencyMs: 600,
    durationMs: 1400,
    labels: { direction: "forward", scoringPhase: "scored" },
    metadata: { direction: "forward" },
  },
  {
    id: "span-2",
    spanLevel: 3,
    expectedSequence: [2, 4, 1],
    responseSequence: [2, 1, 4],
    responses: [2, 1, 4],
    latencyMs: 650,
    durationMs: 2100,
    errorTaxonomy: { primary: "order-error" },
    labels: { direction: "forward", scoringPhase: "scored" },
    metadata: { direction: "forward" },
  },
  {
    id: "span-3",
    spanLevel: 3,
    expectedSequence: [3, 1, 4],
    responseSequence: [3, 1, 4],
    responses: [3, 1, 4],
    latencyMs: 620,
    durationMs: 2000,
    labels: { direction: "forward", scoringPhase: "scored" },
    metadata: { direction: "forward" },
  },
  {
    id: "span-4",
    spanLevel: 4,
    expectedSequence: [4, 2, 3, 1],
    responseSequence: [4, 2, 3, 1],
    responses: [4, 2, 3, 1],
    latencyMs: 700,
    durationMs: 2600,
    labels: { direction: "backward", scoringPhase: "scored" },
    metadata: { direction: "backward" },
  },
  {
    id: "span-5",
    spanLevel: 4,
    expectedSequence: [1, 3, 2, 4],
    responseSequence: [1, 3, 2, 2],
    responses: [1, 3, 2, 2],
    latencyMs: 730,
    durationMs: 2700,
    errorTaxonomy: { primary: "repetition" },
    labels: { direction: "backward", scoringPhase: "scored" },
    metadata: { direction: "backward" },
  },
  {
    id: "span-6",
    spanLevel: 5,
    expectedSequence: [5, 1, 4, 2, 3],
    responseSequence: [5, 1, 4, 2, 3],
    responses: [5, 1, 4, 2, 3],
    latencyMs: 750,
    durationMs: 3200,
    labels: { direction: "backward", scoringPhase: "scored" },
    metadata: { direction: "backward" },
  },
];

export const goNoGoTrials: TrialRecord<string>[] = [
  { id: "g1", reactionTimeMs: 320, response: "space", isCorrect: true, labels: { goNoGoType: "go", condition: "go" } },
  { id: "g2", reactionTimeMs: 340, response: "space", isCorrect: true, labels: { goNoGoType: "go", condition: "go" } },
  { id: "g3", reactionTimeMs: null, response: null, isCorrect: false, isOmission: true, labels: { goNoGoType: "go", condition: "go" } },
  { id: "g4", reactionTimeMs: 360, response: "space", isCorrect: false, labels: { goNoGoType: "no-go", condition: "no-go" } },
  { id: "g5", reactionTimeMs: null, response: null, isCorrect: true, labels: { goNoGoType: "no-go", condition: "no-go" } },
  { id: "g6", reactionTimeMs: 140, response: "space", isCorrect: false, labels: { goNoGoType: "go", condition: "go" } },
];

export const flankerTrials: TrialRecord<string>[] = [
  { id: "f1", trialIndex: 1, blockId: "block-1", reactionTimeMs: 410, response: "left", responseSide: "left", cue: "arrow", cueMetadata: { taskSet: "spatial" }, isCorrect: true, labels: { congruency: "congruent", condition: "congruent", cueValidity: "valid" } },
  { id: "f2", trialIndex: 2, blockId: "block-1", reactionTimeMs: 420, response: "right", responseSide: "right", cue: "arrow", cueMetadata: { taskSet: "spatial" }, isCorrect: true, labels: { congruency: "congruent", condition: "congruent", cueValidity: "valid" } },
  { id: "f3", trialIndex: 3, blockId: "block-1", reactionTimeMs: 510, response: "left", responseSide: "left", cue: "arrow", cueMetadata: { taskSet: "spatial" }, isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent", cueValidity: "invalid" } },
  { id: "f4", trialIndex: 4, blockId: "block-1", reactionTimeMs: 530, response: "right", responseSide: "right", cue: "arrow", cueMetadata: { taskSet: "spatial" }, isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent", cueValidity: "invalid" } },
];

export const taskSwitchingTrials: TrialRecord<string>[] = [
  { id: "ts1", trialIndex: 1, blockId: "single", cue: "color", reactionTimeMs: 450, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "repeat", condition: "single", taskSet: "color", cueType: "color" }, metadata: { taskContext: "single" } },
  { id: "ts2", trialIndex: 2, blockId: "single", cue: "shape", reactionTimeMs: 470, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "repeat", condition: "single", taskSet: "shape", cueType: "shape" }, metadata: { taskContext: "single" } },
  { id: "ts3", trialIndex: 3, blockId: "mixed", cue: "color", reactionTimeMs: 520, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "repeat", condition: "repeat", taskSet: "color", cueType: "color" } },
  { id: "ts4", trialIndex: 4, blockId: "mixed", cue: "shape", reactionTimeMs: 540, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "repeat", condition: "repeat", taskSet: "shape", cueType: "shape" } },
  { id: "ts5", trialIndex: 5, blockId: "mixed", cue: "color", reactionTimeMs: 610, response: "left", responseSide: "left", isCorrect: true, labels: { switchType: "switch", condition: "switch", taskSet: "color", cueType: "color" } },
  { id: "ts6", trialIndex: 6, blockId: "mixed", cue: "shape", reactionTimeMs: 630, response: "right", responseSide: "right", isCorrect: true, labels: { switchType: "switch", condition: "switch", taskSet: "shape", cueType: "shape" } },
];

export const recognitionMemoryTrials: TrialRecord<string>[] = [
  { id: "r1", phase: "immediate", response: "old", wasPreviouslySeen: true, reactionTimeMs: 700 },
  { id: "r2", phase: "immediate", response: "new", wasPreviouslySeen: false, reactionTimeMs: 650 },
  { id: "r3", phase: "immediate", response: "old", wasPreviouslySeen: false, reactionTimeMs: 680 },
  { id: "r4", phase: "immediate", response: "new", wasPreviouslySeen: true, reactionTimeMs: 720 },
  { id: "r5", phase: "delayed", response: "old", wasPreviouslySeen: true, reactionTimeMs: 760 },
  { id: "r6", phase: "delayed", response: "new", wasPreviouslySeen: false, reactionTimeMs: 710 },
];

export const processingSpeedTrials: TrialRecord<string>[] = [
  { id: "p1", blockId: "minute-1", durationMs: 60000, response: "A", isCorrect: true },
  { id: "p2", blockId: "minute-1", durationMs: 60000, response: "B", isCorrect: true },
  { id: "p3", blockId: "minute-1", durationMs: 60000, response: "C", isCorrect: false },
  { id: "p4", blockId: "minute-2", durationMs: 60000, response: "D", isCorrect: true },
  { id: "p5", blockId: "minute-2", durationMs: 60000, response: "E", isCorrect: true },
];

export const wellbeingScale: ScaleDefinition<number> = {
  id: "wellbeing",
  label: "Wellbeing Check",
  items: [
    { id: "i1", min: 1, max: 5, subscale: "mood" },
    { id: "i2", min: 1, max: 5, subscale: "mood", reverse: true },
    { id: "i3", min: 1, max: 5, subscale: "mood" },
    { id: "i4", min: 1, max: 5, subscale: "energy" },
    { id: "i5", min: 1, max: 5, subscale: "energy", reverse: true },
    { id: "i6", min: 1, max: 5, subscale: "energy" },
  ],
  subscales: {
    mood: ["i1", "i2", "i3"],
    energy: ["i4", "i5", "i6"],
  },
  composites: {
    wellbeingComposite: ["mood", "energy"],
  },
  scoring: {
    allowProrating: true,
    minAnswered: 4,
    maxMissingRate: 0.1,
  },
};

export const wellbeingResponses = {
  i1: 4,
  i2: 2,
  i3: 5,
  i4: 3,
  i5: null,
  i6: 4,
};

export const wellbeingNorms: NormTable = {
  id: "wellbeing-v1",
  scaleId: "wellbeing",
  version: "2026.1",
  rows: [
    {
      rawMin: 20,
      rawMax: 24,
      ageBand: { label: "18-29", min: 18, max: 29 },
      educationBand: { label: "12-16", min: 12, max: 16 },
      z: 0.5,
      t: 55,
      scaled: 11,
      percentile: 69,
      stanine: 6,
    },
    {
      rawMin: 20,
      rawMax: 24,
      ageBand: { label: "30-39", min: 30, max: 39 },
      educationBand: { label: "12-16", min: 12, max: 16 },
      z: 0.2,
      t: 52,
      scaled: 10.6,
      percentile: 58,
      stanine: 5,
    },
  ],
  interpretationBands: [
    { label: "Average", min: 45, max: 55 },
    { label: "Above Average", min: 56, max: 70 },
  ],
};

export const reliabilityMatrix = [
  [1, 1, 2, 1, 2, 1],
  [2, 2, 3, 2, 3, 2],
  [3, 3, 4, 3, 4, 3],
  [4, 4, 5, 4, 5, 4],
  [5, 5, 5, 5, 5, 5],
  [2, 2, 2, 2, 2, 2],
];
