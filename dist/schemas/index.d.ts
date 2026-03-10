export type Primitive = string | number | boolean | null;
export type ScoreTransformMap = Partial<Record<"z" | "t" | "scaled" | "percentile" | "stanine", number>>;
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
    blockId?: string;
    isPractice?: boolean;
    stimulus?: string;
    stimulusSide?: "left" | "right" | "center" | string;
    expectedResponse?: TResponse;
    response?: TResponse;
    isCorrect?: boolean;
    reactionTimeMs?: number | null;
    latencyMs?: number | null;
    durationMs?: number | null;
    responses?: readonly TResponse[];
    expectedSequence?: readonly TResponse[];
    responseSequence?: readonly TResponse[];
    spanLevel?: number;
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
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface ProtocolMetadata {
    protocolId?: string;
    protocolVersion?: string;
    instrumentId?: string;
    instrumentVersion?: string;
    batteryId?: string;
    metadata?: Record<string, Primitive | Primitive[] | undefined>;
}
export interface DeviceMetadata {
    deviceType?: "desktop" | "tablet" | "mobile" | "unknown" | string;
    operatingSystem?: string;
    browser?: string;
    inputMethod?: "keyboard" | "mouse" | "touch" | "gamepad" | string;
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
export interface PracticeSplit<T> {
    practice: T[];
    scored: T[];
}
