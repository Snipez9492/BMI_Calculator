# BMI Calculator with Authentication

A TypeScript/Node.js backend application featuring BMI calculation with JWT authentication and SQL Server database integration.

## Features

- User registration and authentication with JWT
- Secure password hashing with bcrypt
- SQL Server database integration using TypeORM
- Protected BMI calculation endpoint
- RESTful API architecture
- TypeScript for type safety

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQL Server
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v18 or higher)
- SQL Server (local or remote instance)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file with your SQL Server credentials and JWT secret

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=development

# SQL Server Configuration
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=YourStrong@Passw0rd
DB_DATABASE=BMICalculator
DB_ENCRYPT=false
DB_TRUST_CERT=true

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response includes a JWT token to be used for authenticated requests.

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>
```

### BMI Calculator

#### Calculate BMI (Protected)
```http
POST /api/bmi/calculate
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "weight": 70,
  "height": 1.75
}
```

Response:
```json
{
  "weight": 70,
  "height": 1.75,
  "bmi": 22.86,
  "category": "Normal weight"
}
```

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (Unique, Required)
- `username` (Unique, Required)
- `password` (Hashed, Required)
- `firstName` (Optional)
- `lastName` (Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Input validation using express-validator
- SQL injection protection via TypeORM parameterized queries
- CORS enabled for cross-origin requests

## Project Structure

```
src/
├── config/
│   └── database.ts          # Database configuration
├── controllers/
│   └── authController.ts    # Authentication logic
├── entities/
│   └── User.ts              # User entity model
├── middleware/
│   └── auth.ts              # JWT authentication middleware
├── routes/
│   └── authRoutes.ts        # Authentication routes
└── server.ts                # Main application entry point
```

## License

ISC
