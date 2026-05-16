# Haufe Group · Portfolio 2026–2027
## DHBW Lörrach · SPM · Nils Esch

### Voraussetzungen
- Docker Desktop installiert
- Anthropic API Key (https://console.anthropic.com)

### Setup

1. Repository klonen
```bash
git clone <repo-url>
cd haufe-portfolio
```

2. Umgebungsvariablen setzen
```bash
cp .env.example .env
# .env öffnen und ANTHROPIC_API_KEY eintragen
```

3. Starten
```bash
docker compose up --build
```

4. Im Browser öffnen: http://localhost

### Services
| Service    | Adresse              | Beschreibung              |
|------------|----------------------|---------------------------|
| Website    | http://localhost     | Statische HTML-Seiten     |
| Backend    | http://localhost/api | REST API + KI-Assistent   |
| PostgreSQL | localhost:5432       | Datenbank (intern)        |

### Stoppen
```bash
docker compose down
# Mit Datenbank löschen:
docker compose down -v
```
