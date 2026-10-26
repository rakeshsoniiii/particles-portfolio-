# Reverse-engineering findings and verification ledger

## Output and scope

One local application at the workspace root, with six captured routes listed in `routes.json`. No prior application routes existed. The five supplied reference repositories remain unchanged.

The Ponytail decision was to reuse the shipped client runtime instead of approximating the site's custom GLSL effects. This departs from the clone-template's suggested editable Next.js rebuild: the deliverable is a runnable local browser-build capture. Original component source and server source were not recovered.

## Reference workflows used

- `clone-website-by-ai`: asset discovery, route inventory, appearance/behavior inspection and validation checklist.
- `agency-agents`: frontend engineering and interaction audit guidance.
- `awesome-design-md`: explicit design-token documentation in root `DESIGN.md`.
- `anime`: animation timing/easing reference; no additional animation library was added because the original renderer is preserved.
- `rea`: actual CLI static analysis of the captured JavaScript, with raw evidence retained.
- Ponytail: dependency-free local server and focused runnable checks.

## Static observations from the captured application

The source bundles contain a session-gated loader (`preloader-shown`), particle rendering, Lenis scrolling, and Next client routing. The loader sequence forms a ring, counts to 100, then morphs into the portrait. The code's intended unlock is approximately 8.4 seconds and overlay removal approximately 9.1 seconds; these are static timing findings, not a measured local performance guarantee.

Scroll stages transform portrait → globe → Italy → waveform, followed by the work track, closing spiral and contact outline. Four videos become Three.js textures on deforming meshes. Project click code waits for a roughly 400 ms exit before pushing `/projects/{slug}`. These are source-inspection findings; the full local sequence has not yet been visually verified.

Original browser observations confirmed the portrait hero, introductory statement, seven main sections, and email/LinkedIn/footer links. The local browser reached the loader with no warning/error logs captured at that point. A desktop emulation attempt produced an unreliable screenshot and is not counted as desktop validation; its override was cleared.

## REA evidence

REA 6.8.0 CLI completed focused static analysis of `1stl4ykwpf_a2.js`, `1tzay28hfjym9.js`, and `0w7o8fu3bnjrw.js`.

- Parent evidence: `ev_a4cef3041ec790167d3a48fbad7a33273109810bbd273170d87cc88e2ceb613b`.
- Summary evidence: `ev_f594eefad24beb6a008f35f6cfca0f3a1cccbd5a1d3e2328eed44eefe3d0cffe`.
- Raw evidence: `rea/application-evidence.json`.
- Summary: `rea/application-summary.json`.
- Registration diagnosis: `rea/doctor.json`; no MCP configuration was changed.

Limitations: ten inventoried sources were excluded from semantic analysis; the 20,000 semantic-node-per-file ceiling was reached; alias expansion was bounded; graph coverage is incomplete, with 10 application unknowns and 14,878 semantic unknowns reported. Analysis treated code as inert text and does not prove runtime behavior. The CLI completed despite a warning that the installed Node version is below its declared minimum.

## Checks and remaining work

- PASS: six HTML routes and six captured Flight responses.
- PASS: referenced script/style/font dependencies and particle/video assets are served locally.
- PASS: video byte-range responses, invalid-range handling, missing routes, path traversal rejection and method restriction.
- PASS: build copies 46 files, approximately 32.8 MB, with a SHA-256 manifest.
- PASS: preview server responds at `http://127.0.0.1:3000`.
- PENDING: complete loader-to-footer visual sweep, project clicks/back navigation, hover effects and mobile/tablet/desktop comparison.

Browser control returned “Local browser use is disabled in Work settings” on the resumed verification pass. The pending visual checks require enabling that setting; no attempt was made to bypass it.
