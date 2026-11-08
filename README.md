# Emerald Grey Healthy Home Assessment

A bespoke app for Emerald Grey that brings together on-site data collection, professional report writing and a secure client portal, following the Standard of Building Biology Testing Methods (SBM-2024).

## What is here

| Path | Contents |
|---|---|
| `prototype/index.html` | Connected, clickable screen designs for the first release. A single page with no installation; the report cover and questionnaire use `prototype/assets/emerald-grey-logo-forest.png`. |
| `brand/EmeraldGrey_BrandGuidelines_v3.pdf` | Brand guidelines, v3 (November 2026). |
| `brand/emerald-grey-logo.jpg` | The logo as supplied, cream on forest. |
| `brand/emerald-grey-logo-forest.png`, `-cream.png` | Forest and cream colourways on transparent backgrounds, made from the supplied logo for use on light grounds and forest panels. |
| `docs/brand-application.md` | How the brand guidelines apply to the app: palette, type, logo use, accessibility adjustments. |
| `docs/product-specification.md` | Scope, principles, screens, data handling, security and release plan. |
| `model/domain.ts` | Domain model: clients, properties, visits, rooms, measurements, samples, references, findings, reports. |
| `model/evaluation.ts` | Shared evaluation rules, including when a reading may be classified. |
| `model/equipment-register.ts` | The equipment register (23 October 2026) as seed data: 18 named devices, kits and apps and 4 methods. |

## Viewing the prototype

Open `prototype/index.html` in any modern browser. The menu moves between Home, the client pages, the assessment sheets (following the paper form, Parts A to C) and the settings. "Preview width" at the foot of the menu shows the tablet and phone layouts on a desktop screen.

The menu runs down the left on desktop and sits behind the menu button on tablet and phone. Pages can be linked directly by name, for example `#dashboard`, `#clients`, `#client`, `#assess`, `#visit`, `#a2`, `#b3`, `#c1` or `#templates`.

The prototype opens on the Clients page. New clients, readings, samples and notes are saved: to shared storage on the published page, so Iza and Alfie see the same records, or to this browser when the file is opened locally. Please use test details only.

Things to try:

- **Clients:** choose New client, fill in a name and address, and the record is created as EG-100, then EG-101 and so on. Allocate tests, record readings from the Tests tab or on site, add a sample, then open the Report tab to see the data read back.
- **On-site capture:** switch rooms, choose "Simulate offline" and type a note to see changes wait for sync, then reconnect. Open "Import CSV" to preview an overnight logger file.
- **Bedroom grid:** move between the electric-field methods, body voltage, three-axis magnetic and RF; compare before and after; select markers on the room plan.
- **Finding editor:** resolve Alfie's conflicting edit, insert a reusable explanation, approve findings.
- **Report preview:** publishing stays locked until every finding is approved and the checks are confirmed.
- **Equipment register:** select an entry to see its checks, details to confirm and limitations, such as the gas detector's bump test and the guidance on when to use lead swabs.
- **Client portal:** mark actions done, add a progress photo, ask a question.

All client details in the prototype are fictional. Reference values are placeholders for design review and must be confirmed against the licensed source documents before release.
