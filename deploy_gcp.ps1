# Deployment-Skript für Google Cloud Run
$ErrorActionPreference = "Stop"

$PROJECT_ID = "studio-4188712377-b3681"
$REGION = "europe-west3" # Frankfurt (oder passe es an deine Präferenz an)
$SERVICE_NAME = "mirrou-creative-studio"
$IMAGE = "gcr.io/$PROJECT_ID/$SERVICE_NAME"

Write-Host "🚀 Starte Deployment für $SERVICE_NAME in Projekt $PROJECT_ID..." -ForegroundColor Cyan

# 1. Container Image bauen und in die Google Container Registry pushen
Write-Host "📦 Baue und pushe Docker Image über Google Cloud Build..." -ForegroundColor Yellow
gcloud builds submit --tag $IMAGE

# 2. Image auf Cloud Run deployen
Write-Host "☁️ Deploye Container auf Google Cloud Run..." -ForegroundColor Yellow
gcloud run deploy $SERVICE_NAME `
    --image $IMAGE `
    --platform managed `
    --region $REGION `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi

Write-Host "✅ Deployment erfolgreich abgeschlossen!" -ForegroundColor Green
