<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/trycompai/comp">
   <img src="https://assets.trycomp.ai/logo.png" alt="Logo" width="10%">
  </a>

  <h3 align="center">Comp AI</h3>

  <p align="center">
    The open-source compliance platform.
    <br />
    <a href="https://trycomp.ai"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://discord.gg/compai">Discord</a>
    ·
    <a href="https://trycomp.ai">Website</a>
    ·
    <a href="https://trycomp.ai/docs">Documentation</a>
    ·
    <a href="https://github.com/trycompai/comp/issues">Issues</a>
    ·
    <a href="https://roadmap.trycomp.ai/roadmap">Roadmap</a>
  </p>
</p>

<p align="center">
   <a href="https://www.producthunt.com/products/comp-ai-get-soc-2-iso-27001-gdpr/launches/comp-ai"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%Day%23DA552E" alt="Product Hunt"></a>
   <a href="https://github.com/trycompai/comp/stargazers"><img src="https://img.shields.io/github/stars/trycompai/comp" alt="Github Stars"></a>
   <a href="https://github.com/trycompai/comp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-purple" alt="License"></a>
   <a href="https://github.com/trycompai/comp/pulse"><img src="https://img.shields.io/github/commit-activity/m/trycompai/comp" alt="Commits-per-month"></a>
   <a href="https://github.com/trycompai/comp/issues"><img src="https://img.shields.io/badge/Help%20Wanted-Contribute-blue"></a>
</p>

## About

### AI that handles compliance for you in hours.

Comp AI is the fastest way to get compliant with frameworks like SOC 2, ISO 27001, HIPAA and GDPR. Comp AI automates evidence collection, policy management, and control implementation while keeping you in control of your data and infrastructure.

## Recognition

#### [ProductHunt](https://www.producthunt.com/posts/comp-ai)

<a href="https://www.producthunt.com/posts/comp-ai?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-comp&#0045;ai" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=944698&theme=light&period=daily&t=1745500415958" alt="Comp&#0032;AI - The&#0032;open&#0032;source&#0032;Vanta&#0032;&#0038;&#0032;Drata&#0032;alternative | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

#### [Vercel](https://vercel.com/)

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

### Built With

