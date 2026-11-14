# Emerald Grey Healthy Home Assessment: product specification

Version 0.2, November 2026. Companion to the connected screen prototype in `prototype/index.html` and the domain model in `model/`.

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

**Brand.** The interface follows the Emerald Grey Brand Guidelines v3; `docs/brand-application.md` sets out how.

**Calm, accessible language for clients.** Client-facing text follows the Emerald Grey voice: warm, measured and practical. The assessment looks at the home environment and never implies diagnosis.

## 3. Workflow: the client record comes first

Everything starts with the client. The Clients page lists every record and has a **New client** button. The form asks for the client's name, an optional property name, the address and contact details. The next reference is shown before saving and given automatically: real clients run from **EG-100** upwards, and EG-001 to EG-099 are reserved for test records. A reference is never reused or changed.

Each client has one property. If the same person has a second home, it becomes a second client record, told apart by its property name or address. The form warns when a client with the same name already exists.

The client record is the hub, with tabs for Overview, Tests, Visits, Samples and Report:

- **Tests.** When a client is created, tests are allocated in one of three ways: everything (the usual choice, all 24), from a service, or ticked individually. Allocation can be changed at any time. Recording data for a test that was not allocated allocates it automatically, so saved data is never left out.
- **Visits.** On-site capture works room by room. Rooms come from a standard set (main bedroom, bathroom, kitchen, living room) and can be added or duplicated.
- **Readings and samples are saved to storage as they are captured,** each carrying the client reference, the test and the room. Sample references extend the client reference: EG-100-W01 is the first water sample for EG-100.
- **Report.** The report reads the client's data back from storage. The client record itself only needs to show each test's status: planned, measured, awaiting laboratory results and so on.

The **Home** page summarises work across all clients.

### Navigation

One menu, in this order:

