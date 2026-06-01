# Deploy via GitHub Actions (OIDC → Cloud Run) — Einmal-Setup

> Aktiviert `.github/workflows/deploy.yml`. Danach deployt GitHub die Website **ohne
> statischen Service-Account-Key** (Workload Identity Federation / OIDC) — der nächste
> echte „GitHub als OS"-Schritt, der `deploy_gcp.ps1` ersetzt.
>
> **Einmalig** ausführen (gcloud, als Projekt-Owner). Werte unten sind die echten
> Mirrou-Projektdaten.

---

## 1. gcloud-Befehle (einmalig)

```bash
PROJECT_ID=studio-4188712377-b3681
PROJECT_NUMBER=180023265254
REPO=yoyo967/mirrou-creative-studio
SA=github-deployer

# --- Service Account für Deploys ---
gcloud iam service-accounts create $SA \
  --project=$PROJECT_ID --display-name="GitHub Actions Deployer"

# --- Rollen: Cloud Run deploy + Cloud Build + GCR/Storage + SA-User ---
for ROLE in roles/run.admin roles/cloudbuild.builds.editor roles/storage.admin roles/iam.serviceAccountUser; do
  gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SA@$PROJECT_ID.iam.gserviceaccount.com" --role="$ROLE"
done

# --- Workload Identity Pool + OIDC-Provider (auf genau dieses Repo beschränkt) ---
gcloud iam workload-identity-pools create github-pool \
  --project=$PROJECT_ID --location=global --display-name="GitHub Actions"

gcloud iam workload-identity-pools providers create-oidc github-provider \
  --project=$PROJECT_ID --location=global --workload-identity-pool=github-pool \
  --display-name="GitHub OIDC" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='$REPO'"

# --- SA an das Repo binden (nur dieses Repo darf den SA impersonieren) ---
gcloud iam service-accounts add-iam-policy-binding \
  $SA@$PROJECT_ID.iam.gserviceaccount.com --project=$PROJECT_ID \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/$REPO"
```

## 2. GitHub-Repo-Secrets setzen
`Settings → Secrets and variables → Actions → New repository secret`:

| Secret | Wert |
|--------|------|
| `WIF_PROVIDER` | `projects/180023265254/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `GCP_SA_EMAIL` | `github-deployer@studio-4188712377-b3681.iam.gserviceaccount.com` |

## 3. Aktivieren & testen
1. `Actions → Deploy · Cloud Run (OIDC) → Run workflow` (manueller Test).
2. Läuft der Test grün, in `.github/workflows/deploy.yml` den `push:`-Trigger einkommentieren → Auto-Deploy bei jedem relevanten Push auf `main`.
3. Danach kann `deploy_gcp.ps1` als lokaler Fallback bleiben oder entfallen.

## 4. Sicherheit
- **Kein langlebiger Key** im Repo — OIDC-Token sind kurzlebig und repo-gebunden (`attribute-condition`).
- Der SA hat nur Deploy-Rechte, keine Owner-Rechte.
- EU-Souveränität bleibt: Cloud Build + Cloud Run laufen in `europe-west3`.