- [Next.js](https://nextjs.org/?ref=trycomp.ai)
- [Trigger.dev](https://trigger.dev/?ref=trycomp.ai)
- [Prisma](https://prisma.io/?ref=trycomp.ai)
- [Tailwind CSS](https://tailwindcss.com/?ref=trycomp.ai)
- [Upstash](https://upstash.com/?ref=trycomp.ai)
- [Vercel](https://vercel.com/?ref=trycomp.ai)

## Contact us

Contact our founders at hello@trycomp.ai to learn more about how we can help you achieve compliance.

## Stay Up-to-Date

Get access to the cloud hosted version of [Comp AI](https://trycomp.ai).

## Local Development Setup

A step-by-step guide to get Comp AI running locally with Docker (PostgreSQL + Redis + MinIO).

### Prerequisites

- **Bun** (>=1.1.36) — install: `curl -fsSL https://bun.sh/install | bash`
- **Docker** (for PostgreSQL, Redis, MinIO)
- **Node.js** (>=20.x)
- **openssl** (for generating secrets)

### 1. Clone and Install

```sh
git clone https://github.com/trycompai/comp.git
cd comp
bun install
```

### 2. Start Infrastructure (Docker)

```sh
docker compose up -d postgres redis minio
```

This starts:
- **PostgreSQL 15** on port `5432`
- **Redis 7** on port `6379`
- **MinIO (S3)** on port `9000` (console: `9001`)

### 3. Environment Files

Create these `.env` files:

**`packages/db/.env`**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/comp"
```

**`apps/app/.env`**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/comp"
AUTH_SECRET="$(openssl rand -base64 32)"
SECRET_KEY="$(openssl rand -base64 32)"
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3333
MOCK_REDIS=true
GROQ_API_KEY=<your-groq-key>       # Get from https://console.groq.com
OPENAI_API_KEY=<your-groq-key>     # Groq works here too (or real OpenAI key)
RESEND_API_KEY=placeholder
TRIGGER_SECRET_KEY=placeholder
REVALIDATION_SECRET="$(openssl rand -base64 32)"
APP_AWS_BUCKET_NAME=comp-local
APP_AWS_REGION=us-east-1
APP_AWS_ACCESS_KEY_ID=minioadmin
APP_AWS_SECRET_ACCESS_KEY=minioadmin
APP_AWS_ORG_ASSETS_BUCKET=comp-local
APP_AWS_ENDPOINT=http://localhost:9000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PORTAL_URL=http://localhost:3002
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SELF_HOSTED=true
SERVICE_TOKEN_TRIGGER=local-dev-service-token
INTERNAL_API_TOKEN=local-dev-internal-token
```

**`apps/api/.env`** — copy from example and add at least:
```env
BASE_URL=http://localhost:3333
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3333
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/comp"
MOCK_REDIS=true
SECRET_KEY=<same-as-app-secret-key>
GROQ_API_KEY=<your-groq-key>
OPENAI_API_KEY=<your-groq-key>
APP_AWS_REGION=us-east-1
APP_AWS_ACCESS_KEY_ID=minioadmin
APP_AWS_SECRET_ACCESS_KEY=minioadmin
APP_AWS_BUCKET_NAME=comp-local
APP_AWS_ENDPOINT=http://localhost:9000
APP_AWS_QUESTIONNAIRE_UPLOAD_BUCKET=comp-questionnaires
APP_AWS_KNOWLEDGE_BASE_BUCKET=comp-knowledge-base
APP_AWS_ORG_ASSETS_BUCKET=comp-org-assets
SERVICE_TOKEN_TRIGGER=local-dev-service-token
```

> `MOCK_REDIS=true` uses an in-memory Redis mock — no Upstash account needed.

### 4. Database Setup

```sh
# Generate Prisma client
cd packages/db && npx prisma generate

# Push schema to database
npx prisma db push

# Apply the function definition (required for prefixed CUIDs)
psql "postgresql://postgres:postgres@localhost:5432/comp" -f prisma/functionDefinition.sql
```

### 5. Build the API

The NestJS API must be built before it can run:

```sh
cd apps/api
rm -rf dist
NODE_OPTIONS="--max-old-space-size=4096" npx nest build
```

> This takes ~30s. The API does **not** use hot-reload in this setup.

### 6. Enable Email/Password Auth

Edit `apps/api/src/auth/auth.server.ts` and ensure email/password is enabled:

```ts
// Line ~300
emailPassword: {
  enabled: true,  // was false
  // ...
},
```

### 7. Start Services

Start both services in the background:

```sh
cd apps/api && nohup node --max-old-space-size=4096 dist/src/main.js > /tmp/api.log 2>&1 &
cd apps/app && nohup node_modules/.bin/next dev --turbo -p 3000 > /tmp/app.log 2>&1 &
```

### 8. Verify

```sh
curl -s -o /dev/null -w "API: %{http_code}\n" http://localhost:3333
curl -s -o /dev/null -w "App: %{http_code}\n" http://localhost:3000
```

Expected output:
```
API: 200
App: 200
```

### 9. Create an Account

Open `http://localhost:3000/auth` and sign up with email/password (min 8 chars).

The first sign-up auto-creates an organization and redirects to the dashboard.

### Useful Commands

```sh
# View logs
tail -f /tmp/api.log
tail -f /tmp/app.log

# Prisma Studio (database GUI)
cd packages/db && npx prisma studio

# Regenerate Prisma client (after schema changes)
cd packages/db && npx prisma generate && npx prisma db push

# Stop Docker services
docker compose down

# Clean Docker volumes (destroys data)
docker compose down -v
```

### Notes

- API takes ~30s to start on first boot (NestJS module initialization)
- App takes ~5-10min on first request (Turbopack compiles routes lazily)
- Emails don't send locally (`RESEND_API_KEY=placeholder`)
- Background jobs (Trigger.dev) don't run locally (`TRIGGER_SECRET_KEY=placeholder`)
- All Redis features use in-memory mock (`MOCK_REDIS=true`) — no Upstash needed
- S3 features use local MinIO on port 9000 — real AWS not needed

## Deployment

### Docker

Steps to deploy Comp AI on Docker are coming soon.

### Vercel

Steps to deploy Comp AI on Vercel are coming soon.

## 📦 Package Publishing

This repository uses semantic-release to automatically publish packages to npm when merging to the `release` branch. The following packages are published:

- `@trycompai/db` - Database utilities with Prisma client
- `@trycompai/email` - Email templates and components
- `@trycompai/kv` - Key-value store utilities using Upstash Redis
- `@trycompai/ui` - UI component library with Tailwind CSS

### Setup

1. **NPM Token**: Add your npm token as `NPM_TOKEN` in GitHub repository secrets
2. **Release Branch**: Create and merge PRs into the `release` branch to trigger publishing
3. **Versioning**: Uses conventional commits for automatic version bumping

### Usage

```bash
# Install a published package
npm install @trycompai/ui

# Use in your project
import { Button } from '@trycompai/ui/button'
import { client } from '@trycompai/kv'
```

### Development

```bash
# Build all packages
bun run build

# Build specific package
bun run -F @trycompai/ui build

# Test packages locally
bun run release:packages --dry-run
```

## Contributors

<a href="https://github.com/trycompai/comp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=trycompai/comp" />
</a>

## Repo Activity

![Alt](https://repobeats.axiom.co/api/embed/1371c2fe20e274ff1e0e8d4ca225455dea609cb9.svg 'Repobeats analytics image')

<!-- LICENSE -->

## License

Comp AI, Inc. is a commercial open source company, which means some parts of this open source repository require a commercial license. The concept is called "Open Core" where the core technology (99%) is fully open source, licensed under [AGPLv3](https://opensource.org/license/agpl-v3) and the last 1% is covered under a commercial license (["/ee" Enterprise Edition"]).

> [!TIP]
> We work closely with the community and always invite feedback about what should be open and what is fine to be commercial. This list is not set and stone and we have moved things from commercial to open in the past. Please open a [discussion](https://github.com/trycompai/comp/discussions) if you feel like something is wrong.
