import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Pesanan = () => {
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPesanan, setFilteredPesanan] = useState([]);

  useEffect(() => {
    fetchPesanan();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPesanan(pesanan);
    } else {
      const filtered = pesanan.filter(item => 
        item.kode_booking.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPesanan(filtered);
    }
  }, [searchTerm, pesanan]);

  const fetchPesanan = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/transaksi', {
        withCredentials: true
      });
      setPesanan(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching pesanan:', error);
      setError('Gagal memuat data pesanan');
    } finally {
      setLoading(false);
    }
  };

  const handleBatalkanPesanan = async (idTransaksi) => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) {
      try {
        await axios.patch(`http://localhost:5000/transaksi/${idTransaksi}`, {
          status_pembayaran: 'gagal'
        }, {
          withCredentials: true
        });
        alert('Pesanan berhasil dibatalkan');
        fetchPesanan(); // Refresh data setelah pembatalan
      } catch (error) {
        console.error('Error cancelling pesanan:', error);
        alert('Gagal membatalkan pesanan. Silakan coba lagi.');
      }
    }
  };

  const handleBayarSekarang = async (idTransaksi) => {
    if (window.confirm('Apakah Anda yakin ingin melakukan pembayaran?')) {
      try {
        await axios.patch(`http://localhost:5000/transaksi/${idTransaksi}`, {
          status_pembayaran: 'berhasil'
        }, {
          withCredentials: true
        });
        alert('Pembayaran berhasil!');
        fetchPesanan(); // Refresh data setelah pembayaran
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('Gagal melakukan pembayaran. Silakan coba lagi.');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (loading) return <div className="has-text-centered">Memuat data...</div>;
  if (error) return <div className="notification is-danger">{error}</div>;

  return (
    <div className="has-background-white-ter">
      <div className="container" style={{ padding: '2rem' }}>
        <div className="mb-2 is-flex is-justify-content-space-between is-align-items-center">
          <button 
            className="button is-light" 
            onClick={() => navigate('/')}
            style={{ marginBottom: '0.5rem' }}
          >
            <span className="icon">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>Kembali ke Beranda</span>
          </button>
          
          <div className="field" style={{ marginBottom: '0.5rem' }}>
            <div className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Cari berdasarkan kode booking..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '250px', color: "#000" }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        <h1 className="title has-text-centered" style={{ color: "#0095DA", fontSize: '1.5rem' }}>Riwayat Pesanan</h1>

        {filteredPesanan.length === 0 ? (
          <div className="notification is-small has-text-centered">
            {searchTerm ? 'Tidak ditemukan pesanan dengan kode booking tersebut' : 'Anda belum memiliki pesanan'}
          </div>
        ) : (
          <div className="columns is-multiline is-mobile">
            {filteredPesanan.map((item) => (
              <div key={item.id_transaksi} className="column is-4-desktop is-6-tablet is-12-mobile">
                <div className="box has-background-white" style={{ 
                  borderRadius: "6px", 
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  padding: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <div className="content" style={{ marginBottom: '0.5rem' }}>
                    <h2 className="subtitle has-text-weight-bold" style={{ color: "#0095DA", fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Kode Booking: {item.kode_booking}
                    </h2>
                    
                    <div className="mb-2">
                      <div className="is-flex is-align-items-center mb-1">
                        <figure className="image is-24x24 mr-2">
                          <img 
                            className="is-rounded" 
                            src={item.user?.img_user ? `http://localhost:5000/images/users/${item.user.img_user}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.email_user || 'User')}&background=0095DA&color=fff`} 
                            alt={item.user?.email_user || 'User'}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user?.email_user || 'User')}&background=0095DA&color=fff`;
                            }}
                          />
                        </figure>
                        <div>
                          <p className="has-text-weight-bold" style={{ fontSize: '0.8rem' }}>{item.user?.email_user || 'User'}</p>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Status:</strong> 
                        <span className={`tag is-small ${item.status_pembayaran === 'pending' ? 'is-warning' : 
                                        item.status_pembayaran === 'berhasil' ? 'is-success' : 'is-danger'}`}>
                          {item.status_pembayaran === 'pending' ? 'Menunggu Pembayaran' :
                           item.status_pembayaran === 'berhasil' ? 'Pembayaran Berhasil' : 'Pembayaran Gagal'}
                        </span>
                      </p>
                      <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Tanggal:</strong> {new Date(item.tanggal_transaksi).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                      <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Tiket:</strong> {item.jumlah_tiket}</p>
                      <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Total:</strong> {formatPrice(item.total_harga)}</p>
                      <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Metode:</strong> {item.metode_pembayaran}</p>
                      
                      {/* Detail Penerbangan */}
                      <div className="mt-2 p-1" style={{ backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
                        <h3 className="subtitle is-6 has-text-weight-bold mb-1" style={{ color: "#0095DA", fontSize: '0.8rem' }}>Detail Penerbangan</h3>
                        {item.penerbangan ? (
                          <>
                            <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Kode:</strong> {item.penerbangan.kode_penerbangan || '-'}</p>
                            <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Maskapai:</strong> {item.penerbangan.maskapai || '-'}</p>
                            <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Rute:</strong> {item.penerbangan.dari || '-'} → {item.penerbangan.ke || '-'}</p>
                            <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Tanggal:</strong> {item.penerbangan.tanggal_berangkat ? new Date(item.penerbangan.tanggal_berangkat).toLocaleDateString('id-ID') : '-'}</p>
                            <p style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}><strong style={{color: "grey"}}>Durasi:</strong> {item.penerbangan.durasi_penerbangan || '-'}</p>
                          </>
                        ) : (
                          <p className="has-text-danger" style={{ fontSize: '0.8rem' }}>Data penerbangan tidak tersedia</p>
                        )}
                      </div>
                    </div>

                    <div className="buttons is-centered">
                      {item.status_pembayaran === 'pending' && (
                        <button 
                          className="button is-danger is-small"
                          onClick={() => handleBatalkanPesanan(item.id_transaksi)}
                        >
                          <span className="icon">
                            <i className="fas fa-times"></i>
                          </span>
                          <span>Batalkan</span>
                        </button>
                      )}
                      {item.status_pembayaran === 'pending' && (
                        <button 
                          className="button is-primary is-small"
                          onClick={() => handleBayarSekarang(item.id_transaksi)}
                        >
                          <span className="icon">
                            <i className="fas fa-credit-card"></i>
                          </span>
                          <span>Bayar</span>
                        </button>
                      )}
                      {item.status_pembayaran === 'berhasil' && (
                        <button 
                          className="button is-success is-small"
                          disabled
                        >
                          <span className="icon">
                            <i className="fas fa-check"></i>
                          </span>
                          <span>Berhasil</span>
                        </button>
                      )}
                      {item.status_pembayaran === 'gagal' && (
                        <button 
                          className="button is-danger is-small"
                          disabled
                        >
                          <span className="icon">
                            <i className="fas fa-times"></i>
                          </span>
                          <span>Gagal</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pesanan;
