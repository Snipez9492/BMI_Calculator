import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middleware/auth';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// BMI Calculator routes (protected)
app.post('/api/bmi/calculate', authenticateToken, (req: Request, res: Response) => {
  try {
    const { weight, height } = req.body;

    if (!weight || !height) {
      res.status(400).json({ error: 'Weight and height are required' });
      return;
    }

    if (weight <= 0 || height <= 0) {
      res.status(400).json({ error: 'Weight and height must be positive numbers' });
      return;
    }

    const bmi = weight / (height * height);

    let category: string;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    res.status(200).json({
      weight,
      height,
      bmi: parseFloat(bmi.toFixed(2)),
      category,
    });
  } catch (error) {
    console.error('BMI calculation error:', error);
    res.status(500).json({ error: 'Error calculating BMI' });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
const startServer = async (): Promise<void> => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
      console.log(`📊 BMI endpoint: http://localhost:${PORT}/api/bmi/calculate`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
