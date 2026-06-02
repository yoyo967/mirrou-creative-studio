# Kontaktformular → eigenes EU-E-Mail-System (Brevo) — Implementierungsplan

> **Status:** PLAN (2026-06-02) · noch nicht gebaut. Ersetzt die frühere HubSpot-Idee.
> **Entscheidungen:** E-Mail-Versand = **Brevo** (FR/EU) · **Phase 1 = nur E-Mail** (CRM
> folgt in Phase 2) · DSGVO-first.
> **Behebt:** P0 — `src/components/ContactForm.tsx` sendet aktuell nicht (kein `fetch`,
> `data-netlify` auf Cloud Run wirkungslos) → Leads gehen verloren.

---

## 1. Ziel & Scope

**Phase 1 (dieser Plan):** Jede Formular-Absendung landet zuverlässig als E-Mail im
Team-Postfach — DSGVO-konform, EU-only, ohne Dritt-CRM. P0 ist damit geschlossen.

**Phase 2 (später, separat):** Lead-Ablage/CRM — empfohlener Mittelweg: PII in EU-Store
(Firestore/Cloud SQL `europe-west3`) + PII-freies GitHub-Pipeline-Issue fürs Kanban/Audit.
Siehe §8. **Nicht Teil von Phase 1.**

---

## 2. Architektur (Phase 1)

```
ContactForm.tsx (Browser, statisch via nginx/Cloud Run)
        │  POST /api/lead   (JSON: name,email,brand,website,ad_spend,message,consent,ts,honeypot)
        ▼
EU-Endpoint  (kleiner Cloud Run Service, europe-west3)
        ├─ Validierung + Honeypot-Check + Rate-Limit
        ├─ Brevo Transactional Email API  → Team-Postfach (Lead-Benachrichtigung)
        └─ (optional) Auto-Antwort an Interessent (Eingangsbestätigung)
        ▼
HTTP 200/4xx/5xx  → Erfolg/Fehler-State im Formular
```

**Warum ein eigener Service?** Die Website ist statisch (nginx). Für einen POST-Empfang
braucht es einen Server. Ein dedizierter, winziger Cloud-Run-Service in `europe-west3`
fügt sich in die bestehende Docker-/Cloud-Run-/OIDC-Kette (`deploy.yml`) ein und bleibt
unabhängig vom statischen Frontend deploybar.

---

## 3. Brevo-Setup (macht der/die Owner — einmalig)

1. **Account** auf brevo.com anlegen (Free-Tier: 300 Mails/Tag genügt für Leads).
2. **Absender-Domain authentifizieren** (`Senders, Domains & Dedicated IPs → Domains`):
   - **SPF**, **DKIM** und **DMARC**-DNS-Records für `mirrou.studio` setzen.
   - Ohne Domain-Auth landen Mails im Spam / „from" @mirrou.studio wird abgelehnt.
3. **API-Key** erzeugen (`SMTP & API → API Keys`) → wird Cloud-Run-Secret (nie ins Repo).
4. **DPA** (Auftragsverarbeitungsvertrag) in den Brevo-Account-Einstellungen bestätigen.
5. Festlegen:
   - **Empfänger** (Team-Postfach, z. B. `leads@mirrou.studio`).
   - **Absender** (verifizierte Adresse, z. B. `no-reply@mirrou.studio`).

> Brevo verarbeitet in der EU; mit Domain-Auth + DPA ist der Versand DSGVO-konform.

---

## 4. Backend-Endpoint — Spezifikation

**Tech:** kleiner TypeScript-Service (Node + Hono o. ä.) oder Cloud Run Function (gen2),
`europe-west3`. E-Mail-Versand hinter einem **schmalen Interface** (`sendLeadMail()`),
damit Brevo austauschbar bleibt (Provider-Agnostik).

**Route:** `POST /api/lead` (JSON)

**Ablauf:**
1. **Content-Type/Method** prüfen; CORS auf die Live-Origin beschränken.
2. **Honeypot:** ist `company-website` befüllt → still `200 OK` zurück (Bot), nichts senden.
3. **Validierung:** `name`, `email` (Format), `brand`, `ad_spend` (erlaubte Werte),
   `message` (Länge), `consent === true` Pflicht. Bei Fehler `400` + Feldhinweis.
4. **Rate-Limit:** pro IP (z. B. 5/Stunde) — In-Memory-Token-Bucket reicht; gegen Spam.
5. **Brevo-Call:** `POST https://api.brevo.com/v3/smtp/email` mit Header `api-key`,
   JSON `{ sender, to, subject, htmlContent, replyTo: {email: <lead-email>} }`.
   `replyTo` = Interessent → Team kann direkt antworten.
