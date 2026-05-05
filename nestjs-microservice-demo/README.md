# NestJS Microservices (TCP)

A documentation for a **NestJS microservices architecture** using the **TCP transporter**. 
The project contains the following services:

- **🛡️ api-gateway** — API gateway (HTTP) that routes requests to microservices
- **🔑 auth-service** — Registration and Login
- **👤 user-service** — User management (CRUD)
- **📦 product-service** — Product management (CRUD)
- **📚 shared-lib** — Common implementation

**Common features implemented across services:**
- 🔐 JWT-based authentication  
- 🛡️ Guards (AuthGuard, RolesGuard)  
- 🏷️ Role-based access control (RBAC)  
- ⚠️ Global filters (exception filters) & interceptors (logging, transform)  
- 📝 Validation pipes & DTOs  
- 📡 TCP transporter for microservice communication 

---

## 📑 Table of Contents
- [📌 Overview](#-overview)
- [📂 Repo Structure](#-repo-structure)
- [🛠 Prerequisites](#-prerequisites)
- [📥 Installation](#-installation)
- [⚙️ Environment Variables](#️-environment-variables)
- [▶️ Running the Services](#️-running-the-services)
- [💡 Notes & Best Practices](#-notes--best-practices)
- [🔄 Example: Auth Login Flow](#-example-auth-login-flow-http--gateway--auth-service-over-tcp)



---

## 📌 Overview

This template demonstrates a simple microservice setup using NestJS with TCP transporter, plus an HTTP API gateway. The gateway handles incoming HTTP requests and forwards them over TCP to microservices (auth, user, product). RBAC is enforced using guards that check roles embedded in JWT claims.

## 📂 Repo Structure

```
repo-root/
├─ api-gateway/
│  ├─ src/
│  └─ package.json
├─ auth-service/
│  ├─ src/
│  └─ package.json
├─ user-service/
│  ├─ src/
│  └─ package.json
├─ product-service/
│  ├─ src/
│  └─ package.json
├─ shared-lib/
│  ├─ src/
│  └─ package.json
│  README.md
└─ package.json
```

Each service is a standalone NestJS app. Shared DTOs, interfaces, and constants can be placed in a `@nestjs/shared-lib` package.

## 🛠 Prerequisites

- Node.js v18+ (or compatible)
- npm or yarn

## 📥 Installation

For each service folder:

```bash
cd api-gateway
npm install

cd ../auth-service
npm install

cd ../user-service
npm install

cd ../product-service
npm install

cd ../shared-lib
npm install
```

## ⚙️ Environment Variables

Create a `.env` in each service with service-specific settings.

**api-gateway/.env**

```
JWT_SECRET=your_jwt_secret_here
```

**auth-service/.env**

```
JWT_SECRET=your_jwt_secret_here
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

**user-service/.env**

```
JWT_SECRET=your_jwt_secret_here
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

**product-service/.env**

```
JWT_SECRET=your_jwt_secret_here
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

> Use strong secrets in production and store them in a secrets manager.

## ▶️ Running the Services

You can start services individually or run all at once.

**Option 1: Start each microservice manually**

```bash
# auth-service
cd auth-service && npm run start:dev

# user-service
cd user-service && npm run start:dev

# product-service
cd product-service && npm run start:dev

# api-gateway
cd api-gateway && npm run start:dev
```

**Option 2: Start all services concurrently from root**

```bash
npm run start:all
```

Each microservice should create a TCP listener using the NestJS `MicroserviceOptions` with `Transport.TCP`.

## 💡 Notes & Best Practices

- **Shared contracts:** Keep DTOs and message patterns in a shared library to avoid mismatch across services.
- **Timeouts & retries:** Use timeouts for client calls and handle retries/backoff when appropriate.
- **Logging & tracing:** Implement structured logging and distributed tracing for observability.
- **Security:** Keep JWT secrets and other sensitive data in environment variables / secret managers. Use HTTPS for gateway in production.

---

## 🔄 Example: Auth Login Flow (HTTP → Gateway → Auth Service over TCP)


1. Client POST `/auth/login` to gateway with `{ email, password }`.
2. Gateway forwards to `authClient.send({ cmd: 'login' }, { email, password })`.
3. Auth service validates credentials and returns `{ accessToken }`.
4. Gateway returns HTTP 200 with token to client.

---
