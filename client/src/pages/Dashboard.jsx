import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, calculateBMI } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Get user data when component loads
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      // If no user, redirect to login
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await calculateBMI(parseFloat(weight), parseFloat(height));
      setBmiResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>BMI Calculator</h1>
        <div className="user-info">
          <span>Welcome, {user?.firstName || user?.username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="calculator-box">
          <h2>Calculate Your BMI</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                placeholder="Enter weight in kilograms"
              />
            </div>

            <div className="form-group">
              <label>Height (m)</label>
              <input
                type="number"
                step="0.01"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                placeholder="Enter height in meters"
              />
            </div>

            <button type="submit" className="calculate-btn" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate BMI'}
            </button>
          </form>

          {bmiResult && (
            <div className="result-box">
              <h3>Your Results</h3>
              <div className="result-details">
                <p>
                  <strong>BMI:</strong> {bmiResult.bmi}
                </p>
                <p>
                  <strong>Category:</strong>{' '}
                  <span className={`category ${bmiResult.category.toLowerCase().replace(' ', '-')}`}>
                    {bmiResult.category}
                  </span>
                </p>
              </div>

              <div className="bmi-info">
                <h4>BMI Categories:</h4>
                <ul>
                  <li>Underweight: BMI less than 18.5</li>
                  <li>Normal weight: BMI 18.5 to 24.9</li>
                  <li>Overweight: BMI 25 to 29.9</li>
                  <li>Obese: BMI 30 or greater</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
