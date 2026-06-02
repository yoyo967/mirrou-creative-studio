# Claude als Teammitglied (@claude via Vertex AI) — Einmal-Setup

> Aktiviert `.github/workflows/claude.yml`. Danach ist **Claude Code ein Teammitglied im
> Repo**: Schreib `@claude ...` in ein Issue oder einen PR-/Review-Kommentar → Claude
> analysiert, antwortet, implementiert und erstellt PRs.
>
> Auth läuft über **Google Vertex AI + Workload Identity Federation (OIDC, KEYLESS)** —
> kein statischer API-Key im Repo. Die Inferenz läuft auf **eurem** GCP-Projekt
> (`studio-4188712377-b3681`), nicht über einen Drittanbieter-Schlüssel.
>
> **Voraussetzung:** Das WIF/OIDC-Setup aus [`DEPLOY_OIDC_SETUP.md`](DEPLOY_OIDC_SETUP.md)
> ist bereits erledigt. `claude.yml` **reused dieselbe WIF + denselben Service-Account**
> (`github-deployer`) und dieselben Secrets `WIF_PROVIDER` + `GCP_SA_EMAIL` wie
> `deploy.yml`. Du musst dem SA nur **eine zusätzliche Rolle** geben (Schritt 2).

---

## 0. STATUS & Sicherheit (warum das ungefährlich dormant liegt)

- Der Workflow läuft **nur bei einer `@claude`-Mention** in einem Issue- oder
  PR-Kommentar bzw. einem neuen/zugewiesenen Issue — also **bewusste menschliche Aktion**.
  **Nie bei Push.**
- Solange die WIF nicht eingerichtet ist, schlägt der `auth`-Step fehl → es passiert
  schlicht nichts. Kein statischer Key, keine Angriffsfläche.
- OIDC-Token sind kurzlebig und **auf genau dieses Repo beschränkt** (`attribute-condition`
  aus dem Deploy-Setup).

---

## 1. Vertex AI vorbereiten (einmalig, als Projekt-Owner)

```bash
PROJECT_ID=studio-4188712377-b3681
SA=github-deployer   # derselbe SA wie für Deploys (DEPLOY_OIDC_SETUP.md)

# --- Vertex AI API aktivieren ---
gcloud services enable aiplatform.googleapis.com --project=$PROJECT_ID
```

Anschließend die **Claude-Modelle in Vertex Model Garden freischalten** (einmalig, in der
Cloud Console): `Vertex AI → Model Garden → Anthropic Claude → Enable / „Request access"`
für das Modell, das du nutzen willst (Default: Claude Sonnet 4.5). Ohne Freischaltung
liefert Vertex `404 / permission denied` für das Modell.

## 2. Service-Account um Vertex-Rolle erweitern

Der `github-deployer`-SA hat bereits die Deploy-Rollen. Für Vertex-Inferenz kommt **eine**
Rolle dazu:

```bash
PROJECT_ID=studio-4188712377-b3681
SA=github-deployer

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"
```

Mehr ist nicht nötig — `WIF_PROVIDER` + `GCP_SA_EMAIL` sind bereits als Repo-Secrets
gesetzt (siehe `DEPLOY_OIDC_SETUP.md` §2).

## 3. ⚖️ EU-Datenresidenz (DSGVO) — wichtig

Der Workflow-Default ist `VERTEX_REGION = us-east5` (**USA**). Für ein EU-first/DSGVO-Setup
**eine EU-Vertex-Region setzen**, in der das gewählte Claude-Modell verfügbar ist
(z. B. `europe-west1`). Verfügbarkeit pro Modell variiert → vor Produktivnutzung in der
Vertex-Doku gegenprüfen.

`Settings → Secrets and variables → Actions → Variables → New repository variable`:

| Variable | Empfehlung | Wirkung |
|----------|-----------|---------|
| `VERTEX_REGION` | `europe-west1` (sofern Modell dort verfügbar) | Region für Inferenz → Daten bleiben in der EU |
| `CLAUDE_VERTEX_MODEL` | z. B. `claude-sonnet-4-5@20250929` (Default) | überschreibbares Vertex-Modell-ID |

> **Hinweis zur Modell-Wahl:** Der Workflow setzt `VERTEX_REGION_CLAUDE_4_5_SONNET` auf
> dieselbe Region — passend zum Default-Modell Sonnet 4.5. Wählst du über
> `CLAUDE_VERTEX_MODEL` ein **anderes** Modell, ggf. die entsprechende
> `VERTEX_REGION_CLAUDE_*`-Env-Variable im Workflow ergänzen.

## 4. Aktivieren & testen

1. Schritte 1–2 (und für DSGVO Schritt 3) ausführen.
2. Ein Test-Issue anlegen und in den Body oder einen Kommentar `@claude` schreiben
   (z. B. „@claude fasse den Tech-Stack dieses Repos zusammen").
3. Im `Actions`-Tab läuft der Workflow **Claude · @claude (Vertex AI)** an; Claude
   antwortet als Kommentar im Issue.

## 5. Reuse & Zusammenspiel

- **Eine WIF, ein Service-Account** für beide Action-Workflows:
  `deploy.yml` (Cloud Run) und `claude.yml` (Vertex). Unterschied: `claude.yml` braucht
  zusätzlich `roles/aiplatform.user`.
- Alternative ohne Vertex: `brief-to-copy.yml` nutzt einen direkten
  `ANTHROPIC_API_KEY` (Anthropic-API statt Vertex) — bewusst getrennt, für den
  Brief→Copy-PoC.

## 6. Frontier-Firm-Einordnung

Dieser Workflow ist der **agentische Vollausbau** der „GitHub als Orchestration & Audit
OS"-Schicht (siehe [`../01_strategie/github-frontier-firm-os.md`](../01_strategie/github-frontier-firm-os.md)):
Claude wird vom externen Tool zum **im Repo arbeitenden Teammitglied** — jede Aktion
landet als Commit/PR/Kommentar im EU-AI-Act-Audit-Trail.
