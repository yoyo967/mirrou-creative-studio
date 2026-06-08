# System-URLs & DNS-Referenz (Single Source of Truth)

Dieses Dokument erfasst alle offiziellen URLs, Repositories, Administrations-Links und DNS-Einträge des **Mirrou Creative Studio** und des **Opus Magnum Media Project OS**-Systems.

---

## 1. 📋 DNS-Konfiguration (IONOS)

Für die Aktivierung der Wunschdomain `mirrou.studio` sind bei **IONOS** (Bereich: *Domains & SSL* → mirrou.studio → *DNS*) folgende vier Einträge hinterlegt:

| Typ | Hostname | Wert / Ziel | Zweck |
|---|---|---|---|
| **A** | `@` (= apex / mirrou.studio) | `199.36.158.100` | Firebase-Hosting-IP-Routing |
| **TXT** | `@` | `hosting-site=studio-4188712377-b3681` | Firebase-Eigentumsnachweis |
| **TXT** | `_acme-challenge` | `RE6TfgcOnYSMrJ25SOwZK9ugTljXduW6zZAPm9RyBiU` | ACME-SSL-Zertifikatsvalidierung |
| **CNAME** | `www` | `studio-4188712377-b3681.web.app` | www-Routing auf Firebase-Staging |

*DNS-Betriebshinweise:*
* Vorhandene Standard-A-Einträge auf `@` (IONOS-Parkseite) müssen gelöscht werden, damit das Routing greift.
* Vorhandene MX-Einträge für Mail-Verkehr dürfen nicht modifiziert werden.

---

## 2. 🧑‍💻 GitHub Repositories (Code & SSoT)

| Dienst / Zweck | URL | Status |
|---|---|---|
| **Mirrou Website-Repository** | [github.com/yoyo967/mirrou-creative-studio](https://github.com/yoyo967/mirrou-creative-studio) | 🟢 Aktiv |
| **Opus Magnum Engine Repository** | [github.com/yoyo967/Opus-Magnum-Media-Porject-OS](https://github.com/yoyo967/Opus-Magnum-Media-Porject-OS) | 🟢 Aktiv |
| **Raw-README (NotebookLM Grounding)** | [Opus-Magnum README.md](https://raw.githubusercontent.com/yoyo967/Opus-Magnum-Media-Porject-OS/main/README.md) | 🟢 Aktiv |

---

## 3. 🌐 Website-Systeme (Mirrou Frontends)

| Frontend / Route | URL | Status / Zweck |
|---|---|---|
| **Firebase Hosting (Primär)** | [studio-4188712377-b3681.web.app](https://studio-4188712377-b3681.web.app) | 🟢 Live (Kanonische Front) |
| **Firebase Backup** | [studio-4188712377-b3681.firebaseapp.com](https://studio-4188712377-b3681.firebaseapp.com) | 🟢 Live (Fallback-Front) |
| **Wunschdomain** | [mirrou.studio](https://mirrou.studio) | ⏳ DNS bei IONOS ausstehend |
| **Cloud Run (Legacy)** | [mirrou-creative-studio-...europe-west3.run.app](https://mirrou-creative-studio-180023265254.europe-west3.run.app) | 🟡 Redundant (Firebase CDN ist Front) |

---

## 4. ⚙️ Opus Magnum (SaaS-Cockpit & API-Backend)

| Dienst | URL | Status / Endpunkte |
|---|---|---|
| **Cockpit (Frontend)** | [opus-magnum-media-v3-...run.app](https://opus-magnum-media-v3-923137317598.europe-west3.run.app) | 🟢 Live (Cloud Run) |
| **API-Backend (FastAPI)** | [opus-magnum-ai-backend-...run.app](https://opus-magnum-ai-backend-923137317598.europe-west3.run.app) | 🟢 Live (Cloud Run) |
| **Kritische Endpunkte** | `/health` · `/api/lead` (Contact-Form-Post) · `/api/leads` (Inbox) | 🟢 Aktiv |
| **Zukunftspfad (Phase 2)** | `app.mirrou.studio` · `api.mirrou.studio` | ⏳ Geplant (Load Balancer) |

---

## 5. 💼 Social Media & Trust Pages

| Plattform | URL | Status |
|---|---|---|
| **LinkedIn (Mirrou Studio)** | [linkedin.com/company/mirrou-studio](https://www.linkedin.com/company/mirrou-studio/) | 🟢 Live |
| **LinkedIn (Opus Magnum Media)** | [linkedin.com/company/omm-opus-magnum-media](https://www.linkedin.com/company/omm-opus-magnum-media/) | 🟢 Live |
| **Instagram (Mirrou)** | [instagram.com/mirrou.studio](https://www.instagram.com/mirrou.studio/) | 🟢 Live |
| **Facebook (Mirrou)** | [facebook.com/profile.php?id=61589455194800](https://www.facebook.com/profile.php?id=61589455194800) | 🟢 Live |

---

## 6. 🛠️ Cloud-Konsolen (Interner Zugriff)

* **Firebase Console (Website):** [console.firebase.google.com/project/studio-4188712377-b3681](https://console.firebase.google.com/project/studio-4188712377-b3681/overview)
* **Firebase Hosting Panel:** [console.firebase.google.com/project/studio-4188712377-b3681/hosting](https://console.firebase.google.com/project/studio-4188712377-b3681/hosting/main)
* **GCP-Projekt (Opus Magnum):** `opus-magnum-ai` (ID: `923137317598`)
* **GCP-Projekt (Website-Backbone):** `studio-4188712377-b3681` (ID: `180023265254`)
* **Domain-Registrar:** IONOS (Verwaltung von `mirrou.studio`)
* **Gemini API Key:** [Google AI Studio API Keys](https://aistudio.google.com/apikey)

---

## 7. 🔍 Externe Legacy-Dienste (sovereign-*)

Diese Dienste liegen im gleichen GCP-Account, sind jedoch **nicht** Teil der aktiven Mirrou-Infrastruktur. Sie stammen aus früheren Experimenten und bleiben inaktiv:

* **Sovereign API (europe-west3):** `https://sovereign-api-iqy7yeycta-ey.a.run.app`
* **Sovereign API (us-central1):** `https://sovereign-api-iqy7yeycta-uc.a.run.app`
* **Sovereign Backend (europe-west4):** `https://sovereign-backend-iqy7yeycta-ez.a.run.app`
* **Sovereign Web (europe-west4):** `https://sovereign-web-iqy7yeycta-ez.a.run.app`
