---
name: sop-project-workflow
description: Mirrou Creative Studio – SOP: Vollständiger Projekt-Workflow von Qualifizierung bis Data Loop
version: 1.0
---

# SOP · Projekt-Workflow – Mirrou Creative Studio

> Der vollständige 6-Phasen-Workflow für jedes Mirrou-Projekt — von der ersten Kundenanfrage bis zum Data Feedback Loop.

---

## Übersicht: 6 Phasen

```
PHASE 1 → QUALIFIZIERUNG     Lead eingeht → passt er zu Mirrou?
PHASE 2 → AUDIT              Creative Audit des Kunden-Accounts
PHASE 3 → BRIEF & ANGEBOT    Creative Brief + Proposal erstellen
PHASE 4 → PRODUKTION         Shooting + Post-Produktion
PHASE 5 → DELIVERY           Assets übergeben + A/B-Setup
PHASE 6 → DATA LOOP          Performance messen → nächste Hypothesen
```

---

## PHASE 1 · Qualifizierung

**Ziel**: Herausfinden ob der Lead zu Mirrou passt — bevor Zeit investiert wird.
**Verantwortlich**: Yahya Yildirim
**Dauer**: 15–30 Minuten

### Checkliste

- [ ] Lead-Quelle identifiziert (Kontaktformular / LinkedIn / Empfehlung)
- [ ] Ad-Spend aus Formular ausgelesen (< 10k€ → kein Retainer)
- [ ] Branche geprüft (Beauty / Health / Lifestyle → weiter; andere → abwägen)
- [ ] Qualifizierungs-Score berechnet (0–9 Punkte, siehe client-profile.md)
- [ ] Entscheidung: Weiter mit Audit ☐  /  Ablehnen ☐  /  Nurture ☐
- [ ] Bei Score ≥ 6: Antwort innerhalb von 4h (bei > 20k€ Ad-Spend)

**Qualifizierungs-Score Kurzreferenz:**
| Kriterium | Punkte |
|-----------|--------|
| Ad-Spend 10–30k€/Monat | 2 |
| Ad-Spend 30–80k€/Monat | 3 |
| Ad-Spend > 80k€/Monat | 3 |
| Beauty/Health/Lifestyle | 2 |
| Creative Fatigue aktiv | 2 |
| Entscheider erreichbar | 2 |

---

## PHASE 2 · Creative Audit

**Ziel**: Dem Kunden echten Mehrwert liefern — vor Vertragsabschluss.
**Verantwortlich**: Yahya + Denys
**Dauer**: 1–2 Stunden
**Output**: template-audit-summary.md (ausgefüllt)

### Checkliste

- [ ] Meta Ads Library gecheckt (öffentliche Creatives analysiert)
- [ ] Ad Account Leserecht angefragt (falls verfügbar)
- [ ] CTR / CPC / ROAS eingeschätzt (Benchmarks aus benchmark-library.md)
- [ ] Creative Fatigue bewertet (Alter der Creatives, Rotation)
- [ ] 3 Hypothesen formuliert
- [ ] Handlungsempfehlung + Paket-Empfehlung festgelegt
- [ ] Audit Summary als PDF/Doc für Kunden vorbereitet
- [ ] Audit per E-Mail an Kunden gesendet (E-Mail-Template in audit-summary)

---

## PHASE 3 · Brief & Angebot

**Ziel**: Verbindliches Briefing und Angebot erstellen.
**Verantwortlich**: Yahya (Angebot) + Olha (Creative Brief)
**Dauer**: 2–4 Stunden
**Output**: template-creative-brief.md + template-proposal.md (ausgefüllt)

### Checkliste

- [ ] Creative Brief mit Kunden ausgefüllt (alle Felder, inkl. HCVO-Check)
- [ ] KI-Einverständnis im Brief bestätigt
- [ ] Angebot erstellt (Paket, Preis, Konditionen)
- [ ] AVV und KI-Transparenzklausel im Angebot enthalten
- [ ] Angebot an Kunden gesendet (Gültigkeit 14 Tage)
- [ ] Vertragsunterzeichnung erhalten
- [ ] AVV unterzeichnet erhalten
- [ ] Google Drive Kundenordner angelegt (Struktur laut sop-tooling-workflows.md)
- [ ] Onboarding-Call geplant (Yahya + Olha, 60 Min.)
- [ ] Shooting-Datum vereinbart

