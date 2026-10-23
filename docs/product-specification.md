# Emerald Grey Healthy Home Assessment: product specification

Version 0.1, October 2026. Companion to the connected screen prototype in `prototype/index.html` and the domain model in `model/`.

## 1. Purpose

The app brings the whole assessment into one place: the client questionnaire, property research, room-by-room measurements, laboratory testing, the report and the action plan. It has two connected experiences. The **assessor workspace** is designed for a tablet on site and a desktop for analysis and report writing. The **client portal** is designed for a phone. The aim is to spend less time moving information between tools and to give clients a clear understanding of their home and what to do next.

The first release prioritises three things: reliable data capture, report production and secure client access.

## 2. Principles that shape every screen

**Coverage and evaluation are always separate.** Every assessment point has a coverage status: Measured, Visually inspected, Awaiting laboratory results, Referred to specialist, Not included or Not accessible. An evaluation (such as "Slight anomaly") can only be attached to a measured result. An item that was not measured can never appear as satisfactory, in any table, chart or summary.

**Context travels with every value.** A reading keeps its location, date and time, instrument, method, duration and conditions (occupancy, windows, heating, appliance and circuit states). The interface distinguishes a spot reading from overnight monitoring, a screening result from laboratory analysis, and an observation from a confirmed finding.

**Four result classes.** Every result is an instrument reading, an indicative screening result, a laboratory-confirmed result or a professional observation. The class comes from the equipment register entry and is shown beside the value.

**Classification only where it is supported.** Automatic classification appears only for instrument readings and laboratory-confirmed results whose method, unit and detector match a verified reference entry. Screening results (water strips, lead swabs, the VOC screener, the sound app) are never classified automatically. Otherwise the reading shows "Not classified" with the reason, and the assessor can write a professional assessment.

**SBM guidance is never confused with legal limits.** SBM sleeping-area precautionary guidance, statutory or government references, and other reference values each carry their own label. A reading below a statutory limit is never presented as meeting the precautionary guidance.

**Every colour has words.** Status and evaluation colours always come with a text label. There is no single health score for the property.

**Calm, accessible language for clients.** Client-facing text follows the Emerald Grey voice: warm, measured and practical. The assessment looks at the home environment and never implies diagnosis.

## 3. Users and permissions

| Role | Who | Can do |
|---|---|---|
| Owner | Iza | Everything an assessor can, plus manage users, packages, reference library and retention settings |
| Assessor | Iza, Alfie | Work on any assigned client record, capture data, draft and approve findings, publish reports |
| Client | Household members | See only their own published reports, photographs, action plan and messages; complete questionnaires; mark actions done; upload progress photos; ask questions |

Internal notes, research notes, draft findings, unpublished report versions and other clients' records are never reachable from a client account. This is enforced on the server (row-level security), not only hidden in the interface.

Optional wellbeing information (sleep, allergies, sensitivities) is held in a separate table with field-level encryption, readable only by assessors assigned to that client, recorded only with explicit consent, and every read is logged.

## 4. Assessment structure

The structure follows the Standard of Building Biology Testing Methods, starting with SBM-2024. Editions are versioned so a later edition can be added without changing past assessments.

**A. Fields, waves and radiation:** A1 AC electric fields and body voltage; A2 AC magnetic fields; A3 radio-frequency radiation; A4 static electric fields; A5 static magnetic fields; A6 radioactivity and radon; A7 geological disturbances (measured); A8 sound and vibration; A9 lighting.

**B. Indoor pollutants and climate:** B1 formaldehyde and other gases; B2 solvents and other VOCs; B3 pesticides and other SVOCs; B4 metals and similar; B5 particles and fibres; B6 indoor climate.

**C. Fungi, bacteria and allergens:** C1 mould, spores and metabolites; C2 yeasts; C3 bacteria; C4 allergens.

**Supporting modules:** S1 water quality; S2 moisture investigation; S3 building defects; S4 materials; S5 ventilation.

