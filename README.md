# BMI Calculator with Authentication

A full-stack application with TypeScript/Node.js backend and React frontend, featuring BMI calculation with JWT authentication and SQL Server database integration.

## Features

- User registration and authentication with JWT
- Secure password hashing with bcrypt
- SQL Server database integration using TypeORM
- Protected BMI calculation endpoint
- RESTful API architecture
- TypeScript for type safety
- React frontend with simple routing
- Modern, responsive UI

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQL Server
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS3

## Prerequisites

- Node.js (v18 or higher)
- SQL Server (local or remote instance)
- npm or yarn

## Installation

### Backend Setup

1. Clone the repository

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file with your SQL Server credentials and JWT secret

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

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

### Backend (from root directory)

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

The backend server will run on `http://localhost:3000`

### Frontend (from client directory)

**Development Mode:**
```bash
cd client
npm run dev
```

**Production Mode:**
```bash
cd client
npm run build
npm run preview
```

The frontend will run on `http://localhost:5173`

### Running Both Together

1. Start the backend server (in one terminal):
   ```bash
   npm run dev
   ```

2. Start the frontend (in another terminal):
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

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
BMI_Calculator/
├── src/                     # Backend source code
│   ├── config/
│   │   └── database.ts      # Database configuration
│   ├── controllers/
│   │   └── authController.ts    # Authentication logic
│   ├── entities/
│   │   └── User.ts          # User entity model
│   ├── middleware/
│   │   └── auth.ts          # JWT authentication middleware
│   ├── routes/
│   │   └── authRoutes.ts    # Authentication routes
│   └── server.ts            # Main server entry point
├── client/                  # Frontend source code
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx    # Login/Signup page
│   │   │   └── Dashboard.jsx    # Dashboard with BMI calculator
│   │   ├── services/
│   │   │   └── api.js       # API service for backend calls
│   │   ├── styles/          # CSS stylesheets
│   │   ├── App.jsx          # Main App component with routing
│   │   └── main.jsx         # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json             # Backend dependencies
├── tsconfig.json
└── .env                     # Environment variables (create from .env.example)
```

## How It Works

1. **User visits the app** → Sees login/signup page
2. **User registers or logs in** → Receives JWT token stored in localStorage
3. **User is redirected to dashboard** → Protected route, requires authentication
4. **User can calculate BMI** → Makes authenticated API call to backend
5. **Results displayed** → Shows BMI value and category with visual feedback

## License

ISC