---

## PHASE 4 · Produktion

**Ziel**: Creatives in vereinbarter Qualität und Menge produzieren.
**Verantwortlich**: Olha (Creative Direction) + Denys (Format-Output)
**Dauer**: 1–5 Tage je nach Paket
**Output**: Fertige Assets in Google Drive (03_Assets_Raws + 04_Assets_Final)

### Checkliste

**Vor dem Shooting:**
- [ ] Creative Brief nochmals geprüft (alle Hypothesen bekannt)
- [ ] Props / Produkte beim Kunden angefordert und erhalten
- [ ] Studio Hamburg gebucht (Datum bestätigt)
- [ ] Shot-Liste erstellt (wie viele Setups, welche Varianten)

**Shooting-Tag:**
- [ ] Rohmaterial sofort gesichert (Google Drive → 03_Assets_Raws)
- [ ] Backup erstellt (lokale Festplatte)
- [ ] Shot-Liste abgehakt (alle geplanten Setups erledigt)

**Post-Produktion:**
- [ ] Retouche / Compositing abgeschlossen
- [ ] KI-Elemente hinzugefügt (falls geplant)
- [ ] C2PA-Metadaten gesetzt (Firefly: automatisch; andere: manuell)
- [ ] Dateinamens-Konvention eingehalten (`_KI-bg`, `_KI-gen`, `_full-photo`)
- [ ] Alle Formate exportiert (1:1, 4:5, 9:16)
- [ ] Interne Review: Olha gibt finales OK
- [ ] Assets in 04_Assets_Final abgelegt

---

## PHASE 5 · Delivery

**Ziel**: Assets professionell übergeben, Kunden für A/B-Testing briefen.
**Verantwortlich**: Denys + Yahya
**Dauer**: 2–4 Stunden
**Output**: template-delivery-handover.md (ausgefüllt) + Kunden-Link

### Checkliste

- [ ] Compliance-Checkliste durchgeführt (sop-compliance-checklist.md) ← PFLICHT
- [ ] Delivery Handover Dokument erstellt
- [ ] Kunden-Drive-Link erstellt (nur 04_Assets_Final, nicht Raws)
- [ ] A/B-Test-Briefing an Kunden kommuniziert
- [ ] KI-Kennzeichnungs-Anleitung im Handover enthalten
- [ ] Delivery per E-Mail bestätigt
- [ ] Rechnung gestellt (bei Einzel-Projekt: sofort; Retainer: Monatsende)

---

## PHASE 6 · Data Feedback Loop

**Ziel**: Aus Ergebnissen lernen und nächsten Zyklus besser machen.
**Verantwortlich**: Denys (Daten) + Yahya (Strategie)
**Dauer**: Laufend (7 Tage nach Launch, dann monatlich)

### Checkliste

- [ ] Performance-Daten nach 7 Tagen abgefragt (CTR, CPC, ROAS)
- [ ] Daten in Learning Log eingetragen (template-learning-log.md)
- [ ] Gewinner-Creative identifiziert
- [ ] Creative Fatigue Onset dokumentiert (wann bricht CTR ein?)
- [ ] 3 neue Hypothesen für nächsten Zyklus formuliert
- [ ] Erkenntnisse in Benchmark Library aktualisiert (wenn relevant)
- [ ] Performance-Call mit Kunden (30 Min.) durchgeführt
- [ ] Nächsten Zyklus geplant (Retainer: neues Brief für nächsten Monat)

---

## Eskalations-Matrix

| Situation | Reaktion | Verantwortlich |
|-----------|---------|----------------|
| Kunden-Freigabe fehlt > 48h | Reminder + Deadline | Yahya |
| Produkte nicht geliefert | Shooting verschieben, Kunden informieren | Olha |
| Performance weit unter Benchmark | Data Call vorverlegen | Denys + Yahya |
| Compliance-Problem vor Delivery | Delivery stoppen, Problem lösen | Denys |
| Retainer-Kündigung | Retention-Gespräch in 24h | Yahya |
