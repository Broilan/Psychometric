import type { NormTable, ScaleDefinition, TrialRecord } from "../../src";

export const choiceReactionTimeTrials: TrialRecord[] = [
  { id: "p1", isPractice: true, blockId: "practice", stimulusSide: "left", reactionTimeMs: 350, isCorrect: true },
  { id: "p2", isPractice: true, blockId: "practice", stimulusSide: "right", reactionTimeMs: 330, isCorrect: true },
  { id: "c1", blockId: "early", stimulusSide: "left", reactionTimeMs: 320, isCorrect: true },
  { id: "c2", blockId: "early", stimulusSide: "right", reactionTimeMs: 340, isCorrect: true },
  { id: "c3", blockId: "early", stimulusSide: "left", reactionTimeMs: 360, isCorrect: false },
  { id: "c4", blockId: "early", stimulusSide: "right", reactionTimeMs: null, isCorrect: false },
  { id: "c5", blockId: "early", stimulusSide: "left", reactionTimeMs: 120, isCorrect: false },
  { id: "c6", blockId: "late", stimulusSide: "right", reactionTimeMs: 410, isCorrect: true },
  { id: "c7", blockId: "late", stimulusSide: "left", reactionTimeMs: 390, isCorrect: true },
  { id: "c8", blockId: "late", stimulusSide: "right", reactionTimeMs: 430, isCorrect: true },
  { id: "c9", blockId: "late", stimulusSide: "left", reactionTimeMs: null, isCorrect: false },
  { id: "c10", blockId: "late", stimulusSide: "right", reactionTimeMs: 440, isCorrect: false },
];

export const simpleReactionTimeTrials: TrialRecord[] = [
  { id: "s1", blockId: "early", reactionTimeMs: 280, isCorrect: true },
  { id: "s2", blockId: "early", reactionTimeMs: 295, isCorrect: true },
  { id: "s3", blockId: "early", reactionTimeMs: 310, isCorrect: true },
  { id: "s4", blockId: "early", reactionTimeMs: 130, isCorrect: false },
  { id: "s5", blockId: "late", reactionTimeMs: 500, isCorrect: true },
  { id: "s6", blockId: "late", reactionTimeMs: 2200, isCorrect: true },
  { id: "s7", blockId: "late", reactionTimeMs: null, isCorrect: false },
  { id: "s8", blockId: "late", reactionTimeMs: 320, isCorrect: true },
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
  { id: "f1", blockId: "block-1", reactionTimeMs: 410, response: "left", isCorrect: true, labels: { congruency: "congruent", condition: "congruent" } },
  { id: "f2", blockId: "block-1", reactionTimeMs: 420, response: "right", isCorrect: true, labels: { congruency: "congruent", condition: "congruent" } },
  { id: "f3", blockId: "block-1", reactionTimeMs: 510, response: "left", isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent" } },
  { id: "f4", blockId: "block-1", reactionTimeMs: 530, response: "right", isCorrect: true, labels: { congruency: "incongruent", condition: "incongruent" } },
  { id: "f5", blockId: "block-2", reactionTimeMs: 470, response: "left", isCorrect: true, labels: { switchType: "repeat", condition: "repeat" } },
  { id: "f6", blockId: "block-2", reactionTimeMs: 550, response: "right", isCorrect: true, labels: { switchType: "switch", condition: "switch" } },
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
