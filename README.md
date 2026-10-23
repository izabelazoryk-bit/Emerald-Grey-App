# Emerald Grey Healthy Home Assessment

A bespoke app for Emerald Grey that brings together on-site data collection, professional report writing and a secure client portal, following the Standard of Building Biology Testing Methods (SBM-2024).

## What is here

| Path | Contents |
|---|---|
| `prototype/index.html` | Connected, clickable screen designs for the first release. A single page with no installation; the report cover uses `prototype/assets/emerald-grey-logo.jpg`. |
| `brand/emerald-grey-logo.jpg` | The Emerald Grey logo. The app redraws the house-and-plant mark as a vector for small sizes. |
| `docs/product-specification.md` | Scope, principles, screens, data handling, security and release plan. |
| `model/domain.ts` | Domain model: clients, properties, visits, rooms, measurements, samples, references, findings, reports. |
| `model/evaluation.ts` | Shared evaluation rules, including when a reading may be classified. |
| `model/equipment-register.ts` | The equipment register (23 October 2026) as seed data: 18 named devices, kits and apps and 4 methods. |

## Viewing the prototype

Open `prototype/index.html` in any modern browser. The bar at the top moves between the nine screens, and each screen opens in its intended device frame (desktop, tablet or phone). The device buttons switch frames to show how a screen adapts.

Screens can be linked directly by name: `#dashboard`, `#profile`, `#questionnaire`, `#room`, `#bedroom`, `#finding`, `#report`, `#equipment`, `#portal`.

Things to try:

- **Room assessment:** switch rooms, choose "Simulate offline" and type a note to see changes wait for sync, then reconnect. Open "Import CSV" to preview an overnight logger file.
- **Bedroom grid:** move between the electric-field methods, body voltage, three-axis magnetic and RF; compare before and after; select markers on the room plan.
- **Finding editor:** resolve Alfie's conflicting edit, insert a reusable explanation, approve findings.
- **Report preview:** publishing stays locked until every finding is approved and the checks are confirmed.
- **Equipment register:** select an entry to see its checks, details to confirm and limitations, such as the gas detector's bump test and the guidance on when to use lead swabs.
- **Client portal:** mark actions done, add a progress photo, ask a question.

All client details in the prototype are fictional. Reference values are placeholders for design review and must be confirmed against the licensed source documents before release.