Service packages (for example Sleep Sanctuary, Healthy Home Essentials, Healthy Home Comprehensive) pre-select points. Each visit copies that selection and can then be adjusted point by point. Every module supports both our own measurements and specialist or laboratory investigations.

## 5. Screens in the first design

| Screen | Device | Purpose |
|---|---|---|
| Assessor dashboard | Desktop | Upcoming visits, assessments in progress, outstanding laboratory results, reports awaiting review, client follow-ups |
| Client and property profile | Desktop | Property facts, household priorities, protected wellbeing information, visit timeline, SBM scope per visit, documents, internal notes |
| Pre-visit questionnaire | Phone | Concerns, rooms to investigate, home details, routines, optional wellbeing section with consent, document upload |
| Room assessment | Tablet | Room list with progress, point status, room-specific prompts, quick and dictated notes, readings with full context, photographs, samples, findings |
| Bedroom measurement grid | Tablet | Nine-point mattress grid, potential-free and earthed electric-field methods kept apart, body voltage, three-axis magnetic readings with resultant, RF peak and RMS with instrument frequency coverage, before-and-after comparison, room plan with readings, sources and photographs |
| Finding and recommendation editor | Desktop | Linked evidence, what we found, why it matters, what you can do, cost range, specialist need, priority, reusable explanations, reference criteria panel, conflicting-edit resolution |
| Report preview | Desktop | Branded report, pre-publication checklist (draft findings, outstanding results, scope review, frozen reference set), version history |
| Client portal | Phone | Where to begin, full action plan by priority, mark actions done, progress photos, report download and online reading, questions |
| Equipment register | Desktop | All 18 named devices, kits and apps and 4 additional methods by category, with parameters, default result class, checks, details to confirm, limitations and usage guidance |

## 6. Measurement capture

- **Equipment register** (seeded from `model/equipment-register.ts`, updated 23 October 2026) lists 8 categories, 18 named devices, kits and apps, and 4 additional methods. Each entry records its parameters and units, frequency coverage where relevant, serial number, default result class, required checks (calibration, bump test, batch and expiry), details still to confirm, and limitations that travel with every result. Serial numbers and check records are added by the team and are never pre-filled.
- **Gas detector.** The Honeywell BW Flex 4 needs a bump test logged before each visit; readings without one are flagged. Its readings always carry the note that it does not replace a qualified gas-safety investigation.
- **Electric fields** are measured with the ME3951A using the earthed method, and evaluated only against the earthed-method reference entry. Potential-free readings have their own method and reference entry, ready if a potential-free meter is added.
- **Bedroom grid** uses nine fixed positions (head, middle, foot by left, centre, right). Positions not measured are drawn hatched and labelled "Not measured".
- **Magnetic fields** store X, Y and Z; the resultant is calculated, never typed.
- **RF** stores the detector (peak or average) and which meters were used. The HF38B-W (about 700 MHz to 2.4 GHz) and HFW35C (about 2.4 to 6 GHz) together cover about 700 MHz to 6 GHz. Sources outside that range (FM, DAB, TETRA, Wi-Fi 6E) produce an automatic caveat on the finding and report.
- **Before and after** readings share a comparison group with a description of the change (for example "circuit 7 switched off at consumer unit"). Repeat visits link to the earlier visit so comparable readings appear side by side.
- **CSV import** accepts logger exports (the Aranet4 first), maps columns to quantities, previews the series and saves it as overnight monitoring linked to a room and instrument.
- **Room templates**: a room's structure (points, prompts, measurement positions) can be duplicated without its readings.

## 7. Samples and laboratory results

Each sample has a unique reference (`EG-YYMM-CLIENT-TNN`), room, point, matrix, collection location, method and equipment, date and time, laboratory (or "On-site screening") and status (planned, collected, deployed, at laboratory, result received, reviewed). Water samples record the outlet, hot or cold supply, filtered or unfiltered, and first-draw or flushed. On-site strip results are indicative; any lead, copper or iron indication prompts a bottle sample for accredited laboratory analysis, linked to the screening sample it confirms. Mould swab and dust results are interpreted alongside moisture, ventilation, visible conditions and building history, never alone. Laboratory reports attach to the sample, and results become measurements of type "Laboratory analysis". Outstanding samples appear on the dashboard and in the report checklist, and are listed in any interim report as awaiting results.

