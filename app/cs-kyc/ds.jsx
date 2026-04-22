
'use client';

export default function designSystem() {
    return (
        <div class="ds">

          <!-- HEADER -->
          <div class="tile t-header">
            <div class="hdr-eyebrow">Design system</div>
            <div class="hdr-title">RM Suite &nbsp;<span style="opacity:.4;font-weight:300">/</span>&nbsp; Credit Suisse IWM</div>
            <div class="hdr-sub">Mobile-first, biometrically secured. Designed to reduce context-switching for 1,140 Relationship Managers across 36 locations.</div>
            <div class="hdr-pills">
              <span class="hdr-pill">Android / Java</span>
              <span class="hdr-pill">Invision prototyping</span>
              <span class="hdr-pill">Nielsen's Heuristics</span>
              <span class="hdr-pill">MoSCoW prioritisation</span>
              <span class="hdr-pill">PACT analysis</span>
              <span class="hdr-pill">Agile sprints</span>
            </div>
          </div>

          <!-- COLOURS -->
          <div class="tile t-colours">
            <div class="lbl">Colour system</div>
            <div class="primary-swatch"><span>#003366 — CS Navy · Primary</span></div>
            <div style="margin-bottom:12px">
              <div class="ramp-row">
                <div><div class="ramp-stop" style="background:#E8EDF3"></div><div class="ramp-label">50</div></div>
                <div><div class="ramp-stop" style="background:#C5D1DF"></div><div class="ramp-label">100</div></div>
                <div><div class="ramp-stop" style="background:#8BA5C2"></div><div class="ramp-label">200</div></div>
                <div><div class="ramp-stop" style="background:#336699"></div><div class="ramp-label">400</div></div>
                <div><div class="ramp-stop" style="background:#003366"></div><div class="ramp-label">600</div></div>
                <div><div class="ramp-stop" style="background:#00224A"></div><div class="ramp-label">800</div></div>
              </div>
              <div style="font-size:9px;color:var(--color-text-tertiary)">Navy ramp — primary actions, headers, accents</div>
            </div>
            <div style="margin-bottom:12px">
              <div class="ramp-row">
                <div><div class="ramp-stop" style="background:#F4F6F9"></div><div class="ramp-label">50</div></div>
                <div><div class="ramp-stop" style="background:#E8EDF3"></div><div class="ramp-label">100</div></div>
                <div><div class="ramp-stop" style="background:#9AA3AE"></div><div class="ramp-label">300</div></div>
                <div><div class="ramp-stop" style="background:#5A6470"></div><div class="ramp-label">500</div></div>
                <div><div class="ramp-stop" style="background:#2C3340"></div><div class="ramp-label">700</div></div>
                <div><div class="ramp-stop" style="background:#111111"></div><div class="ramp-label">900</div></div>
              </div>
              <div style="font-size:9px;color:var(--color-text-tertiary)">Neutral ramp — text, borders, surfaces</div>
            </div>
            <div class="semantic-row">
              <div class="sem">
                <div class="sem-top" style="background:#1A7A4A;border-radius:4px 4px 0 0"></div>
                <div class="sem-lbl">Success</div>
              </div>
              <div class="sem">
                <div class="sem-top" style="background:#C0392B;border-radius:4px 4px 0 0"></div>
                <div class="sem-lbl">Danger</div>
              </div>
              <div class="sem">
                <div class="sem-top" style="background:#E8960A;border-radius:4px 4px 0 0"></div>
                <div class="sem-lbl">Warning</div>
              </div>
              <div class="sem">
                <div class="sem-top" style="background:#1B6CC8;border-radius:4px 4px 0 0"></div>
                <div class="sem-lbl">Info</div>
              </div>
            </div>
          </div>

          <!-- TYPOGRAPHY -->
          <div class="tile t-type">
            <div class="lbl">Typography scale</div>
            <div class="type-display">Aa<span class="type-accent">.</span></div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Display / 28px / 700</div>
              <div class="s-d">Dashboard</div>
            </div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Heading 1 / 20px / 500</div>
              <div class="s-h1">Today's tasks</div>
            </div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Heading 2 / 16px / 500</div>
              <div class="s-h2">Client reminders</div>
            </div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Heading 3 / 14px / 500</div>
              <div class="s-h3">Aims and objectives</div>
            </div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Body / 13px / 400</div>
              <div class="s-bd">Review insurance contract with Qi Su. Renew before Q4 deadline.</div>
            </div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Small / 11px / 400</div>
              <div class="s-sm">GBP £10m · Managed assets · Singapore</div>
            </div>
            <hr class="type-divider">
            <div class="type-row">
              <div class="type-spec">Caption / 10px / 500 caps</div>
              <div class="s-cp">Region · APAC · Recently viewed</div>
            </div>
          </div>

          <!-- BUTTONS -->
          <div class="tile t-btn">
            <div class="lbl">Buttons</div>
            <div class="btn-col">
              <div class="btn btn-p">Authenticate</div>
              <div class="btn btn-s">View portfolio</div>
              <div class="btn btn-g">Cancel</div>
              <div class="btn btn-d">Remove client</div>
              <div style="display:flex;gap:6px;margin-top:2px">
                <span class="btn-sm">+ Add task</span>
                <span class="btn-sm" style="background:var(--color-background-secondary);color:var(--color-text-secondary);">Filter</span>
              </div>
            </div>
          </div>

          <!-- INPUTS -->
          <div class="tile t-input">
            <div class="lbl">Form inputs</div>
            <div class="input-stack">
              <div>
                <div class="field-label">Client name</div>
                <div class="mock-input filled">Shreya Sujan</div>
              </div>
              <div>
                <div class="field-label">Reminder title <span style="color:#C0392B">*</span></div>
                <div class="mock-input focus">Review mortgage renewal</div>
              </div>
              <div>
                <div class="field-label">Deadline</div>
                <div class="mock-input error">DD / MM / YYYY</div>
                <div class="field-error">Deadline cannot be in the past</div>
              </div>
              <div>
                <div class="field-label">Region</div>
                <div class="mock-select">
                  <span>APAC</span>
                  <div class="chevron"></div>
                </div>
                <div class="field-hint">Filters client list and market news</div>
              </div>
            </div>
          </div>

          <!-- ICONS -->
          <div class="tile t-icons">
            <div class="lbl">Iconography</div>
            <div class="icon-grid">
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                </div>
                <div class="icon-name">Dashboard</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div class="icon-name">Client</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div class="icon-name">Trending</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="icon-name">Reminder</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div class="icon-name">Auth</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <div class="icon-name">Add</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div class="icon-name">Search</div>
              </div>
              <div class="icon-cell">
                <div class="icon-box">
                  <svg class="ico" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </div>
                <div class="icon-name">Menu</div>
              </div>
            </div>
            <div style="margin-top:10px;padding:8px;background:var(--color-background-secondary);border-radius:6px">
              <div style="font-size:10px;color:var(--color-text-tertiary);line-height:1.5">Stroke-based, 1.5px weight, rounded caps. 16px usage, 24px grid. Feather icon style.</div>
            </div>
          </div>

          <!-- SPACING -->
          <div class="tile t-spacing">
            <div class="lbl">Spacing scale</div>
            <div class="sp-row">
              <div class="sp-val">4px</div>
              <div class="sp-bar" style="width:12px"></div>
              <div class="sp-info"><div class="sp-name">XS</div><div class="sp-use">Icon gap, tight labels</div></div>
            </div>
            <div class="sp-row">
              <div class="sp-val">8px</div>
              <div class="sp-bar" style="width:24px"></div>
              <div class="sp-info"><div class="sp-name">SM</div><div class="sp-use">Inline elements</div></div>
            </div>
            <div class="sp-row">
              <div class="sp-val">12px</div>
              <div class="sp-bar" style="width:36px"></div>
              <div class="sp-info"><div class="sp-name">MD</div><div class="sp-use">Card internal gaps</div></div>
            </div>
            <div class="sp-row">
              <div class="sp-val">20px</div>
              <div class="sp-bar" style="width:60px"></div>
              <div class="sp-info"><div class="sp-name">LG</div><div class="sp-use">Tile padding</div></div>
            </div>
            <div class="sp-row">
              <div class="sp-val">32px</div>
              <div class="sp-bar" style="width:96px"></div>
              <div class="sp-info"><div class="sp-name">XL</div><div class="sp-use">Section separation</div></div>
            </div>
            <div class="radius-row">
              <div class="r-box">
                <div class="r-shape" style="border-radius:4px"></div>
                <div class="r-label">r4</div>
              </div>
              <div class="r-box">
                <div class="r-shape" style="border-radius:8px"></div>
                <div class="r-label">r8</div>
              </div>
              <div class="r-box">
                <div class="r-shape" style="border-radius:12px"></div>
                <div class="r-label">r12</div>
              </div>
              <div class="r-box">
                <div class="r-shape" style="border-radius:14px;width:42px;height:22px;margin-top:3px"></div>
                <div class="r-label">pill</div>
              </div>
            </div>
          </div>

          <!-- BADGES -->
          <div class="tile t-badge">
            <div class="lbl">Badges and tags</div>
            <div class="badge-section">
              <div class="badge-section-lbl">Status</div>
              <div class="badge-row">
                <span class="bdg bdg-green">Active</span>
                <span class="bdg bdg-red">Overdue</span>
                <span class="bdg bdg-amber">Pending</span>
                <span class="bdg bdg-gray">Inactive</span>
              </div>
            </div>
            <div class="badge-section">
              <div class="badge-section-lbl">Region</div>
              <div class="badge-row">
                <span class="bdg bdg-navy">APAC</span>
                <span class="bdg bdg-out">EMEA</span>
                <span class="bdg bdg-blue">AMER</span>
              </div>
            </div>
            <div class="badge-section">
              <div class="badge-section-lbl">Priority</div>
              <div class="badge-row">
                <span class="bdg bdg-red">High</span>
                <span class="bdg bdg-amber">Medium</span>
                <span class="bdg bdg-gray">Low</span>
              </div>
            </div>
            <div class="badge-section" style="margin-bottom:0">
              <div class="badge-section-lbl">Client type</div>
              <div class="badge-row">
                <span class="bdg bdg-navy">UHNWI</span>
                <span class="bdg bdg-out">HNW</span>
              </div>
            </div>
          </div>

          <!-- CLIENT CARD -->
          <div class="tile t-card">
            <div class="lbl">Client card</div>
            <div class="mock-card">
              <div class="mc-head">
                <div class="ava">SJ</div>
                <div style="flex:1">
                  <div class="mc-name">Shreya Sujan</div>
                  <div class="mc-sub">CEO · Sujan Enterprises</div>
                </div>
                <span class="bdg bdg-green" style="font-size:9px">Active</span>
              </div>
              <div class="mc-row">
                <span class="mc-k">Region</span>
                <span class="mc-v">APAC</span>
              </div>
              <div class="mc-row">
                <span class="mc-k">Assets</span>
                <span class="mc-v">GBP £10m</span>
              </div>
              <div class="mc-row">
                <span class="mc-k">Portfolio</span>
                <span class="mc-v-grn">+2.4% MTD</span>
              </div>
              <div class="mc-row">
                <span class="mc-k">Reminders</span>
                <span class="mc-v-red">2 overdue</span>
              </div>
            </div>
          </div>

          <!-- DASHBOARD MOCK -->
          <div class="tile t-card2">
            <div class="lbl">Dashboard component</div>
            <div class="dash-tile">
              <div class="dash-section-lbl">Today's tasks</div>
              <div class="task-row"><div class="task-circle done"></div><div class="task-text done">Review Qi Su annual report</div></div>
              <div class="task-row"><div class="task-circle"></div><div class="task-text">Dinner meeting with Shreya</div></div>
              <div class="task-row" style="border:none"><div class="task-circle"></div><div class="task-text">Call with IRS broker</div></div>
              <div style="margin-top:10px"></div>
              <div class="dash-section-lbl">Reminders</div>
              <div class="reminder-row">
                <div class="rem-dot" style="background:#C0392B"></div>
                <div class="rem-title">Renew mortgage</div>
                <div class="rem-time-red">35 mins</div>
              </div>
              <div class="reminder-row">
                <div class="rem-dot" style="background:#E8960A"></div>
                <div class="rem-title">Review insurance</div>
                <div class="rem-time">2 months</div>
              </div>
            </div>
          </div>

          <!-- PRINCIPLES -->
          <div class="tile t-principles">
            <div class="lbl">Design principles</div>
            <div class="principle-grid">
              <div class="pcard">
                <div class="p-num-box">1</div>
                <div class="p-title">Recognition over recall</div>
                <div class="p-desc">Visual client cards with photos, nationality flags, and occupations. Find a client by face, not by scrolling an alphabetical list.</div>
              </div>
              <div class="pcard">
                <div class="p-num-box">2</div>
                <div class="p-title">Security first</div>
                <div class="p-desc">Biometric fingerprint authentication gates every session. No client data surfaces before identity is confirmed.</div>
              </div>
              <div class="pcard">
                <div class="p-num-box">3</div>
                <div class="p-title">One surface, full picture</div>
                <div class="p-desc">Every screen is designed to eliminate a context switch, not add one. Tasks, clients, markets, and notes — one app.</div>
              </div>
              <div class="pcard">
                <div class="p-num-box">4</div>
                <div class="p-title">Brand continuity</div>
                <div class="p-desc">CS Navy, black, and white only. Bold typeface, no decorative elements. Consistent with Credit Suisse's existing visual language.</div>
              </div>
            </div>
          </div>

          <!-- MOTION & RADIUS -->
          <div class="tile t-motion">
            <div class="lbl">Motion and elevation</div>
            <div class="motion-row">
              <div class="motion-name">Instant</div>
              <div class="motion-bar-wrap"><div class="motion-bar" style="width:10%;background:#003366"></div></div>
              <div class="motion-val">0ms</div>
            </div>
            <div class="motion-row">
              <div class="motion-name">Micro</div>
              <div class="motion-bar-wrap"><div class="motion-bar" style="width:25%;background:#003366"></div></div>
              <div class="motion-val">100ms</div>
            </div>
            <div class="motion-row">
              <div class="motion-name">Transition</div>
              <div class="motion-bar-wrap"><div class="motion-bar" style="width:50%;background:#003366"></div></div>
              <div class="motion-val">200ms</div>
            </div>
            <div class="motion-row">
              <div class="motion-name">Screen</div>
              <div class="motion-bar-wrap"><div class="motion-bar" style="width:75%;background:#003366"></div></div>
              <div class="motion-val">300ms</div>
            </div>
            <div class="motion-row">
              <div class="motion-name">Entry</div>
              <div class="motion-bar-wrap"><div class="motion-bar" style="width:100%;background:#003366;opacity:.6"></div></div>
              <div class="motion-val">400ms</div>
            </div>
            <div style="margin-top:14px;border-top:0.5px solid var(--color-border-tertiary);padding-top:12px">
              <div style="font-size:10px;color:var(--color-text-tertiary);margin-bottom:8px">Easing — ease-out for entries, ease-in for exits</div>
              <div style="display:flex;gap:6px">
                <div style="flex:1;text-align:center">
                  <div style="height:28px;background:var(--color-background-secondary);border-radius:6px;border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center">
                    <div style="width:20px;height:20px;border-radius:50%;background:#003366;opacity:.8"></div>
                  </div>
                  <div style="font-size:9px;color:var(--color-text-tertiary);margin-top:4px">Rest</div>
                </div>
                <div style="flex:1;text-align:center">
                  <div style="height:28px;background:var(--color-background-secondary);border-radius:6px;border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center">
                    <div style="width:20px;height:20px;border-radius:50%;border:1.5px solid #003366"></div>
                  </div>
                  <div style="font-size:9px;color:var(--color-text-tertiary);margin-top:4px">Hover</div>
                </div>
                <div style="flex:1;text-align:center">
                  <div style="height:28px;background:var(--color-background-secondary);border-radius:6px;border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center">
                    <div style="width:16px;height:16px;border-radius:50%;background:#003366"></div>
                  </div>
                  <div style="font-size:9px;color:var(--color-text-tertiary);margin-top:4px">Pressed</div>
                </div>
              </div>
            </div>
          </div>

</div>

<style jsx>{`
*{box-sizing:border-box;margin:0;padding:0}
.ds{padding:16px 0;display:grid;grid-template-columns:repeat(12,1fr);gap:10px;font-family:var(--font-sans)}
.tile{background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:20px;overflow:hidden;position:relative}
.lbl{font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:14px}

.t-header    {grid-column:span 12;padding:24px 28px;background:#003366;border:none}
.t-colours   {grid-column:span 4;grid-row:span 2}
.t-type      {grid-column:span 8;grid-row:span 2}
.t-btn       {grid-column:span 3}
.t-input     {grid-column:span 5}
.t-icons     {grid-column:span 4}
.t-spacing   {grid-column:span 4}
.t-badge     {grid-column:span 4}
.t-card      {grid-column:span 4}
.t-card2     {grid-column:span 4}
.t-principles{grid-column:span 8}
.t-motion    {grid-column:span 4}

/* HEADER */
.hdr-eyebrow{font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:6px}
.hdr-title{font-size:26px;font-weight:700;color:#fff;letter-spacing:-.02em;line-height:1.1}
.hdr-sub{font-size:12px;color:rgba(255,255,255,.55);margin-top:6px}
.hdr-pills{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap}
.hdr-pill{font-size:10px;font-weight:500;padding:3px 10px;border-radius:20px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);border:0.5px solid rgba(255,255,255,.15)}

/* COLOURS */
.primary-swatch{height:80px;border-radius:8px;background:#003366;display:flex;align-items:flex-end;padding:10px 12px;margin-bottom:8px}
.primary-swatch span{font-size:11px;color:rgba(255,255,255,.65)}
.ramp-row{display:flex;gap:4px;margin-bottom:6px}
.ramp-stop{flex:1;height:22px;border-radius:4px}
.ramp-label{font-size:9px;color:var(--color-text-tertiary);text-align:center;margin-top:3px}
.semantic-row{display:flex;gap:5px;margin-top:4px}
.sem{flex:1;border-radius:6px;overflow:hidden}
.sem-top{height:20px}
.sem-lbl{font-size:9px;color:var(--color-text-tertiary);text-align:center;padding-top:3px}

/* TYPE */
.type-display{font-size:52px;font-weight:700;color:var(--color-text-primary);letter-spacing:-.03em;line-height:1;margin-bottom:12px}
.type-accent{color:#003366}
.type-divider{border:none;border-top:0.5px solid var(--color-border-tertiary);margin:8px 0}
.type-row{display:flex;align-items:baseline;gap:14px;padding:5px 0}
.type-spec{font-size:10px;color:var(--color-text-tertiary);min-width:110px;flex-shrink:0}
.s-d  {font-size:22px;font-weight:700;letter-spacing:-.02em;color:var(--color-text-primary)}
.s-h1 {font-size:18px;font-weight:500;color:var(--color-text-primary)}
.s-h2 {font-size:15px;font-weight:500;color:var(--color-text-primary)}
.s-h3 {font-size:13px;font-weight:500;color:var(--color-text-primary)}
.s-bd {font-size:12px;font-weight:400;color:var(--color-text-secondary);line-height:1.5}
.s-sm {font-size:11px;font-weight:400;color:var(--color-text-secondary)}
.s-cp {font-size:10px;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:var(--color-text-tertiary)}

/* BUTTONS */
.btn-col{display:flex;flex-direction:column;gap:7px}
.btn{padding:8px 14px;border-radius:6px;font-size:12px;font-weight:500;text-align:center;font-family:var(--font-sans);cursor:default}
.btn-p {background:#003366;color:#fff;border:none}
.btn-s {background:transparent;color:var(--color-text-primary);border:0.5px solid var(--color-border-primary)}
.btn-g {background:var(--color-background-secondary);color:var(--color-text-secondary);border:none}
.btn-d {background:#C0392B;color:#fff;border:none}
.btn-sm{padding:5px 10px;font-size:11px;border-radius:5px;background:#003366;color:#fff;border:none;display:inline-block}

/* INPUTS */
.input-stack{display:flex;flex-direction:column;gap:8px}
.field-label{font-size:10px;font-weight:500;color:var(--color-text-secondary);margin-bottom:3px}
.mock-input{height:34px;border-radius:6px;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);padding:0 10px;display:flex;align-items:center;font-size:12px;color:var(--color-text-tertiary)}
.mock-input.filled{color:var(--color-text-primary)}
.mock-input.focus{border-color:#003366;border-width:1px}
.mock-input.error{border-color:#C0392B}
.field-hint{font-size:10px;color:var(--color-text-tertiary);margin-top:2px}
.field-error{font-size:10px;color:#C0392B;margin-top:2px}
.mock-select{height:34px;border-radius:6px;border:0.5px solid var(--color-border-secondary);background:var(--color-background-primary);padding:0 10px;display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--color-text-primary)}
.chevron{width:10px;height:10px;border-right:1.5px solid var(--color-text-tertiary);border-bottom:1.5px solid var(--color-text-tertiary);transform:rotate(45deg) translateY(-2px)}

/* ICONS */
.icon-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.icon-cell{display:flex;flex-direction:column;align-items:center;gap:5px}
.icon-box{width:36px;height:36px;border-radius:8px;background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center}
.icon-name{font-size:9px;color:var(--color-text-tertiary);text-align:center}
svg.ico{width:16px;height:16px;fill:none;stroke:var(--color-text-secondary);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}

/* SPACING */
.sp-row{display:flex;align-items:center;gap:8px;margin-bottom:7px}
.sp-bar{background:#003366;height:5px;border-radius:3px;opacity:.8}
.sp-val{font-size:10px;color:var(--color-text-tertiary);min-width:28px;font-variant-numeric:tabular-nums}
.sp-info{display:flex;flex-direction:column}
.sp-name{font-size:11px;color:var(--color-text-primary);font-weight:500}
.sp-use{font-size:10px;color:var(--color-text-tertiary)}

/* BADGES */
.badge-section{margin-bottom:10px}
.badge-section-lbl{font-size:10px;color:var(--color-text-tertiary);margin-bottom:5px}
.badge-row{display:flex;flex-wrap:wrap;gap:5px}
.bdg{font-size:10px;font-weight:500;padding:3px 9px;border-radius:20px;display:inline-block}
.bdg-navy  {background:#003366;color:#fff}
.bdg-out   {background:transparent;color:var(--color-text-primary);border:0.5px solid var(--color-border-primary)}
.bdg-green {background:#E6F4EC;color:#155D38}
.bdg-red   {background:#FDECEA;color:#9B2A1E}
.bdg-amber {background:#FEF3E2;color:#7A4510}
.bdg-gray  {background:var(--color-background-secondary);color:var(--color-text-secondary)}
.bdg-blue  {background:#E6F0FB;color:#0C3E7A}

/* CARD MOCK */
.mock-card{background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:10px;padding:12px}
.mc-head{display:flex;align-items:center;gap:9px;margin-bottom:10px}
.ava{width:30px;height:30px;border-radius:50%;background:#003366;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;color:#fff;flex-shrink:0}
.mc-name{font-size:13px;font-weight:500;color:var(--color-text-primary)}
.mc-sub{font-size:10px;color:var(--color-text-secondary)}
.mc-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-top:0.5px solid var(--color-border-tertiary)}
.mc-k{font-size:10px;color:var(--color-text-tertiary)}
.mc-v{font-size:10px;font-weight:500;color:var(--color-text-primary)}
.mc-v-red{font-size:10px;font-weight:500;color:#C0392B}
.mc-v-grn{font-size:10px;font-weight:500;color:#1A7A4A}

/* DASHBOARD TILE */
.dash-tile{background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:10px;padding:12px}
.dash-section-lbl{font-size:10px;font-weight:500;color:#003366;margin-bottom:6px}
.task-row{display:flex;align-items:center;gap:7px;padding:4px 0;border-bottom:0.5px solid var(--color-border-tertiary)}
.task-row:last-child{border-bottom:none}
.task-circle{width:12px;height:12px;border-radius:50%;border:1.5px solid var(--color-border-secondary);flex-shrink:0}
.task-circle.done{background:#003366;border-color:#003366}
.task-text{font-size:11px;color:var(--color-text-primary)}
.task-text.done{color:var(--color-text-tertiary);text-decoration:line-through}
.reminder-row{display:flex;align-items:center;gap:8px;padding:5px 8px;background:var(--color-background-primary);border-radius:6px;margin-bottom:4px;border:0.5px solid var(--color-border-tertiary)}
.rem-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.rem-title{font-size:11px;font-weight:500;color:var(--color-text-primary);flex:1}
.rem-time{font-size:10px;color:var(--color-text-tertiary)}
.rem-time-red{font-size:10px;color:#C0392B}

/* PRINCIPLES */
.principle-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pcard{background:var(--color-background-secondary);border-radius:8px;padding:12px;border:0.5px solid var(--color-border-tertiary)}
.p-num-box{width:20px;height:20px;border-radius:5px;background:#003366;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;color:#fff;margin-bottom:8px}
.p-title{font-size:12px;font-weight:500;color:var(--color-text-primary);margin-bottom:4px}
.p-desc{font-size:11px;color:var(--color-text-secondary);line-height:1.5}

/* MOTION */
.motion-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary)}
.motion-row:last-child{border-bottom:none}
.motion-bar-wrap{flex:1;height:4px;background:var(--color-background-secondary);border-radius:2px;overflow:hidden}
.motion-bar{height:4px;border-radius:2px}
.motion-name{font-size:11px;color:var(--color-text-primary);min-width:80px}
.motion-val{font-size:10px;color:var(--color-text-tertiary);min-width:50px;text-align:right}
.radius-row{display:flex;gap:8px;margin-top:12px}
.r-box{display:flex;flex-direction:column;align-items:center;gap:5px}
.r-shape{width:28px;height:28px;background:#003366;opacity:.85}
.r-label{font-size:9px;color:var(--color-text-tertiary)}
`}
</style>
  );
}