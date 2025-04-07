import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Pesanan = () => {
  const navigate = useNavigate();
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPesanan();
  }, []);

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
        <div className="mb-4">
          <button 
            className="button is-light" 
            onClick={() => navigate('/')}
            style={{ marginBottom: '1rem' }}
          >
            <span className="icon">
              <i className="fas fa-arrow-left"></i>
            </span>
            <span>Kembali ke Beranda</span>
          </button>
        </div>

        <h1 className="title has-text-centered" style={{ color: "#0095DA" }}>Riwayat Pesanan</h1>

        {pesanan.length === 0 ? (
          <div className="notification has-text-centered">
            Anda belum memiliki pesanan
          </div>
        ) : (
          <div className="columns is-multiline">
            {pesanan.map((item) => (
              <div key={item.id_transaksi} className="column is-6">
                <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                  <div className="content">
                    <h2 className="subtitle has-text-weight-bold" style={{ color: "#0095DA" }}>
                      Kode Booking: {item.kode_booking}
                    </h2>
                    
                    <div className="mb-4">
                      <p><strong>Status:</strong> 
                        <span className={`tag ${item.status_pembayaran === 'pending' ? 'is-warning' : 
                                        item.status_pembayaran === 'berhasil' ? 'is-success' : 'is-danger'}`}>
                          {item.status_pembayaran === 'pending' ? 'Menunggu Pembayaran' :
                           item.status_pembayaran === 'berhasil' ? 'Pembayaran Berhasil' : 'Pembayaran Gagal'}
                        </span>
                      </p>
                      <p><strong>Tanggal Pemesanan:</strong> {new Date(item.tanggal_pemesanan).toLocaleDateString('id-ID')}</p>
                      <p><strong>Jumlah Tiket:</strong> {item.jumlah_tiket}</p>
                      <p><strong>Total Harga:</strong> {formatPrice(item.total_harga)}</p>
                      <p><strong>Metode Pembayaran:</strong> {item.metode_pembayaran}</p>
                    </div>

                    <div className="buttons">
                      {item.status_pembayaran === 'pending' && (
                        <button 
                          className="button is-danger"
                          onClick={() => handleBatalkanPesanan(item.id_transaksi)}
                        >
                          <span className="icon">
                            <i className="fas fa-times"></i>
                          </span>
                          <span>Batalkan Pesanan</span>
                        </button>
                      )}
                      {item.status_pembayaran === 'pending' && (
                        <button 
                          className="button is-primary"
                          onClick={() => handleBayarSekarang(item.id_transaksi)}
                        >
                          <span className="icon">
                            <i className="fas fa-credit-card"></i>
                          </span>
                          <span>Bayar Sekarang</span>
                        </button>
                      )}
                      {item.status_pembayaran === 'berhasil' && (
                        <button 
                          className="button is-success"
                          disabled
                        >
                          <span className="icon">
                            <i className="fas fa-check"></i>
                          </span>
                          <span>Pembayaran Berhasil</span>
                        </button>
                      )}
                      {item.status_pembayaran === 'gagal' && (
                        <button 
                          className="button is-danger"
                          disabled
                        >
                          <span className="icon">
                            <i className="fas fa-times"></i>
                          </span>
                          <span>Pembayaran Gagal</span>
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
