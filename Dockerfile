FROM node:20-alpine AS builder

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Installiere Abhängigkeiten
COPY package*.json ./
RUN npm ci

# Kopiere Projektdateien und baue die SSG-Seiten
COPY . .
RUN npm run build

# Verwende einen leichten Webserver für die statischen Dateien
FROM nginx:alpine

# Kopiere die gebauten Dateien aus dem Builder-Schritt
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopiere eigene Nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port für Cloud Run freigeben
EXPOSE 8080

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]
