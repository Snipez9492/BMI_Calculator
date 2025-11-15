# BMI Calculator - Frontend

React frontend for the BMI Calculator application.

## Features

- Login and registration forms
- Protected dashboard route
- BMI calculation with visual feedback
- Clean, modern UI with gradient design
- Simple routing with React Router

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure the backend server is running on `http://localhost:3000`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

## React Hooks Used

This app uses basic React hooks suitable for beginners:

- **useState**: Managing form inputs and component state
- **useEffect**: Checking authentication status on component mount
- **useNavigate** (from React Router): Navigation between pages

## Pages

- **LoginPage** (`/`): Login and registration form with toggle
- **Dashboard** (`/dashboard`): Protected page with BMI calculator

## API Integration

The app connects to the backend API at `http://localhost:3000/api`:

- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- GET `/auth/profile` - Get user profile
- POST `/bmi/calculate` - Calculate BMI (protected)

Tokens are stored in localStorage for authentication.
