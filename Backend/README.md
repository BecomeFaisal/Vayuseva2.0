# Users API (Backend)

This document describes the POST /users/register endpoint implemented in this backend.

## Endpoint

POST /users/register

- Description: Register a new user. The endpoint validates input, hashes the password, creates a user in the database, and returns the created user object (without the password) and a JSON Web Token (JWT) for authentication.

## Request

- Content-Type: application/json

- Body schema:
  {
    "fullname": {
      "firstname": "string (min 3 chars, required)",
      "lastname": "string (min 3 chars, optional)"
    },
    "email": "string (valid email, min 5 chars, required)",
    "password": "string (min 6 chars, required)"
  }

- Validation rules (as enforced by the route and model):
  - `fullname.firstname` is required and must be at least 3 characters.
  - `fullname.lastname` is optional but if provided should be at least 3 characters.
  - `email` must be a valid email and at least 5 characters.
  - `password` must be at least 6 characters.

## Responses / Status codes

- 201 Created
  - When the user is successfully created. Response body:
    {
      "user": { /* created user object without password */ },
      "token": "<jwt token>"
    }

- 400 Bad Request
  - When input validation fails. Response body (example):
    {
      "errors": [
        {
          "msg": "first name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
      ]
    }

- 500 Internal Server Error
  - When unexpected server/database errors occur (e.g., duplicate email, DB connection failures). Error shape depends on implementation; check server logs for details.

## Example request (curl)

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "password": "supersecret"
  }'
```

## Example successful response

Status: 201

```json
{
  "user": {
    "_id": "64f...",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  },
  "token": "<jwt token here>"
}
```

> Note: The password field is never returned in responses because the Mongoose schema sets `select: false` for `password`.

## Environment / Notes

- The JWT token is signed with `process.env.JWT_SECRET`. Ensure this environment variable is set in your environment or in your .env file used by the app.
- The password is hashed using bcrypt before storage. The code uses `userModel.hashPassword(password)` to produce a hashed password.
- The route performs validation with `express-validator` and returns validation errors with status 400.

## Required fields summary (for quick copy)

- fullname.firstname (string, required, min 3)
- email (string, required, valid email, min 5)
- password (string, required, min 6)

## Troubleshooting

- Duplicate email error: ensure the email is unique. If you get a Mongoose duplicate key error (E11000), choose a different email or remove the existing record.
- Missing JWT secret: if token generation fails, verify that `JWT_SECRET` is defined.

---

This README is intended as a brief reference for the `/users/register` endpoint in this project. If you'd like, I can add automated example requests (Postman collection or Swagger/OpenAPI) next.