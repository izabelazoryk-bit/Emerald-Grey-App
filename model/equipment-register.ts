/**
 * Emerald Grey equipment register, updated 23 October 2026.
 * Seed data for the Equipment table. Serial numbers and check records are left empty
 * until recorded; details still to confirm are listed on each entry.
 */
import type { Equipment } from "./domain";

export type EquipmentSeed = Omit<Equipment, "id" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "version" | "syncState" | "checks" | "serialNumber">;

const p = (quantityKey: string, label: string, unit: string, range?: string) => ({ quantityKey, label, unit, range });

const LEAD_UKHSA = "UKHSA does not recommend colour-change chemical test kits for reliable assessment of lead in buildings, because results can be inaccurate. Treat any swab finding as an initial indication and refer suspected contamination for accredited laboratory analysis.";
const MOULD_CONTEXT = "Interpret alongside moisture readings, ventilation, visible conditions and building history. Not used alone to establish a health risk or to exclude hidden mould.";

export const EQUIPMENT_REGISTER: EquipmentSeed[] = [
  /* 1. Indoor air quality and ventilation */
  { key: "aranet4", category: "air", kind: "instrument", name: "Aranet4", defaultResultClass: "instrument_reading", points: ["B6", "S5"],
    purpose: "CO₂, relative humidity, temperature and atmospheric pressure. Used to assess ventilation effectiveness and bedroom air quality.",
    parameters: [p("co2", "Carbon dioxide", "ppm"), p("rh", "Relative humidity", "%"), p("temperature", "Temperature", "°C"), p("pressure", "Atmospheric pressure", "hPa")],
    requiredChecks: ["calibration"], csvImport: true, detailsToConfirm: [], limitations: [], usageGuidance: [] },
  { key: "inkbird", category: "air", kind: "instrument", name: "INKBIRDPLUS CO₂ Monitor", defaultResultClass: "instrument_reading", points: ["B6"],
    purpose: "Additional CO₂, temperature and humidity monitoring, depending on exact model.",
    parameters: [p("co2", "Carbon dioxide", "ppm"), p("temperature", "Temperature", "°C"), p("rh", "Relative humidity", "%")],
    requiredChecks: ["calibration"], detailsToConfirm: ["Exact model"], limitations: [], usageGuidance: [] },
  { key: "temtop", category: "air", kind: "instrument", name: "Temtop Airing 2000", defaultResultClass: "instrument_reading", points: ["B5"],
    purpose: "Airborne particulates including PM1, PM2.5 and PM10, plus other supported air quality parameters.",
    parameters: [p("pm1", "PM1", "µg/m³"), p("pm25", "PM2.5", "µg/m³"), p("pm10", "PM10", "µg/m³")],
    requiredChecks: ["calibration"], detailsToConfirm: [], limitations: [], usageGuidance: [] },
  { key: "pcevoc", category: "air", kind: "instrument", name: "PCE-VOC 1", defaultResultClass: "indicative_screening", points: ["B1", "B2"],
    purpose: "Screening for volatile organic compounds (VOCs) and formaldehyde.",
    parameters: [p("tvoc", "TVOC", "mg/m³"), p("hcho", "Formaldehyde", "mg/m³")],
    requiredChecks: ["calibration"], detailsToConfirm: [],
    limitations: ["Screening result. It shows where laboratory analysis may be worthwhile and is not classified automatically."], usageGuidance: [] },
  { key: "bwflex", category: "air", kind: "instrument", name: "Honeywell BW Flex 4 Gas Detector", defaultResultClass: "instrument_reading", points: ["B1"],
    purpose: "Detects combustible gases (LEL), hydrogen sulphide (H₂S), carbon monoxide (CO) and oxygen (O₂), subject to the installed sensor configuration. Relevant to suspected gas hazards, drainage-related concerns and combustion issues.",
    parameters: [p("lel", "Combustible gases", "% LEL"), p("h2s", "Hydrogen sulphide", "ppm"), p("co", "Carbon monoxide", "ppm"), p("o2", "Oxygen", "% vol")],
    requiredChecks: ["bump_test", "calibration"], bumpTestBeforeEachVisit: true, detailsToConfirm: ["Installed sensor configuration"],
    limitations: ["Not a substitute for a qualified gas-safety investigation. Any alarm or suspected gas escape: leave the property, call the gas emergency line (0800 111 999) and refer to a Gas Safe registered engineer."], usageGuidance: [] },

  /* 2. Electromagnetic fields and electrical environment */
  { key: "hf38", category: "emf", kind: "instrument", name: "Gigahertz Solutions HF38B-W", defaultResultClass: "instrument_reading", points: ["A3"],
    purpose: "Radio-frequency measurements, approximately 700 MHz to 2.4 GHz.",
    parameters: [p("rf_power_density", "RF power density, peak and average", "µW/m²", "approx. 700 MHz to 2.4 GHz")], frequencyCoverageMHz: { min: 700, max: 2400 },
    requiredChecks: ["calibration"], detailsToConfirm: [], limitations: [], usageGuidance: [] },
  { key: "hfw35", category: "emf", kind: "instrument", name: "Gigahertz Solutions HFW35C", defaultResultClass: "instrument_reading", points: ["A3"],
    purpose: "Higher-frequency RF measurements, approximately 2.4 to 6 GHz.",
    parameters: [p("rf_power_density", "RF power density, peak and average", "µW/m²", "approx. 2.4 to 6 GHz")], frequencyCoverageMHz: { min: 2400, max: 6000 },
    requiredChecks: ["calibration"], detailsToConfirm: [], limitations: [], usageGuidance: [] },
  { key: "me3951", category: "emf", kind: "instrument", name: "Gigahertz Solutions ME3951A", defaultResultClass: "instrument_reading", points: ["A1", "A2"],
    purpose: "Low-frequency electric and magnetic field measurements from wiring, electrical appliances and installations.",
    parameters: [p("ac_electric_field_earthed", "AC electric field, earthed method", "V/m"), p("ac_magnetic_field", "AC magnetic flux density", "nT")],
    requiredChecks: ["calibration"], detailsToConfirm: [], limitations: [], usageGuidance: [] },
  { key: "em100", category: "emf", kind: "instrument", name: "TriField EM100 Power Line Monitor", defaultResultClass: "instrument_reading", points: ["A1"],
    purpose: "Measures conducted electrical interference (line noise or dirty electricity) on mains wiring, approximately 10 kHz to 10 MHz.",
    parameters: [p("line_noise", "Line noise", "mV p-p", "approx. 10 kHz to 10 MHz")],
    requiredChecks: ["calibration"], detailsToConfirm: [],
    limitations: ["No numerical guideline is loaded for line noise. Readings are recorded with a written professional assessment."], usageGuidance: [] },
  { key: "bvset", category: "emf", kind: "instrument", name: "Multimeter and body-voltage testing setup", defaultResultClass: "instrument_reading", points: ["A1"],
    purpose: "Body-voltage measurements relating to capacitive coupling with the electrical environment, using appropriate electrical safety procedures.",
    parameters: [p("body_voltage", "Body voltage", "mV")],
    requiredChecks: ["calibration"], detailsToConfirm: ["Exact multimeter model"], limitations: [], usageGuidance: [] },

  /* 3. Lighting and circadian environment */
  { key: "ohsp", category: "light", kind: "instrument", name: "HopooColor OHSP-350IR Spectrometer", defaultResultClass: "instrument_reading", points: ["A9"],
    purpose: "Spectral characteristics of lighting, including wavelength distribution, colour temperature, colour rendering and supported photometric measurements. Also used for red and infrared lighting devices within its specified spectral range.",
    parameters: [p("cct", "Colour temperature", "K"), p("cri", "Colour rendering index", ""), p("illuminance", "Illuminance", "lx")],
    requiredChecks: ["calibration"], detailsToConfirm: [], limitations: [], usageGuidance: ["Confirmed model. Replaces the earlier provisional OHSP-350 entry."] },

  /* 4. Moisture, damp and building defects */
  { key: "protimeter", category: "moisture", kind: "instrument", name: "Protimeter Surveymaster", defaultResultClass: "instrument_reading", points: ["S2"],
    purpose: "Identifies elevated moisture in building materials using pin and non-invasive modes.",
    parameters: [p("wme", "Wood moisture equivalent", "%"), p("relative_moisture", "Comparative reading, non-invasive", "")],
    requiredChecks: ["calibration"], detailsToConfirm: [],
    limitations: ["Non-invasive readings are comparative. They show where to investigate further."], usageGuidance: [] },
  { key: "hikmicro", category: "moisture", kind: "instrument", name: "HIKMICRO E01 Thermal Camera", defaultResultClass: "professional_observation", points: ["S2", "S3"],
    purpose: "Identifies surface temperature anomalies, thermal bridges, possible insulation defects, cold surfaces and areas requiring further moisture investigation.",
    parameters: [p("surface_temperature", "Surface temperature", "°C")],
    requiredChecks: ["calibration"], detailsToConfirm: [], limitations: [], usageGuidance: [] },

  /* 5. Mould and microbiological investigation */
  { key: "swab", category: "mould", kind: "sampling_kit", name: "Mould swab sampling kits", defaultResultClass: "laboratory_confirmed", points: ["C1"],
    purpose: "Collects samples from suspect surfaces for laboratory identification or analysis.",
    parameters: [], requiredChecks: ["batch_expiry"], detailsToConfirm: [], limitations: [MOULD_CONTEXT], usageGuidance: [] },
  { key: "dust", category: "mould", kind: "sampling_kit", name: "Dust sampling kits", defaultResultClass: "laboratory_confirmed", points: ["C1"],
    purpose: "Collects settled dust for laboratory analysis of mould-related contamination, according to the laboratory's method.",
    parameters: [], requiredChecks: ["batch_expiry"], detailsToConfirm: [], limitations: [MOULD_CONTEXT], usageGuidance: [] },
  { key: "lab", category: "mould", kind: "method", name: "External specialist laboratory", defaultResultClass: "laboratory_confirmed", points: ["C1", "S1"],
    purpose: "Analyses submitted samples and provides results for interpretation within the overall building investigation.",
    parameters: [], requiredChecks: [], detailsToConfirm: ["Laboratory name and accreditation"], limitations: [], usageGuidance: [] },

  /* 6. Water quality screening */
  { key: "varify", category: "water", kind: "screening_kit", name: "Varify Water Hardness Test Kit", defaultResultClass: "indicative_screening", points: ["S1"],
    purpose: "On-site hardness screening, primarily reflecting dissolved calcium and magnesium. Useful for understanding scaling and water treatment needs.",
    parameters: [p("hardness", "Hardness", "ppm", "0 to 425 ppm")], requiredChecks: ["batch_expiry"], detailsToConfirm: [], limitations: [], usageGuidance: [] },
  { key: "tespert", category: "water", kind: "screening_kit", name: "TESPERT 16-in-1 Drinking Water Test Strips", defaultResultClass: "indicative_screening", points: ["S1"],
    purpose: "Rapid screening of multiple water parameters, including hardness, lead, iron and copper as indicated by the product listing.",
    parameters: [], requiredChecks: ["batch_expiry"], detailsToConfirm: [],
    limitations: ["Preliminary screening, not a comprehensive drinking-water safety test. Any indication of lead, copper or iron is referred for accredited laboratory analysis."], usageGuidance: [] },
  { key: "pawfly", category: "water", kind: "screening_kit", name: "Pawfly Lead Test Swabs (60 pcs)", defaultResultClass: "indicative_screening", points: ["S4"],
    purpose: "Screening of compatible solid surfaces and materials for potential lead contamination. Not designed for testing drinking water.",
    parameters: [], requiredChecks: ["batch_expiry"], detailsToConfirm: [], limitations: [LEAD_UKHSA],
    usageGuidance: [
      "Optional, targeted investigation rather than part of every assessment.",
      "Older properties with historic paintwork, particularly deteriorating or peeling surfaces, original joinery, windows, doors and radiators.",
      "Before refurbishment, where sanding, scraping or disturbing old paint could generate lead-containing dust.",
      "Antique or imported glazed ceramics, especially if used for food or drink. A swab cannot establish food-contact safety.",
      "Suspected contaminated dust or surfaces, where the building history suggests a potential lead source."
    ] },

  /* 7. Radon */
  { key: "radon", category: "radon", kind: "instrument", name: "Three-month radon monitoring device", defaultResultClass: "instrument_reading", points: ["A6"],
    purpose: "Long-term measurement of indoor radon concentrations to establish a representative assessment of radon exposure.",
    parameters: [p("radon", "Radon, three-month average", "Bq/m³")], requiredChecks: ["calibration"], detailsToConfirm: ["Detector brand and model"], limitations: [], usageGuidance: [] },
  { key: "radondesk", category: "radon", kind: "method", name: "Desktop radon risk assessment", defaultResultClass: "professional_observation", points: ["A6"],
    purpose: "Review of local radon potential before the property visit, helping identify where monitoring is advisable.",
    parameters: [], requiredChecks: [], detailsToConfirm: [], limitations: [], usageGuidance: [] },

  /* 8. Acoustic environment */
  { key: "decibelx", category: "sound", kind: "app", name: "Decibel X App", defaultResultClass: "indicative_screening", points: ["A8"],
    purpose: "Screening of background sound levels and noise from ventilation systems, appliances, building services and external sources.",
    parameters: [p("sound_level", "Sound level", "dB(A)")], requiredChecks: [], detailsToConfirm: [],
    limitations: ["Phone-based measurements are useful for indicative comparisons. Without calibration they are not equivalent to a professional sound-level survey."], usageGuidance: [] }
];
