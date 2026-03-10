export type Primitive = string | number | boolean | null;
export type ScoreTransformMap = Partial<Record<"z" | "t" | "scaled" | "percentile" | "stanine", number>>;
export type TrialPhase = "practice" | "scored" | "baseline" | "delay" | "recognition" | "learning" | "immediate" | "delayed" | "test" | string;
export type CongruencyLabel = "congruent" | "incongruent" | "neutral" | string;
export type SwitchLabel = "switch" | "repeat" | "mixing" | string;
export type GoNoGoLabel = "go" | "no-go" | string;
export type StopSignalLabel = "go" | "stop" | string;
export interface TrialConditionLabels {
    phase?: TrialPhase;
    condition?: string;
    congruency?: CongruencyLabel;
    switchType?: SwitchLabel;
    scoringPhase?: "practice" | "scored" | string;
    goNoGoType?: GoNoGoLabel;
    stopSignalType?: StopSignalLabel;
    cueValidity?: "valid" | "invalid" | "neutral" | string;
    cueType?: string;
    taskSet?: string;
    responseSide?: "left" | "right" | "center" | string;
    dominantSide?: "dominant" | "non-dominant" | string;
    responseKey?: string;
    responseModality?: "keyboard" | "touch" | "mouse" | "voice" | string;
    direction?: "forward" | "backward" | string;
}
export interface ConfidenceInterval {
    lower: number;
    upper: number;
    level: number;
}
export interface ItemDefinition<TResponse = Primitive> {
    id: string;
    prompt?: string;
    key?: string;
    subscale?: string;
    weight?: number;
    reverse?: boolean;
    min?: number;
    max?: number;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
    scoring?: {
        correctResponse?: TResponse;
        missingValues?: readonly TResponse[];
    };
}
export interface ScaleDefinition<TResponse = Primitive> {
    id: string;
    label?: string;
    items: readonly ItemDefinition<TResponse>[];
    subscales?: Readonly<Record<string, readonly string[]>>;
    composites?: Readonly<Record<string, readonly string[]>>;
    scoring?: {
        method?: "sum" | "weighted-sum" | "mean";
        minAnswered?: number;
        maxMissingRate?: number;
        allowProrating?: boolean;
    };
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface TrialRecord<TResponse = Primitive> {
    id: string;
    timestamp?: string;
    trialIndex?: number;
    blockIndex?: number;
    blockId?: string;
    phase?: TrialPhase;
    isPractice?: boolean;
    stimulus?: string;
    stimulusSide?: "left" | "right" | "center" | string;
    stimulusMetadata?: Record<string, Primitive | Primitive[] | undefined>;
    cue?: string;
    cueMetadata?: Record<string, Primitive | Primitive[] | undefined>;
    target?: string;
    targetMetadata?: Record<string, Primitive | Primitive[] | undefined>;
    expectedResponse?: TResponse;
    correctResponse?: TResponse;
    response?: TResponse;
    observedResponse?: TResponse;
    responseSide?: "left" | "right" | "center" | string;
    responseKey?: string;
    responseMetadata?: Record<string, Primitive | Primitive[] | undefined>;
    isCorrect?: boolean;
    isOmission?: boolean;
    isAnticipation?: boolean;
    isTimeout?: boolean;
    isInvalid?: boolean;
    invalidReasons?: readonly string[];
    omissionReason?: string;
    timeoutMs?: number | null;
    reactionTimeMs?: number | null;
    latencyMs?: number | null;
    durationMs?: number | null;
    stopSignalDelayMs?: number | null;
    responses?: readonly TResponse[];
    expectedSequence?: readonly TResponse[];
    responseSequence?: readonly TResponse[];
    spanLevel?: number;
    sequenceLength?: number;
    presentedSequence?: readonly TResponse[];
    recalledSequence?: readonly TResponse[];
    associatedStimulus?: Primitive;
    associatedResponse?: Primitive;
    recognitionTarget?: Primitive;
    wasPreviouslySeen?: boolean;
    recalledAssociates?: readonly Primitive[];
    errorTaxonomy?: Record<string, Primitive | Primitive[] | undefined>;
    focusInterrupted?: boolean;
    focusInterruptionCount?: number;
    sessionMetadata?: Partial<SessionMetadata>;
    protocolMetadata?: Partial<ProtocolMetadata>;
    deviceMetadata?: Partial<DeviceMetadata>;
    exportMetadata?: Partial<ExportMetadata>;
    labels?: TrialConditionLabels;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface BlockRecord<TTrial extends TrialRecord = TrialRecord> {
    id: string;
    label?: string;
    order?: number;
    isPractice?: boolean;
    trials: readonly TTrial[];
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface SessionMetadata {
    sessionId?: string;
    participantId?: string;
    startedAt?: string;
    completedAt?: string;
    locale?: string;
    siteId?: string;
    assessorId?: string;
    visitLabel?: string;
    sessionNumber?: number;
    focusInterruptions?: number;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface ProtocolMetadata {
    protocolId?: string;
    protocolVersion?: string;
    instrumentId?: string;
    instrumentVersion?: string;
    batteryId?: string;
    taskFamily?: string;
    compatibleProtocolIds?: readonly string[];
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface DeviceMetadata {
    deviceType?: "desktop" | "tablet" | "mobile" | "unknown" | string;
    operatingSystem?: string;
    browser?: string;
    inputMethod?: "keyboard" | "mouse" | "touch" | "gamepad" | string;
    timingPrecision?: "high" | "medium" | "low" | string;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface ViewportMetadata {
    width?: number;
    height?: number;
    pixelRatio?: number;
    orientation?: "portrait" | "landscape" | string;
}
export interface QualityFlag {
    code: string;
    severity: "info" | "warning" | "error";
    message: string;
    source?: string;
    threshold?: number;
    observed?: number;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface InterpretationBand {
    label: string;
    min?: number;
    max?: number;
    description?: string;
}
export interface SubscaleScoreResult {
    id: string;
    label?: string;
    itemIds: string[];
    raw: number | null;
    answeredCount: number;
    missingCount: number;
    maxPossible?: number;
    transforms?: ScoreTransformMap;
    /** @deprecated Use `transforms`. */
    transformed?: ScoreTransformMap;
    qualityFlags?: QualityFlag[];
}
export interface ScoreResult {
    scaleId: string;
    raw: number | null;
    transforms?: ScoreTransformMap;
    /** @deprecated Use `transforms`. */
    transformed?: ScoreTransformMap;
    answeredCount: number;
    missingCount: number;
    itemCount: number;
    subscales?: SubscaleScoreResult[];
    composites?: SubscaleScoreResult[];
    qualityFlags?: QualityFlag[];
    confidenceInterval?: ConfidenceInterval;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface SessionSummary {
    summaryType?: "session-summary";
    session: SessionMetadata;
    protocol?: ProtocolMetadata;
    device?: DeviceMetadata;
    viewport?: ViewportMetadata;
    scores?: ScoreResult[];
    qualityFlags?: QualityFlag[];
    summaries?: Record<string, Primitive | Primitive[] | object | undefined>;
}
export interface LatencySummary {
    meanMs: number | null;
    medianMs?: number | null;
    standardDeviationMs?: number | null;
    coefficientOfVariation?: number | null;
    minMs?: number | null;
    maxMs?: number | null;
}
export interface CountRateSummary {
    counts: Record<string, number>;
    rates?: Record<string, number>;
}
export interface ConditionSummary {
    label: string;
    schemaVersion?: string;
    taskFamily?: string;
    counts: {
        total: number;
        valid: number;
        invalid: number;
        correct: number;
        incorrect: number;
        omissions: number;
        anticipations: number;
        lapses: number;
        commissionErrors?: number;
    };
    rates: {
        accuracy: number;
        error: number;
        omission: number;
        anticipation: number;
        commissionError?: number;
    };
    timing: LatencySummary;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface ConditionContrastResult {
    schemaVersion?: string;
    contrastType?: string;
    leftLabel: string;
    rightLabel: string;
    metric: string;
    leftValue: number | null;
    rightValue: number | null;
    rawDifference: number | null;
    proportionalDifference: number | null;
    standardizedDifference?: number | null;
}
export interface QualityFlagBundle {
    flags: QualityFlag[];
    byCode?: Record<string, QualityFlag[]>;
}
export interface InhibitionTaskSummary {
    summaryType: string;
    schemaVersion?: string;
    taskFamily?: string;
    counts: CountRateSummary["counts"];
    rates: NonNullable<CountRateSummary["rates"]>;
    timing: LatencySummary;
    conditionSummaries?: Record<string, ConditionSummary>;
    contrasts?: ConditionContrastResult[];
    qualityFlags?: QualityFlag[];
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface MemoryTaskSummary {
    summaryType: string;
    counts: Record<string, number>;
    rates: Record<string, number>;
    timing?: LatencySummary;
    conditionSummaries?: Record<string, ConditionSummary>;
    learningCurve?: Record<string, number>;
    contrasts?: ConditionContrastResult[];
    qualityFlags?: QualityFlag[];
}
export interface ProcessingSpeedSummary {
    summaryType: "processing-speed";
    counts: {
        totalAttempted: number;
        totalCorrect: number;
        totalIncorrect: number;
    };
    rates: {
        accuracy: number;
        throughputPerMinute: number;
    };
    timing: {
        durationMinutes: number | null;
    };
    blockSummaries?: Record<string, CountRateSummary & {
        throughputPerMinute?: number;
    }>;
    qualityFlags?: QualityFlag[];
}
export interface SessionComparisonMetric {
    key: string;
    baseline: number | null;
    followUp: number | null;
    change: number | null;
    percentChange?: number | null;
    reliableChangeIndex?: number | null;
    direction?: "increase" | "decrease" | "no-change";
}
export interface SessionComparisonResult {
    summaryType: "session-comparison";
    schemaVersion?: string;
    baselineSessionId?: string;
    followUpSessionId?: string;
    protocolCompatible: boolean;
    protocolMessages?: string[];
    metrics: SessionComparisonMetric[];
    practiceEffect?: number | null;
    fatigueEffect?: number | null;
    qualityFlags?: QualityFlag[];
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface NormBand {
    min?: number;
    max?: number;
    label: string;
}
export interface NormRow {
    rawMin?: number;
    rawMax?: number;
    ageBand?: NormBand;
    educationBand?: NormBand;
    sex?: string;
    z?: number;
    t?: number;
    scaled?: number;
    percentile?: number;
    stanine?: number;
    standardScore?: number;
    confidenceRange?: {
        lower?: number;
        upper?: number;
    };
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface NormTable {
    id: string;
    scaleId: string;
    version: string;
    label?: string;
    scoreType?: "raw" | "z" | "t" | "scaled" | "percentile" | "stanine" | "standard";
    rows: readonly NormRow[];
    interpretationBands?: readonly InterpretationBand[];
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface NormLookupResult {
    schemaVersion?: string;
    matched: boolean;
    tableId: string;
    tableVersion: string;
    raw: number;
    normed?: {
        z?: number;
        t?: number;
        scaled?: number;
        percentile?: number;
        stanine?: number;
        standardScore?: number;
    };
    interpretation?: InterpretationBand;
    row?: NormRow;
    qualityFlags?: QualityFlag[];
}
export interface ExportMetadata {
    kind: string;
    exportVersion: string;
    schemaVersion: string;
    generatedAt: string;
    packageName: string;
    packageVersion?: string;
}
export interface ExportEnvelope<TPayload> {
    metadata: ExportMetadata;
    payload: TPayload;
}
export interface SessionSummaryExport extends ExportEnvelope<SessionSummary> {
}
export interface TrialRecordsExport<TTrial extends TrialRecord = TrialRecord> extends ExportEnvelope<readonly TTrial[]> {
}
export interface ScaleScoresExport extends ExportEnvelope<readonly ScoreResult[]> {
}
export interface NormLookupExport extends ExportEnvelope<NormLookupResult> {
}
export interface QualityFlagsExport extends ExportEnvelope<QualityFlagBundle> {
}
export interface SessionComparisonExport extends ExportEnvelope<SessionComparisonResult> {
}
export interface PracticeSplit<T> {
    practice: T[];
    scored: T[];
}
