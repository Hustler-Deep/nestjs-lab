<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <p align="center">
    <a href="https://github.com/Hustler-Deep" target="_blank"><img src="https://img.shields.io/badge/GitHub-Hustler--Deep-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
    <a href="https://www.linkedin.com/in/deep-akabari" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-Deep_Akabari-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  </p>

# Nestjs-crud-demo

A RESTful API built with NestJS featuring JWT-based authentication, user management, and product CRUD operations. This project serves as a clean and scalable starting point for full-stack applications with role-based access control (RBAC).

## 🔧 Features

- JWT authentication
- Role-based access control (admin/user)
- Guarded routes with `@Roles` and `RolesGuard`
- User and product management (CRUD)
- Request validation using `class-validator`

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: TypeORM
- **Database**: MySQL
- **Validation**: class-validator

## 📂 Project Structure

```
src/
├── common/
├── config/
├── constants/
├── database/
├── interfaces/
├── modules/
    ├── auth/
    ├── products/
    ├── users/
        ├── dto/
            ├── create-user.dto.ts
            ├── update-user.dto.ts
        ├── entities/
            ├── user.entity.ts
        ├── users.controller.ts
        ├── users.module.ts
        ├── users.service.ts
├── app.module.ts
└── main.ts
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | `/auth/register` | Register a new user       |
| POST   | `/auth/login`    | Login and receive token   |
| GET    | `/users`         | Get all users (admin only)|
| CRUD   | `/products`      | Manage products (CRUD)    |

## 🔐 Roles

- **Admin**: Full access to all endpoints
- **User**: Limited access based on roles

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following:

```
JWT_SECRET=__JWT_SECRET__
DB_HOST=__DB_HOST__
DB_PORT=__DB_PORT__
DB_USERNAME=__DB_USERNAME__
DB_PASSWORD=__DB_PASSWORD__
DB_NAME=__DB_NAME__
```

## 📫 Stay in touch

- **GitHub:** [@Hustler-Deep](https://github.com/Hustler-Deep)
- **LinkedIn:** [Deep Akabari](https://www.linkedin.com/in/deep-akabari)

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---