/**
 * Emerald Grey Healthy Home Assessment: core domain model.
 *
 * This file is the contract between the assessor workspace, the client portal,
 * the offline store on assessor tablets and the server. It is deliberately free of
 * framework code so it can be shared by every part of the system.
 *
 * Two rules shape most of the types below:
 *  1. Coverage and evaluation are separate. Whether an area was measured is a
 *     CoverageStatus; how a result compares with a reference is an Evaluation.
 *     An Evaluation can only exist for a measured result, so an unmeasured item can
 *     never appear as satisfactory.
 *  2. Context travels with every value. A Measurement without its method,
 *     instrument and conditions cannot be classified automatically.
 */

/* ------------------------------------------------------------------ */
/* Identity, attribution and sync                                      */
/* ------------------------------------------------------------------ */

export type Id = string;            // UUIDv7, generated on the device so records can be created offline
export type IsoDateTime = string;   // ISO 8601 with offset

export type Role = "owner" | "assessor" | "client";

export interface User {
  id: Id;
  role: Role;
  displayName: string;
  email: string;
  mfaEnabled: boolean;               // required for owner and assessor roles
}

/** Every editable record carries this block. */
export interface Tracked {
  id: Id;
  createdAt: IsoDateTime;
  createdBy: Id;
  updatedAt: IsoDateTime;
  updatedBy: Id;
  /** Incremented by the server on each accepted write. Used for conflict detection. */
  version: number;
  /** Set on the device until the server acknowledges the write. */
  syncState?: "pending" | "synced" | "conflict";
}

/** Who may see a record. Client-visible records are only exposed through published reports. */
export type Visibility = "internal" | "client";

/* ------------------------------------------------------------------ */
/* Clients, properties and visits                                      */
/* ------------------------------------------------------------------ */

export interface Client extends Tracked {
  reference: string;                 // e.g. EG-2610-ASH
  names: string[];
  email: string;
  phone?: string;
  portalUserIds: Id[];               // household members with portal access
  leadAssessorId: Id;
  supportAssessorIds: Id[];
}

export interface Property extends Tracked {
  clientId: Id;
  address: { line1: string; line2?: string; town: string; postcode: string };
  yearBuilt?: string;                // free text allows "c. 1934"
  propertyType?: string;
  construction?: string;
  alterations: { year?: string; description: string }[];
  heating?: string;
  ventilation?: string;
  electrical?: string;
  waterSupply?: string;
  leakHistory: { year?: string; location: string; description: string; repaired?: boolean }[];
  householdRoutines?: string;
  researchNotes: Note[];             // internal: flood maps, radon maps, planning history
}

/**
 * Optional wellbeing information. Stored in a separate, access-controlled table,
 * encrypted at field level, and only readable by assigned assessors.
 * It informs priorities and never implies diagnosis.
 */
export interface WellbeingInfo extends Tracked {
  clientId: Id;
  consent: { givenAt: IsoDateTime; givenBy: Id; withdrawnAt?: IsoDateTime; wording: string };
  sleep?: string;
  allergies?: string;
  sensitivities?: string;
}

export interface Questionnaire extends Tracked {
  propertyId: Id;
  status: "not_started" | "in_progress" | "submitted";
  concerns: string[];
  concernsInOwnWords?: string;
  roomsRequested: string[];
  answers: Record<string, string | string[] | boolean>;
  documentIds: Id[];
  submittedAt?: IsoDateTime;
}

export interface ServicePackage {
  id: Id;
  name: string;                      // e.g. Sleep Sanctuary, Healthy Home Comprehensive
  standardEdition: StandardEdition;
  includedPoints: PointCode[];
}