## 8. Reference library

Entries belong to a named, versioned reference set (for example "SBM-2024 / UK 2026.1"). Each entry records source, edition, quantity, unit, method, detector, applicable conditions, and either bands or a single limit. An entry must be verified against its source by a named person before it can classify anything. When a report version is issued, its reference set is frozen and stored with the version.

The values in the prototype are placeholders for interface design. Every entry will be confirmed against the licensed SBM-2024 evaluation guidelines and current UK guidance before release.

## 9. Reports and versioning

The report builder assembles approved findings into a branded PDF and an accessible online report from the same content: executive summary, scope and limitations (including points not included and not accessible), room-by-room findings, supporting evidence, measurement tables with their reference criteria, and a prioritised action plan. Each recommendation states what we found, why it matters, what the client can do, the likely cost range and whether specialist help is needed.

Publishing is blocked until every finding is approved, the scope has been reviewed and the reference set is confirmed. Outstanding laboratory results do not block publication but are listed clearly, which allows an interim report. Issued versions are immutable snapshots with a checksum; corrections create a new version.

## 10. Offline working, synchronisation and shared editing

- The tablet app is an installable progressive web app that stores everything for the open visit on the device (IndexedDB), including photographs, so a full visit can be completed without signal.
- Every edit saves automatically on the device within a second. A visible status shows "All changes synced", "Saving" or "Offline, N changes waiting to sync".
- Records carry a server version number. When two assessors change the same field, the server keeps both versions and the editor asks which to keep; nothing is silently overwritten. Presence indicators show who is working in which room.
- Every change records who made it and when, and earlier values are kept in history.

## 11. Security and data handling

- Assessors sign in with passkeys or password plus multi-factor authentication. Clients sign in with passkeys or email magic links; sessions on shared devices expire.
- Data is hosted in the UK, encrypted in transit and at rest. Wellbeing fields use additional field-level encryption.
- Files live in private storage and are served only through short-lived signed links.
- Daily encrypted backups with point-in-time recovery; a restore is tested each quarter.
- Audit log of sign-ins, sensitive reads, publication, exports and permission changes.
- UK GDPR: lawful basis recorded per client; explicit consent for wellbeing information, withdrawable from the portal; retention schedule with automatic review; data export and deletion on request; data processing agreements with laboratories and hosting providers.

## 12. Recommended technology for the first release

A single TypeScript codebase: a React progressive web app for both experiences, a PostgreSQL database with row-level security, object storage for files, and server-side PDF rendering from the same HTML templates used for the online report. A managed platform hosted in a UK or EU region keeps operations light for a small team. The domain model in `model/domain.ts` and the evaluation rules in `model/evaluation.ts` are the starting contract.

## 13. Release plan

**Release 1: capture, report, portal.** Client and property records, questionnaire, visit scope, room assessment, bedroom grid, instruments, samples, offline sync, finding editor, reference library, report builder and publishing, client portal with action plan and questions.

**Release 2: depth.** Room plan drawing tools, CSV import for further logger formats, repeat-visit comparison views, laboratory result import, reusable explanation library management, calendar integration.

**Release 3: refinement.** Analytics across assessments (internal only), additional SBM editions, client reminders for action plans.

## 14. Open questions for Emerald Grey

1. Serial numbers and calibration dates for each instrument, the body-voltage multimeter model, the radon detector model, the INKBIRD model and the gas detector's sensor configuration.
2. Which laboratories do you use, and do any provide results in a structured format?
3. Should clients see the SBM category names, plain-language labels, or both?
4. How long should records be retained after the final visit?
5. Do you want a single shared calendar, or integration with an existing one?
