import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Points = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const points = location.state?.points || 0;

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.card}
        >
        <h1 style={styles.title}>Your Loyalty Points</h1>
        <p style={styles.points}>{points} Points</p>
        <p style={styles.subtitle}>Thank you for being a loyal customer!</p>
        <button onClick={handleBack} style={styles.backButton}>
          Back to Login
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
    padding: '40px',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  points: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '20px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
  },
  backButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#764ba2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    marginTop: '20px',
  },
};

export default Points;