export interface Visit extends Tracked {
  propertyId: Id;
  sequence: number;                  // 1 for the first visit, 2 for a repeat visit
  scheduledFor: IsoDateTime;
  assessorIds: Id[];
  packageId: Id;
  /** Per-visit scope, copied from the package and then adjusted. */
  scope: Record<PointCode, { included: boolean; status: CoverageStatus; reason?: string }>;
  status: "planned" | "on_site" | "write_up" | "in_review" | "issued";
  comparesWithVisitId?: Id;          // repeat visits point at the visit they compare against
}

/* ------------------------------------------------------------------ */
/* Standard structure (SBM-2024 and later editions)                     */
/* ------------------------------------------------------------------ */

export type StandardEdition = "SBM-2024";

export type PointCode =
  | "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "A8" | "A9"
  | "B1" | "B2" | "B3" | "B4" | "B5" | "B6"
  | "C1" | "C2" | "C3" | "C4"
  | "S1" | "S2" | "S3" | "S4" | "S5";

export interface StandardPoint {
  code: PointCode;
  edition: StandardEdition;
  group: "A" | "B" | "C" | "S";      // S = supporting modules outside the 19 standard points
  name: string;
  /** Measurement types offered when this point is selected. */
  quantities: QuantityDefinition[];
  supportsLaboratory: boolean;
}

export interface QuantityDefinition {
  key: string;                       // e.g. "ac_electric_field_potential_free"
  label: string;
  units: string[];
  methods: string[];                 // e.g. ["potential-free", "earthed"]
  axes?: ("x" | "y" | "z")[];        // three-axis magnetic readings
  detectors?: ("peak" | "rms")[];    // RF readings
}

/* ------------------------------------------------------------------ */
/* Rooms and on-site capture                                           */
/* ------------------------------------------------------------------ */

export type RoomType = "bedroom" | "bathroom" | "kitchen" | "living" | "office" | "loft" | "cellar" | "other";

export interface Room extends Tracked {
  visitId: Id;
  name: string;
  type: RoomType;
  floor?: string;
  points: Partial<Record<PointCode, CoverageStatus>>;
  notAccessibleReason?: string;
  plan?: RoomPlan;
  /** Set when the room's structure was duplicated from another room. */
  templateFromRoomId?: Id;
}

export interface RoomPlan {
  widthM: number;
  depthM: number;
  features: { kind: "bed" | "window" | "door" | "socket" | "furniture" | "other"; x: number; y: number; w?: number; h?: number; label?: string }[];
  markers: PlanMarker[];
}

export interface PlanMarker {
  id: Id;
  kind: "reading" | "suspected_source" | "photo";
  x: number; y: number;              // proportion of plan width and depth, 0 to 1
  measurementId?: Id;
  attachmentId?: Id;
  label: string;
}

export type CoverageStatus =
  | "measured"
  | "visually_inspected"
  | "awaiting_laboratory"
  | "referred_to_specialist"
  | "not_included"
  | "not_accessible";

export type EquipmentCategory = "air" | "emf" | "light" | "moisture" | "mould" | "water" | "radon" | "sound";
export type EquipmentKind = "instrument" | "screening_kit" | "app" | "sampling_kit" | "method";

/** The four result classes from the equipment register. */
export type ResultClass = "instrument_reading" | "indicative_screening" | "laboratory_confirmed" | "professional_observation";

export interface EquipmentParameter {
  quantityKey: string;
  label: string;
  unit: string;
  range?: string;
}

export type CheckType = "calibration" | "verification" | "bump_test" | "batch_expiry";

export interface EquipmentCheck {
  type: CheckType;
  performedAt: IsoDateTime;
  dueBy?: IsoDateTime;
  passed: boolean;
  performedBy: Id;
  certificateAttachmentId?: Id;
}

