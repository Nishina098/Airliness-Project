import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout', {
        withCredentials: true
      });
      // Redirect ke halaman login setelah logout berhasil
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Tetap redirect ke login meskipun ada error
      navigate('/login');
    }
  };

  return (
    <button 
      className="button is-danger" 
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
