# Node.js Express CRUD API

This project is a production-style CRUD API built with Express.js. It demonstrates how to create, read, update, and delete user records using RESTful endpoints, with all changes persisted to a mock data file (`MOCK_DATA.json`).

## Features
- Express.js server
- CRUD operations for users
- JSON and form-encoded request/response support
- Data is persisted to `MOCK_DATA.json` using asynchronous file operations

## Endpoints

| Method | Endpoint         | Description           |
|--------|------------------|----------------------|
| POST   | /users           | Create a new user    |
| GET    | /users           | Get all users        |
| GET    | /users/:id       | Get user by ID       |
| PUT    | /users/:id       | Update user by ID    |
| DELETE | /users/:id       | Delete user by ID    |

## How It Works
- All user data is loaded from `MOCK_DATA.json` at startup.
- When you create, update, or delete a user, the server updates the in-memory array and asynchronously writes the changes back to `MOCK_DATA.json`.
- The API supports both JSON and form-encoded requests, making it compatible with modern clients and HTML forms.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. The API will be available at `http://localhost:8000/users`

## Example User
```json
{
  "first_name": "Shiv",
  "last_name": "Shiv",
  "email": "nnieon0@nyu.edu",
  "gender": "Female",
  "job_title": "Developer"
}
```

## License
ISC

## Logging

Adds logging middleware to your Express app using the morgan package.

- It logs details of each HTTP request (method, URL, status, response time, etc.) to the console.
- The "dev" format is a concise, color-coded output useful for development.
- This helps you monitor and debug API requests in real time.

## Data Persistence

- `fs.writeFileSync` blocks execution until the file is fully written, so the response is only sent after the file is saved. This guarantees data is persisted before responding, but can slow down your server if many requests come in at once.
- `fs.writeFile` is non-blocking and allows your server to handle other requests while the file is being written. However, you must send the response inside its callback or after its promise resolves to ensure the file is saved before responding.
- For production, `fs.writeFile` is preferred because it keeps your server responsive.
- For demos or scripts, `fs.writeFileSync` is simpler and guarantees the file is written before the response, but at the cost of performance.