/** One entry in the equipment register: a device, kit, app or method. */
export interface Equipment extends Tracked {
  key: string;                       // stable key, e.g. "me3951"
  category: EquipmentCategory;
  kind: EquipmentKind;
  name: string;
  purpose: string;
  parameters: EquipmentParameter[];
  frequencyCoverageMHz?: { min: number; max: number };
  defaultResultClass: ResultClass;
  points: PointCode[];
  serialNumber?: string;             // absent until recorded; never invented
  /** Which checks this entry needs, and the history of those checks. */
  requiredChecks: CheckType[];
  bumpTestBeforeEachVisit?: boolean;
  checks: EquipmentCheck[];
  csvImport?: boolean;
  detailsToConfirm: string[];
  /** Shown wherever a result from this entry appears. */
  limitations: string[];
  usageGuidance: string[];
  retired?: boolean;
}

export type MeasurementTiming = "spot" | "overnight" | "long_term";

export interface MeasurementConditions {
  occupancy?: string;
  windows?: string;
  heating?: string;
  applianceStates?: string;
  other?: string;
}

export interface Measurement extends Tracked {
  roomId: Id;
  point: PointCode;
  quantityKey: string;
  label: string;
  value?: number;                    // absent for observations
  unit?: string;
  axes?: { x: number; y: number; z: number };   // resultant is derived, never stored on its own
  detector?: "peak" | "rms";
  location: string;
  gridPosition?: GridPosition;
  takenAt: IsoDateTime;
  endedAt?: IsoDateTime;             // overnight monitoring
  durationText?: string;
  equipmentIds: Id[];                // e.g. both RF meters for a combined peak reading
  method: string;
  timing: MeasurementTiming;
  resultClass: ResultClass;
  conditions: MeasurementConditions;
  /** Links before and after readings from the same position and method. */
  comparison?: { groupId: Id; phase: "before" | "after"; changeDescription: string };
  series?: { importedFrom: string; points: { t: IsoDateTime; v: number }[] };   // CSV imports
  notes?: string;
  dictated?: boolean;
}

export type GridPosition =
  | "head_left" | "head_centre" | "head_right"
  | "middle_left" | "middle_centre" | "middle_right"
  | "foot_left" | "foot_centre" | "foot_right";

/* ------------------------------------------------------------------ */
/* Samples and laboratory results                                      */
/* ------------------------------------------------------------------ */

export type SampleStatus = "planned" | "collected" | "deployed" | "at_laboratory" | "result_received" | "reviewed";

export interface Sample extends Tracked {
  reference: string;                 // unique, e.g. EG-2610-ASH-W01
  roomId: Id;
  point: PointCode;
  matrix: "air" | "surface" | "dust" | "material" | "water";
  collectionLocation: string;
  method: string;
  collectedAt: IsoDateTime;
  equipmentId: Id;                   // the kit or bottle method used
  laboratory: string;                // "On-site screening" for strip tests
  status: SampleStatus;
  water?: {
    outlet: string;
    supply: "hot" | "cold";
    filtered: boolean;
    draw: "first_draw" | "flushed";
    flushSeconds?: number;
  };
  resultAttachmentIds: Id[];
  resultMeasurementIds: Id[];        // laboratory results become Measurements with resultClass "laboratory_confirmed"
  /** Screening samples that need confirmation link to the laboratory sample taken to confirm them. */
  confirmedBySampleId?: Id;
}

/* ------------------------------------------------------------------ */
/* Evidence                                                            */
/* ------------------------------------------------------------------ */

export interface Attachment extends Tracked {
  kind: "photo" | "thermal_image" | "monitoring_chart" | "laboratory_report" | "document" | "client_progress_photo";
  fileName: string;
  storageKey: string;                // private object storage; served through signed, short-lived URLs
  attachedTo: { type: "room" | "measurement" | "sample" | "finding" | "action" | "property"; id: Id };
  caption?: string;
  visibility: Visibility;
}

export interface Note extends Tracked {
  body: string;
  visibility: "internal";            // working notes are never client-visible
}

/* ------------------------------------------------------------------ */
/* Reference library and evaluation                                    */
/* ------------------------------------------------------------------ */

export type ReferenceKind = "sbm_sleeping_area_guidance" | "statutory_or_government" | "other_reference";