- **Home**
- **Clients:** Client and property (the current client's record), Client list (sorted by name)
- **Assessment:** Overview, Visit details
- **Part A: EMF:** A1 Screening, A2 Mattress grid, A3 Low-frequency fields, A4 Dirty electricity, A5 Radio frequency, A6 Plug loads and local sources, A7–A8 Body voltage and circuit investigation, A9 Outdoor EMF
- **Part B: Light, air, moisture and room condition:** B1 Light, B2 Air, climate and noise, B3 Moisture and damp, B4 Room condition and materials, Findings and priorities, Further observations
- **Part C: Outdoor air, damp and defects:** C1 Outdoor air and noise, C2 Outdoor damp and defects, C3 Outdoor observations
- **Settings:** Room templates, Equipment register, Reference library, Services and tests, Assessors and access, Client experience, Data and storage

On desktop (1200 pixels and wider) the menu sits down the left-hand side. On tablet and phone it is hidden behind a menu button and slides in. Parts A, B and C fold open and closed; the part holding the current page opens automatically.

### Assessment sheets

The Assessment section follows Emerald Grey's paper form, *Healthy Bedroom Assessment: Room by Room Data Collection* (`docs/Bedroom_Assessment_Measurements_and_Observations.docx`). Each section of the form is a page with the same tick boxes, the same tables (rows and columns in the same order) and the same observation boxes. Tables with open-ended rows on paper (sockets, devices, breakers, lamps) can have rows added.

- **Client and room.** Each page starts with a choice of client (sorted by name) and room. Room sections are saved for that room. A9 and Part C are saved once for the whole property.
- **Saving.** Each section is saved as one record per client and room as it is typed, with the time and the assessor. The Overview shows which sections have been started for the chosen room.
- **Results.** Numbers on the sheets become results for the client record and report, linked to the matching SBM-2024 point. Three-axis magnetic readings (X, Y, Z) are combined into a resultant. The two RF band peaks are added to give the combined peak. Body-voltage steps and breaker readings are recorded as before or after a change.
- **Words.** Written observations, and the findings and priorities, are carried into the report as written.

The same evaluation rules apply as everywhere else:

- SBM sleeping-area guidance only classifies bedroom readings.
- Radio frequency is classified on the combined peak. Each band on its own, and RMS values, are not classified.
- Screening instruments (the VOC screener and the sound app) are never classified automatically.

Every assessment page from A1 to C3 ends with the same bar: Back to the previous section and Next to the following one, each named, in the order of the paper form, with Overview between them. C3 finishes with a button back to the overview.

### A4. Dirty electricity: room by room

A4 has no room selector and no units choice: readings are always in mV p-p. The page works through one room at a time. Each bedroom has its own section, headed with the room name, with three measurement points: Bed head, left; Bed head, right; and General. Rooms with a single point (kitchen, living room and so on) are listed together under Other rooms as one compact row each. Every row has a time field with a Now action and a reading field; on a phone each row stacks, with the measurement point above its time and reading. Every control carries its full name for screen readers, for example "Master bedroom, bed head left, reading in mV p-p". Suspected devices and other locations follow in their own table, with Add a row. Each reading is saved against the room it belongs to, so it appears under that room in the client record and report.

Every time field on the assessment sheets has a Now action that fills in the current time for immediate logging.

### A5. Radio frequency: two band tables

Units are µW/m² or mW/m² (V/m is not offered on A5). There are two tables, 700 MHz to 2.6 GHz and 2.4 GHz to 6 GHz, each with one row per rest area (Bed by default, with Add a row) and the columns Rest area, Peak, North, East, South, West and 3D resultant. The resultant is √(N² + E² + S² + W²), calculated as the four directions are entered and never typed. The source on and off table follows unchanged. A5 shows no equipment-coverage panel; the meters and their ranges are kept in the equipment register.

### A6. Plug loads and local sources

One row per device, in the order Device, Electric field (V/m), Magnetic field (nT), Position to bed, On, off or standby, Distance (<5 cm, 15 cm or 15 cm+), Time and Notes. Selecting an electric- or magnetic-field cell opens the same large number pad as A2 and A3; after the electric field it moves straight to the magnetic field for that device if it is still empty. Each device is shown as a card rather than a wide table row, with every field labelled inside the card, so nothing scrolls sideways on a phone or tablet; on a phone the card uses two columns, with time and notes full width.

### A7–A8. Body voltage and circuit investigation

A7 and A8 are one connected page following the Building Biology Institute (BBI) method: an all-relevant-breakers-off baseline, then one circuit on at a time. The protocol is not displayed as a banner but is saved with every measurement (BBI, or supplementary for the breaker-off comparison).

**People.** The room comes from the room selector. One or more people are added, with name and side of the bed. When several people are tested, the number pad moves to the next person under the same condition before the condition changes.

**BBI steps.** 1 Normal starting reading. 2 Relevant room devices on, then local devices unplugged. 3 BBI baseline, all relevant breakers off, with a record of any essential circuit that could not be switched off; the starting reading is never used as the baseline. 4 and 5 One circuit at a time: the page shows the breaker number and name and "Switch ON breaker [number]: [name]. Keep all other tested breakers OFF.", every person is measured, and the measured change from the BBI baseline appears. Previous breaker and Next breaker move one circuit back or forward; readings are saved as they are confirmed. The circuit list (Lights 1 and 2, Sockets 1 and 2, Cooker, Hob, Boiler, Heating, EV charger, Solar PV, Alarm, Refrigeration, and any number more) can be renamed, renumbered, extended or trimmed. 6 Results table for the selected person, ranked by change: Circuit, BBI all-off baseline, Circuit on, Change from baseline. 7 Final overnight configuration: tick the circuits switched off overnight, measure everyone, and record circuits on, off and essential circuits retained, the changes from the starting reading and from the baseline, whether the arrangement is practical, and notes.

**Separate measurements.** "Body voltage while intentionally grounded" is optional and kept apart from the baseline, the final configuration and the circuit results. The supplementary breaker-off comparison is optional, labelled as not the BBI protocol, and has its own table. The summary lists each condition per person and which protocol, or both, was used.

**Completion.** "Save and continue to the next assessment section" becomes available once the BBI steps (or the breaker-off comparison) are recorded. There is no separate restoration checklist. The button is always available: if something required is missing, a message lists each gap by step and person (normal starting reading, BBI baseline, a reading for every listed circuit, final overnight configuration), with a link that jumps to the first empty reading. A short line under the button states what is required.

### A9. Outdoor EMF

RF units are µW/m² or mW/m². One "Time of readings" field with a Now action sits beside the units, as the four sides are measured in quick succession. Each side (north, east, south, west) is a card with 700 MHz to 2.6 GHz, 2.4 GHz to 6 GHz, electric field (V/m), magnetic field (nT) and notes. Each reading opens the large number pad, which shows the unit in use; confirming closes the pad so the assessor chooses the next field. The nearby sources table is unchanged.

### B2. Air, climate and noise

A single Time field with a Now action sits beside "Door and window state at the start". Air and climate start with one reading point for the room (CO₂, temperature, relative humidity, HCHO and TVOC); its location label is optional and, if left blank, results carry the room name. Noise also starts with one row. Each has Add a row, with an editable location, for any secondary location. Air and noise locations show as cards, so nothing scrolls sideways.

**Particle counter upload.** The Temtop particle counter logs one-minute samples on site (date, time, PM2.5, PM10, TSP, 0.3, 0.5 and 1.0 µm particle counts per litre, temperature and humidity), and its CSV file is uploaded on the B2 page afterwards. The file carries times but no rooms and may contain other visits, so it is split into sessions: a new session starts after a gap the assessor chooses (2 minutes by default, or 5, 10 or 30) or on a new date. Each session shows its date, times, number of samples, average PM2.5 and whether it falls on the visit date recorded on Visit details. The assessor assigns each session to one of the client's rooms, with an optional location, or leaves it unassigned so it is not imported; one button assigns every visit-date session to the current room. Only assigned sessions are saved, one record per client and session with every sample kept, and uploading the same file again updates those records instead of duplicating them. The B2 page shows each saved session for the room with averages, and maximums for PM2.5, PM10 and TSP; the averages and PM maximums feed the client record and report. A file without DATE, TIME and PM2.5 columns is refused with an explanation.

The client and room selector at the top of each assessment page shows only the two dropdowns; the reference, address and the Open record, Rooms and New client links are not shown there.

### A2. Nine-point mattress test: guided entry

A2 replaces typing into small table cells with guided entry, built for a tablet. The page has these parts:

- **Client, room and mattress size.** The client, a room from Master bedroom, Bedroom 2, Bedroom 3 and Bedroom 4, and the mattress size: Single (90 × 190 cm), Small double (120 × 190 cm), Double (135 × 190 cm), King (150 × 200 cm), Super king (180 × 200 cm) or Emperor (PSCL special size, approx. 213 × 198 cm). The size is kept with the bedroom on the client profile, filled in automatically next time, and saved with each test.
- **Three tests, kept as separate records.** Potential-free AC electric field (V/m), ground-referenced AC electric field (V/m) and AC magnetic field (nT). The potential-free and ground-referenced labels apply only to electric fields.
- **A map of the mattress.** The nine positions, each showing Not started, In progress, Complete or Not measured in words and symbols, with the current position highlighted.
- **One large number field.** It names the position, axis and unit, for example "Top left · X-axis, V/m". Selecting it opens a large dial pad.

**The dial pad**

- Keys for 0 to 9, a decimal point and Delete, plus Back, Cancel, Clear and Not measured.
- A large "Confirm and continue" button in the bottom right. It stays unavailable until a valid number or Not measured is chosen.
- Zero, whole numbers and decimals are accepted. Letters, negative values and a second decimal point cannot be entered, and an empty field is never treated as zero.

**Order of entry.** Readings go X, Y, Z at each position, from Top left to Bottom right: 27 readings in all. After each Z the app shows the three values and the 3D resultant, √(X² + Y² + Z²), then moves on to the next position. The resultant is always calculated, never typed. Progress shows as "Position 4 of 9" and "10 of 27 readings complete".

**Saving.** Every confirmed number is saved immediately with the client, property, visit, room, bed or mattress, test, method, position, axis, value, unit, assessor and time. Returning to a test reopens it at the first incomplete reading.

**Corrections.** Back reviews the previous reading without deleting it. Selecting a saved value shows it in the large field. Changing it requires "Confirm change", recalculates the resultant, and keeps the old value, new value, assessor and time in the history.

**Completion.** After the final reading the page shows "Nine-point mattress test complete. Review the measurements before continuing." with three buttons: Review measurements, Amend a measurement, and Save and continue to next section (the primary button). The completed results table is then saved to the client's assessment record. Starting a new test keeps the earlier one, which can still be viewed.

**Results on the mattress.** The mattress is drawn to the proportions of the chosen size, with the nine points as a heatmap in the colours of Emerald Grey's evaluation chart: green (no anomaly), olive green (slight), orange (severe) and red (extreme). Each point shows the 3D resultant and its rating in words, and a key gives the bands for the test's unit. Selecting a point opens its X, Y and Z readings for review or amendment. Earlier tests are still shown as tables of Mattress position, X, Y, Z and 3D resultant.

### A3. Low-frequency fields: guided mapping

A3 records AC electric-field strength in V/m with the ME3951A, as two guided tests that use the same large number field, dial pad, confirmation button and automatic saving as A2.

Before the first reading the assessor records the start time and the frequency or filter setting (5 Hz to 400 kHz, 16 Hz, 50 Hz to 400 kHz, or 2 kHz to 400 kHz). Entry stays closed until both are set, with the reminder to keep the method, meter orientation, height, distance from the wall and room conditions consistent throughout.

**Test A, wall mapping.** Walls are taken clockwise from north. On each wall the assessor stands inside the room facing it and measures at about 25%, 50% and 75% of its length, from their own left to right: twelve positions, each read as X, Y and Z (36 readings). No room dimensions are needed. The room outline is a plain square used only for orientation and progress, and its markers follow the assessor's viewpoint, so 25% sits at the left of the north wall, the top of the east wall, the right of the south wall and the bottom of the west wall. Marker colours describe data entry, not exposure: grey not started, orange in progress, green complete, red requires attention, each with its own symbol so colour is never the only cue. When West 75% is complete the page pauses with a summary and three choices; the room-centre test never starts on its own.

**Test B, room centre.** Standing at the centre, the assessor records X, Y and Z facing north, east, south and west (12 readings), shown as four arrows that turn green as each direction is completed.

**Calculation and summaries.** Each 3D resultant is √(X² + Y² + Z²), calculated only when all three axes hold a number, saved at full precision and shown to one decimal place. The axes are never averaged. Wall mapping reports the highest resultant with its wall and position, the lowest, the average of completed positions and the number complete and incomplete; the room-centre test reports the highest with its direction, the lowest and the average.

**Heatmap.** Beside the room outline, a small square heatmap colours each wall position where it was taken and the room centre by its highest direction, using the same green, olive, orange and red as A2 and the SBM potential-free bands. It shows no numbers and is indicative only; it fills in as each resultant is confirmed.

**Validation and flags.** Zero, whole numbers and decimals are accepted; negatives, letters and a second decimal point are not, and a blank is never treated as zero. Not measured (with an optional reason), Below detection limit and Instrument overload are recorded as flags, and a position holding a flag shows as requiring attention with no resultant.

**Saving.** Each confirmed reading is saved at once against the client, property, visit, room, test, method, wall or centre, position or direction, axis, raw value, unit, meter, filter, time and assessor, with any later amendment kept in the reading's history. A confirmed result changes only through Amend measurement. Reopening A3 returns to the first incomplete reading, and starting a new test keeps earlier ones. "Save and continue to the next assessment section" records completion and moves to A4.

### Client profile: bedrooms

The client profile lists Master bedroom, Bedroom 2, Bedroom 3 and Bedroom 4, each with who sleeps there, the bed or mattress and the mattress size. All fields may be left blank. The mattress size can be set here or on the A2 page; both show the same value.

### On-site capture

On-site capture lists a fixed set of rooms: Master bedroom, Bedroom 2, Bedroom 3, Kitchen, Living room, Dining room, Bathroom, Cloakroom, Loft and Garage. The same list is used by the room picker on every assessment page and in the reading and sample forms, so a room chosen in one place is the room shown in the other. If a client already has results in a room outside this list, that room is listed underneath so nothing saved is hidden.

Choosing a room shows **Tests in this room**: every assessment section in two columns, each marked Measured or Incomplete with a short note (number of entries, or how many of the three mattress tests are complete). A2 is marked "Not used here" outside bedrooms. A9 and Part C are marked "whole property". Selecting an assessment opens its page with the client and room already chosen.

### Room templates

The room templates below describe the home on the client record. On-site capture and the assessment pages use the fixed room list above.

- **Template 1:** living room, kitchen, ground floor bathroom, upstairs bathroom and one bedroom.
- **Template 2:** the same rooms with two bedrooms.
- **Template 3:** the same rooms with three bedrooms.

A template is chosen when a client is created and can be applied again from the client record. Applying a template keeps any room that already holds results.

## 4. Users and permissions

| Role | Who | Can do |
|---|---|---|
| Owner | Iza | Everything an assessor can, plus manage users, packages, reference library and retention settings |
| Assessor | Iza, Alfie | Work on any assigned client record, capture data, draft and approve findings, publish reports |
| Client | Household members | See only their own published reports, photographs, action plan and messages; complete questionnaires; mark actions done; upload progress photos; ask questions |

Internal notes, research notes, draft findings, unpublished report versions and other clients' records are never reachable from a client account. This is enforced on the server (row-level security), not only hidden in the interface.

Optional wellbeing information (sleep, allergies, sensitivities) is held in a separate table with field-level encryption, readable only by assessors assigned to that client, recorded only with explicit consent, and every read is logged.

## 5. Assessment structure

The structure follows the Standard of Building Biology Testing Methods, starting with SBM-2024. Editions are versioned so a later edition can be added without changing past assessments.

**A. Fields, waves and radiation:** A1 AC electric fields and body voltage; A2 AC magnetic fields; A3 radio-frequency radiation; A4 static electric fields; A5 static magnetic fields; A6 radioactivity and radon; A7 geological disturbances (measured); A8 sound and vibration; A9 lighting.

**B. Indoor pollutants and climate:** B1 formaldehyde and other gases; B2 solvents and other VOCs; B3 pesticides and other SVOCs; B4 metals and similar; B5 particles and fibres; B6 indoor climate.

**C. Fungi, bacteria and allergens:** C1 mould, spores and metabolites; C2 yeasts; C3 bacteria; C4 allergens.

**Supporting modules:** S1 water quality; S2 moisture investigation; S3 building defects; S4 materials; S5 ventilation.

Service packages pre-select points. The prototype uses the services named in the brand guidelines: Home Health Analysis (the full in-home visit, led by Alfie and supported by Iza), a bedrooms-only scope of the same analysis, and Build and Renovation Consultancy (measure before renovation, then test again afterwards). The exact point selection for each is a suggestion for Emerald Grey to confirm. Each visit copies that selection and can then be adjusted point by point. Every module supports both our own measurements and specialist or laboratory investigations.

## 6. Screens in the first design

| Screen | Device | Purpose |
|---|---|---|
| Clients | Desktop | Every client record, search, New client with automatic references from EG-100 |
| Client record | Desktop | Overview, Tests (allocation and status), Visits (rooms), Samples, Report (data available from storage) |
| Today | Desktop | Upcoming visits, recently added clients, outstanding laboratory results, reports awaiting review, client follow-ups |
| Pre-visit questionnaire | Phone | Concerns, rooms to investigate, home details, routines, optional wellbeing section with consent, document upload |
| On-site capture | Tablet | Room list with progress, point status, room-specific prompts, quick and dictated notes, readings with full context, photographs, samples, findings |
| Bedroom measurement grid | Tablet | Nine-point mattress grid, potential-free and earthed electric-field methods kept apart, body voltage, three-axis magnetic readings with resultant, RF peak and RMS with instrument frequency coverage, before-and-after comparison, room plan with readings, sources and photographs |
| Finding and recommendation editor | Desktop | Linked evidence, what we found, why it matters, what you can do, cost range, specialist need, priority, reusable explanations, reference criteria panel, conflicting-edit resolution |
| Report preview | Desktop | Branded report, pre-publication checklist (draft findings, outstanding results, scope review, frozen reference set), version history |
| Client portal | Phone | Where to begin, full action plan by priority, mark actions done, progress photos, report download and online reading, questions |
| Equipment register | Desktop | All 18 named devices, kits and apps and 4 additional methods by category, with parameters, default result class, checks, details to confirm, limitations and usage guidance |

## 7. Measurement capture

- **Equipment register** (seeded from `model/equipment-register.ts`, updated 23 October 2026) lists 8 categories, 18 named devices, kits and apps, and 4 additional methods. Each entry records its parameters and units, frequency coverage where relevant, serial number, default result class, required checks (calibration, bump test, batch and expiry), details still to confirm, and limitations that travel with every result. Serial numbers and check records are added by the team and are never pre-filled.
- **Gas detector.** The Honeywell BW Flex 4 needs a bump test logged before each visit; readings without one are flagged. Its readings always carry the note that it does not replace a qualified gas-safety investigation.
- **Electric fields** are measured with the ME3951A using the earthed method, and evaluated only against the earthed-method reference entry. Potential-free readings have their own method and reference entry, ready if a potential-free meter is added.
- **Bedroom grid** uses nine fixed positions (head, middle, foot by left, centre, right). Positions not measured are drawn hatched and labelled "Not measured".
- **Magnetic fields** store X, Y and Z; the resultant is calculated, never typed.
- **RF** stores the detector (peak or average) and which meters were used. The HF38B (about 700 MHz to 2.7 GHz) and HFW35C (about 2.4 to 6 GHz) together cover about 700 MHz to 6 GHz. Sources outside that range (FM, DAB, TETRA, Wi-Fi 6E) produce an automatic caveat on the finding and report.
- **Before and after** readings share a comparison group with a description of the change (for example "circuit 7 switched off at consumer unit"). Repeat visits link to the earlier visit so comparable readings appear side by side.
- **CSV import** accepts logger exports (the Aranet4 first), maps columns to quantities, previews the series and saves it as overnight monitoring linked to a room and instrument.
- **Room templates**: a room's structure (points, prompts, measurement positions) can be duplicated without its readings.

## 8. Samples and laboratory results

Each sample has a unique reference built from the client reference, a type letter and a sequence (`EG-100-W01`), room, point, matrix, collection location, method and equipment, date and time, laboratory (or "On-site screening") and status (planned, collected, deployed, at laboratory, result received, reviewed). Water samples record the outlet, hot or cold supply, filtered or unfiltered, and first-draw or flushed. On-site strip results are indicative; any lead, copper or iron indication prompts a bottle sample for accredited laboratory analysis, linked to the screening sample it confirms. Mould swab and dust results are interpreted alongside moisture, ventilation, visible conditions and building history, never alone. Laboratory reports attach to the sample, and results become measurements of type "Laboratory analysis". Outstanding samples appear on the dashboard and in the report checklist, and are listed in any interim report as awaiting results.

## 9. Reference library

Entries belong to a named, versioned reference set (for example "SBM-2024 / UK 2026.1"). Each entry records source, edition, quantity, unit, method, detector, applicable conditions, and either bands or a single limit. An entry must be verified against its source by a named person before it can classify anything. When a report version is issued, its reference set is frozen and stored with the version.

The values in the prototype are placeholders for interface design. Every entry will be confirmed against the licensed SBM-2024 evaluation guidelines and current UK guidance before release.

## 10. Reports and versioning

The report builder assembles approved findings into a branded PDF and an accessible online report from the same content: executive summary, scope and limitations (including points not included and not accessible), room-by-room findings, supporting evidence, measurement tables with their reference criteria, and a prioritised action plan. Each recommendation states what we found, why it matters, what the client can do, the likely cost range and whether specialist help is needed.

Publishing is blocked until every finding is approved, the scope has been reviewed and the reference set is confirmed. Outstanding laboratory results do not block publication but are listed clearly, which allows an interim report. Issued versions are immutable snapshots with a checksum; corrections create a new version.

## 11. Offline working, synchronisation and shared editing

- The tablet app is an installable progressive web app that stores everything for the open visit on the device (IndexedDB), including photographs, so a full visit can be completed without signal.
- Every edit saves automatically on the device within a second. A visible status shows "All changes synced", "Saving" or "Offline, N changes waiting to sync".
- Records carry a server version number. When two assessors change the same field, the server keeps both versions and the editor asks which to keep; nothing is silently overwritten. Presence indicators show who is working in which room.
- Every change records who made it and when, and earlier values are kept in history.

## 12. Security and data handling

- Assessors sign in with passkeys or password plus multi-factor authentication. Clients sign in with passkeys or email magic links; sessions on shared devices expire.
- Data is hosted in the UK, encrypted in transit and at rest. Wellbeing fields use additional field-level encryption.
- Files live in private storage and are served only through short-lived signed links.
- Daily encrypted backups with point-in-time recovery; a restore is tested each quarter.
- Audit log of sign-ins, sensitive reads, publication, exports and permission changes.
- UK GDPR: lawful basis recorded per client; explicit consent for wellbeing information, withdrawable from the portal; retention schedule with automatic review; data export and deletion on request; data processing agreements with laboratories and hosting providers.

## 13. Recommended technology for the first release

A single TypeScript codebase: a React progressive web app for both experiences, a PostgreSQL database with row-level security, object storage for files, and server-side PDF rendering from the same HTML templates used for the online report. A managed platform hosted in a UK or EU region keeps operations light for a small team. The domain model in `model/domain.ts` and the evaluation rules in `model/evaluation.ts` are the starting contract.

## 14. Release plan

**Release 1: capture, report, portal.** Client and property records, questionnaire, visit scope, room assessment, bedroom grid, instruments, samples, offline sync, finding editor, reference library, report builder and publishing, client portal with action plan and questions.

**Release 2: depth.** Room plan drawing tools, CSV import for further logger formats, repeat-visit comparison views, laboratory result import, reusable explanation library management, calendar integration.

**Release 3: refinement.** Analytics across assessments (internal only), additional SBM editions, client reminders for action plans.

## 15. Open questions for Emerald Grey

1. Serial numbers and calibration dates for each instrument, the body-voltage multimeter model, the radon detector model, the INKBIRD model and the gas detector's sensor configuration.
2. Which laboratories do you use, and do any provide results in a structured format?
3. Should clients see the SBM category names, plain-language labels, or both?
4. How long should records be retained after the final visit?
5. Do you want a single shared calendar, or integration with an existing one?