6. **Consent-Log:** Zeitstempel (ISO) + Consent-Version in der Mail/Log festhalten
   (DSGVO-Nachweis).
7. **Antwort:** `200` bei Erfolg, `4xx` bei Validierung, `5xx` bei Brevo-Fehler
   (Frontend zeigt freundlichen Fehler + Mail-Fallback `mailto:`).

**Secrets/Env (Cloud Run, nie ins Repo):** `BREVO_API_KEY`, `LEAD_TO_EMAIL`,
`LEAD_FROM_EMAIL`, `ALLOWED_ORIGIN`.

---

## 5. Frontend-Wiring — `src/components/ContactForm.tsx`

- `handleSubmit` → echter `fetch('/api/lead', { method:'POST', body: JSON … })`
  (oder volle Service-URL + CORS). `e.preventDefault()` bleibt.
- **States:** `idle | sending | sent | error` statt des aktuellen 3-Sekunden-Fakes
  (Button-Disable während `sending`, klare Erfolgs-/Fehlermeldung, i18n).
- **Consent:** `dsgvo`-Checkbox-Wert + Client-Zeitstempel mitsenden.
- **Honeypot:** `company-website` mitsenden (Server entscheidet).
- **i18n:** neue Keys im `contact`-Namespace (`form.sending`, `form.error`,
  `form.errorRetry`) in allen 8 Locales — `de`/`en` voll, Rest UI-konsistent.
- `data-netlify`/`netlify-honeypot`-Attribute entfernen (tot auf Cloud Run).
- **Kein Layout-/Brand-Change** — nur Verhalten.

---

## 6. DSGVO-Checkliste (EU Counsel)

- ✅ **Consent-Gate** bereits vorhanden (Pflicht-Checkbox + Link `/datenschutz`).
- ☐ **Consent-Nachweis:** Zeitstempel + Datenschutz-Version serverseitig protokollieren.
- ☐ **Datenminimierung:** nur die genannten Felder; keine versteckten Tracker.
- ☐ **Datenschutzerklärung** (`/datenschutz`) um Brevo als Auftragsverarbeiter +
  Zweck (Kontaktanfrage) + Speicherdauer ergänzen.
- ☐ **EU-Verarbeitung:** Brevo EU + DPA bestätigt; kein US-Tool im Lead-Pfad.
- ☐ **Aufbewahrung:** Löschkonzept (z. B. Lead-Mails nach X Monaten ohne Abschluss).
- ⚪ Optional **Double-Opt-in/Auto-Antwort** an Interessent (Eingangsbestätigung).

---

## 7. Deploy & Secrets

- Service in dasselbe GCP-Projekt/`europe-west3`; Deploy via bestehende OIDC-Action
  (`deploy.yml`-Muster) oder eigener Mini-Workflow. **Kein statischer Key.**
- Secrets als **Cloud-Run-Env** (über Secret Manager), nicht im Container-Image.
- nginx: `/api/*` an den Service proxyen **oder** Formular postet direkt an die
  Service-URL (CORS auf Live-Origin beschränkt).
- Nach Deploy: echte Test-Submission → Mail-Eingang + Spam-Score (Domain-Auth) prüfen.

---

## 8. Phase 2 — CRM (Ausblick, später)

Empfohlener Mittelweg („Perfect Twin"): **PII DSGVO-sauber in EU-Store**
(Firestore `eur3` / Cloud SQL `europe-west3`) **+ PII-freies GitHub-Issue** je Lead
(`Lead #a1b2 · Ad-Spend 30–80k · Status: neu`, Labels = Pipeline, Projects = Kanban).
So entsteht der „GitHub als CRM"-Workflow + Audit-Trail **ohne** Prospect-PII auf
US-Infra (GitHub/Microsoft). Alternative: reines EU-CRM ohne GitHub. **Entscheidung
offen bis Phase 1 läuft.**

---

## 9. Offene Punkte vor dem Bauen

| # | Punkt | Wer |
|---|-------|-----|
| 1 | Brevo-Account + Domain-Auth (SPF/DKIM/DMARC) + API-Key | Owner |
| 2 | Empfänger-/Absender-Adresse festlegen (`leads@` / `no-reply@`) | Owner |
| 3 | Endpoint-Tech final (Mini-Service vs. Cloud Run Function) | DEV |
| 4 | Auto-Antwort an Interessent: ja/nein | Owner |
| 5 | Datenschutzerklärung-Text um Brevo erweitern | Owner/DEV |

> Sobald (1)+(2) stehen, ist Phase 1 in ~1 Tag baubar.