export interface ReferenceEntry extends Tracked {
  setId: Id;                         // entries belong to a versioned, frozen reference set
  kind: ReferenceKind;
  source: string;
  edition: string;
  quantityKey: string;
  unit: string;
  /** The method the entry applies to. Classification requires an exact match. */
  method: string | "any";
  detector?: "peak" | "rms";
  applicableConditions: string;
  /** SBM-style bands: upper bounds of no, slight and strong anomaly. */
  bands?: [number, number, number];
  /** Single limit or action level. */
  limit?: number;
  verifiedAgainstSourceBy?: Id;      // an entry cannot be used until a person has checked it
}

export interface ReferenceSet extends Tracked {
  name: string;                      // e.g. "SBM-2024 / UK 2026.1"
  frozen: boolean;                   // a set used by an issued report can never change
}

export type EvaluationCategory = "no_anomaly" | "slight_anomaly" | "strong_anomaly" | "extreme_anomaly";

export type Evaluation =
  | { type: "classified"; category: EvaluationCategory; referenceEntryId: Id }
  | { type: "compared_with_limit"; belowLimit: boolean; referenceEntryId: Id }
  | { type: "not_classified"; reason: string }
  | { type: "professional_assessment"; text: string; by: Id };

/* ------------------------------------------------------------------ */
/* Findings, recommendations and reports                               */
/* ------------------------------------------------------------------ */

export type Priority = "start_here" | "next_steps" | "when_convenient";

export interface Finding extends Tracked {
  visitId: Id;
  roomId?: Id;
  point: PointCode;
  title: string;
  measurementIds: Id[];
  sampleIds: Id[];
  attachmentIds: Id[];
  evaluations: Evaluation[];
  whatWeFound: string;
  whyItMatters: string;
  whatYouCanDo: string;
  costRange?: string;
  specialist?: string;
  priority: Priority;
  explanationIds: Id[];              // reusable text it started from; edits stay local to this finding
  status: "draft" | "approved";
  approvedBy?: Id;
  approvedAt?: IsoDateTime;
}

export interface ReusableExplanation extends Tracked {
  title: string;
  body: string;
  points: PointCode[];
}

export interface Report extends Tracked {
  visitId: Id;
  versions: ReportVersion[];
}

/** An issued version is immutable. It stores a snapshot, never live references. */
export interface ReportVersion {
  version: string;                   // v1.0, v1.1
  label: "interim" | "full" | "follow_up";
  issuedAt: IsoDateTime;
  issuedBy: Id;
  referenceSetId: Id;                // frozen set used for every evaluation in this version
  snapshot: {
    executiveSummary: string;
    scope: Visit["scope"];
    findings: Finding[];
    measurements: Measurement[];
    outstandingSamples: Pick<Sample, "reference" | "status" | "collectionLocation">[];
    actions: Action[];
  };
  pdfStorageKey: string;
  checksum: string;
}

export interface Action extends Tracked {
  findingId: Id;
  title: string;
  why: string;
  room?: string;
  costRange?: string;
  who: "client" | "specialist";
  specialistType?: string;
  priority: Priority;
  completedAt?: IsoDateTime;         // set by the client in the portal
  completedBy?: Id;
  progressAttachmentIds: Id[];
}

export interface ClientQuestion extends Tracked {
  clientId: Id;
  body: string;
  relatesTo?: { type: "action" | "finding" | "report"; id: Id };
  replies: { body: string; by: Id; at: IsoDateTime }[];
}

/* ------------------------------------------------------------------ */
/* Audit                                                               */
/* ------------------------------------------------------------------ */

export interface AuditEvent {
  id: Id;
  at: IsoDateTime;
  actorId: Id;
  action: "read_sensitive" | "create" | "update" | "delete" | "publish" | "export" | "login" | "permission_change";
  entity: { type: string; id: Id };
  diff?: unknown;
}
