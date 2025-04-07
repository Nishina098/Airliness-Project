import React, { useState, useEffect } from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import { BsCart } from 'react-icons/bs';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [penerbangan, setPenerbangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    checkLoginStatus();
    fetchPenerbangan();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/me', {
        withCredentials: true
      });
      setIsLoggedIn(true);
      setUserEmail(response.data.email);
    } catch (error) {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout', {
        withCredentials: true
      });
      setIsLoggedIn(false);
      setUserEmail('');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchPenerbangan = async () => {
    try {
      setLoading(true);
      console.log('Fetching penerbangan...');
      const response = await axios.get('http://localhost:5000/penerbangan');
      console.log('Penerbangan response:', response.data);
      setPenerbangan(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching penerbangan:', error);
      setError('Gagal memuat data penerbangan');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handlePesanClick = (id) => {
    if (!isLoggedIn) {
      window.location.href = '/login';
    } else {
      window.location.href = `/booking/${id}`;
    }
  };

  return (
    <div className="has-background-white-ter">
      <nav className="navbar has-background-white" style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <FaPlaneDeparture size={28} color="#0095DA" />
            <span className="ml-2 has-text-weight-bold" style={{ color: "#0095DA" }}>Airline Ticket</span>
          </a>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <>
              <div className="navbar-item">
                <div className="is-flex is-align-items-center">
                  <figure className="image is-32x32 mr-2">
                    <img 
                      className="is-rounded" 
                      src="https://ui-avatars.com/api/?name=User&background=0095DA&color=fff" 
                      alt="Profile"
                    />
                  </figure>
                  <span className="has-text-weight-medium" style={{ color: "#0095DA" }}>{userEmail}</span>
                </div>
              </div>
              <a className="navbar-item" href="/pesanan">
                <BsCart size={20} color="#0095DA" />
                <span className="ml-2" style={{ color: "#0095DA" }}>Pesanan</span>
              </a>
              <a className="navbar-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <IoLogIn size={20} color="#0095DA" />
                <span className="ml-2" style={{ color: "#0095DA" }}>Logout</span>
              </a>
            </>
          ) : (
            <>
              <a className="navbar-item" href="/login">
                <IoLogIn size={20} color="#0095DA" />
                <span className="ml-2" style={{ color: "#0095DA" }}>Login</span>
              </a>
              <a className="navbar-item" href="/register">
                <IoLogIn size={20} color="#0095DA" />
                <span className="ml-2" style={{ color: "#0095DA" }}>Register</span>
              </a>
            </>
          )}
        </div>
      </nav>
      
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered" style={{ color: "#0095DA" }}>Daftar Tiket</h1>
          
          {loading ? (
            <div className="has-text-centered">Memuat data...</div>
          ) : error ? (
            <div className="notification is-danger">{error}</div>
          ) : (
            <div className="columns is-multiline">
              {penerbangan.map((penerbangan, index) => (
                <div className="column is-one-quarter" key={`${penerbangan.id || index}-${penerbangan.kode_penerbangan}`}>
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <h2 className="subtitle has-text-weight-bold" style={{ color: "#0095DA" }}>{penerbangan.maskapai}</h2>
                    <p><strong>Kode:</strong> {penerbangan.kode_penerbangan}</p>
                    <p><strong>Harga:</strong> {formatPrice(penerbangan.harga)}</p>
                    <p><strong>Dari:</strong> {penerbangan.dari}</p>
                    <p><strong>Ke:</strong> {penerbangan.ke}</p>
                    <p><strong>Berangkat:</strong> {new Date(penerbangan.tanggal_berangkat).toLocaleDateString('id-ID')}</p>
                    <p><strong>Durasi:</strong> {penerbangan.durasi_penerbangan}</p>
                    <p><strong>Kapasitas:</strong> {penerbangan.kapasitas}</p>
                    <button 
                      className="button is-fullwidth" 
                      style={{ backgroundColor: "#0095DA", color: "white" }}
                      onClick={() => handlePesanClick(penerbangan.id)}
                    >
                      {isLoggedIn ? 'Pesan' : 'Login untuk Pesan'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <footer className="footer has-background-white">
        <div className="content has-text-centered">
          <FaPlaneDeparture size={28} color="#0095DA" />
          <p style={{ color: "#0095DA" }}><strong>Airline Ticket</strong> - &copy; 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
