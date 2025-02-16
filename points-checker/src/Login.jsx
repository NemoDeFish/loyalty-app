import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.svg'; // Import the logo

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber) {
      toast.error('Please enter your phone number.');
      return;
    }
  
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const data = await response.json();
      if (data.success) {
        navigate('/points', { state: { points: data.points } });
      } else {
        toast.error('Invalid phone number.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Maradano (Tawau) Sdn. Bhd.</h1>
        <p style={styles.subtitle}>Login to check your loyalty points</p>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onKeyDown={handleKeyDown} // Add onKeyDown event handler
          style={styles.input}
        />
        <ToastContainer />
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={handleLogin} style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
    </motion.div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '20px', // Add padding for small screens
  },
  card: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px', // Adjust padding for small screens
    width: '100%', // Full width on small screens
    maxWidth: '400px', // Limit width on larger screens
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box', // Ensure consistent sizing
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    boxSizing: 'border-box', // Ensure consistent sizing
  },
  error: {
    color: '#ff4d4d',
    fontSize: '14px',
    marginBottom: '10px',
  },
  logo: {
    height: '50px',
    marginRight: '10px',
  },
};

export default Login;