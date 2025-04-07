import React, { useState, useEffect } from 'react';
import '../../App.css';
import Logout from '../Logout';
import axios from 'axios';

const NavbarMaskapai = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await axios.get('http://localhost:5000/me', {
          withCredentials: true
        });
        console.log('Response data:', response.data);
        
        if (response.data && response.data.email) {
          setUserEmail(response.data.email);
        } else {
          console.log('No email found in response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  return (
    <nav 
      className="navbar" 
      style={{ 
        padding: 20, 
        backgroundColor: "#3E3F5B",
        position: 'fixed',
        top: 0,
        right: 0,
        left: '250px', // Menyesuaikan dengan lebar sidebar
        zIndex: 30
      }} 
      role="navigation" 
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {!loading && userEmail && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  color: 'white'
                }}>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userEmail)}&background=random`} 
                    alt="Profile" 
                    style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }} 
                  />
                  <span style={{ fontSize: '14px' }}>{userEmail}</span>
                </div>
              )}
              <Logout />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMaskapai;
