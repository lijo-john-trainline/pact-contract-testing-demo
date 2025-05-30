# Pact Contract Testing Demo

A basic Pact contract testing demo with two services:
- `consumer-service`: A frontend that consumes a user API
- `provider-service`: A backend that provides user data
- `docker-compose.yml`: Runs Pact Broker locally with PostgreSQL

## 🛠 Setup Instructions

### 1. Start Pact Broker

```bash
docker-compose up -d
```

Broker runs at: http://localhost:9292

---

### 2. Run Consumer Test & Publish Contract

```bash
cd consumer-service
npm install
npm test
npm run publish:pact
```

---

### 3. Run Provider & Verify Contract

```bash
cd ../provider-service
npm install
npm test
```

---

### 4. Optional: Can-I-Deploy Check

Install CLI globally (if needed):

```bash
npm install -g @pact-foundation/cli
```

Then:

```bash
pact-broker can-i-deploy \
  --pacticipant FrontendApp \
  --version 1.0.0 \
  --to-environment staging \
  --broker-base-url http://localhost:9292
```

---

## ✅ Benefits

- 🔁 Real-world split between teams/services
- 🐳 Local broker
- 🧪 Automated contract verification
- 🛑 Pre-deployment safety with `can-i-deploy`