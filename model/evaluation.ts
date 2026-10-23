/**
 * Evaluation rules. Pure functions, shared by the tablet app, the report builder
 * and the server, so a reading is classified the same way everywhere.
 */
import type { CoverageStatus, Evaluation, Measurement, ReferenceEntry, Instrument } from "./domain";

/**
 * Returns an evaluation only when the measurement and the reference entry agree on
 * quantity, unit, method and detector. Anything else is "not_classified" with a reason the assessor can read.
 */
export function evaluate(m: Measurement, ref: ReferenceEntry): Evaluation {
  if (m.certainty === "observation" || (m.value == null && !m.axes)) {
    return { type: "not_classified", reason: "Observation without a numerical value. Add a professional assessment." };
  }
  if (!ref.verifiedAgainstSourceBy) {
    return { type: "not_classified", reason: "Reference entry has not been verified against its source." };
  }
  if (m.quantityKey !== ref.quantityKey || m.unit !== ref.unit) {
    return { type: "not_classified", reason: "Quantity or unit differs from the reference entry." };
  }
  if (ref.method !== "any" && m.method !== ref.method) {
    return { type: "not_classified", reason: `Reference applies to ${ref.method} measurements; this reading used ${m.method}.` };
  }
  if (ref.detector && m.detector !== ref.detector) {
    return { type: "not_classified", reason: `Reference applies to ${ref.detector} values.` };
  }
  const value = valueOf(m);
  if (ref.bands) {
    const [a, b, c] = ref.bands;
    const category = value < a ? "no_anomaly" : value < b ? "slight_anomaly" : value < c ? "strong_anomaly" : "extreme_anomaly";
    return { type: "classified", category, referenceEntryId: ref.id };
  }
  if (ref.limit != null) {
    return { type: "compared_with_limit", belowLimit: value < ref.limit, referenceEntryId: ref.id };
  }
  return { type: "not_classified", reason: "Reference entry has no numerical guidance." };
}

/**
 * RF readings stay classified when the instrument misses part of a band in use, but
 * the finding and report must then carry a coverage caveat. Callers check this.
 */
export function coversFrequencies(instrument: Instrument, bandMHz: { min: number; max: number }): boolean {
  const c = instrument.frequencyCoverageMHz;
  return !!c && c.min <= bandMHz.min && c.max >= bandMHz.max;
}

/** Three-axis readings are evaluated on their resultant. */
export function valueOf(m: Measurement): number {
  if (m.axes) return Math.sqrt(m.axes.x ** 2 + m.axes.y ** 2 + m.axes.z ** 2);
  return m.value as number;
}

/** Only measured points can carry an evaluation in a report. */
export function canShowEvaluation(status: CoverageStatus): boolean {
  return status === "measured";
}
