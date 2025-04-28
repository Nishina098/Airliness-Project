import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [penerbangan, setPenerbangan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    jumlah_tiket: 1,
    metode_pembayaran: 'transfer_bank'
  });

  useEffect(() => {
    fetchPenerbangan();
  }, [id]);

  const fetchPenerbangan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/penerbangan/${id}`, {
        withCredentials: true
      });
      setPenerbangan(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching penerbangan:', error);
      setError('Gagal memuat data penerbangan');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Cek apakah user sudah login
      const sessionResponse = await axios.get('http://localhost:5000/session', {
        withCredentials: true
      });

      if (!sessionResponse.data.userId) {
        alert('Silakan login terlebih dahulu untuk melakukan pemesanan');
        navigate('/login');
        return;
      }

      // Validasi jumlah tiket
      if (formData.jumlah_tiket > penerbangan.kapasitas) {
        alert('Jumlah tiket melebihi kapasitas penerbangan');
        return;
      }

      // Hitung total harga
      const totalHarga = penerbangan.harga * formData.jumlah_tiket;

      // Generate kode booking
      const kodeBooking = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;

      // Buat transaksi
      const response = await axios.post('http://localhost:5000/transaksi', {
        id_penerbangan: id,
        uuid_user: sessionResponse.data.userId,
        kode_booking: kodeBooking,
        jumlah_tiket: formData.jumlah_tiket,
        total_harga: totalHarga,
        status_pembayaran: 'pending',
        metode_pembayaran: formData.metode_pembayaran === 'transfer_bank' ? 'transfer' : 
                          formData.metode_pembayaran === 'kartu_kredit' ? 'kartu kredit' : 
                          formData.metode_pembayaran === 'e_wallet' ? 'e-wallet' : 'transfer'
      }, {
        withCredentials: true
      });

      alert('Pemesanan berhasil! Silakan lakukan pembayaran.');
      navigate('/pesanan');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.response?.data?.msg || 'Gagal melakukan pemesanan. Silakan coba lagi.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (loading) return <div className="has-text-centered">Memuat data...</div>;
  if (error) return <div className="notification is-danger">{error}</div>;
  if (!penerbangan) return <div className="has-text-centered">Data penerbangan tidak ditemukan</div>;

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
        <h1 className="title has-text-centered" style={{ color: "#0095DA" }}>Form Pemesanan</h1>
        
        <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <div className="columns">
            <div className="column">
              <h2 className="subtitle has-text-weight-bold" style={{ color: "#0095DA" }}>Detail Penerbangan</h2>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Maskapai:</strong> {penerbangan.maskapai}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Kode Penerbangan:</strong> {penerbangan.kode_penerbangan}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Dari:</strong> {penerbangan.dari}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Ke:</strong> {penerbangan.ke}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Tanggal Berangkat:</strong> {new Date(penerbangan.tanggal_berangkat).toLocaleDateString('id-ID')}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Durasi:</strong> {penerbangan.durasi_penerbangan}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Harga per Tiket:</strong> {formatPrice(penerbangan.harga)}</p>
              <p style={{ color: '#000' }}><strong style={{ color: '#000' }}>Kapasitas:</strong> {penerbangan.kapasitas}</p>
            </div>
            
            <div className="column">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label" style={{ color: '#000' }}>Jumlah Tiket</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input has-text-black"
                      name="jumlah_tiket"
                      value={formData.jumlah_tiket}
                      onChange={handleInputChange}
                      min="1"
                      max={penerbangan.kapasitas}
                      required
                    />
                  </div>
                  <p className="help" style={{ color: '#000' }}>Maksimal {penerbangan.kapasitas} tiket</p>
                </div>

                <div className="field">
                  <label className="label" style={{ color: '#000' }}>Metode Pembayaran</label>
                  <div className="control">
                    <div className="select is-fullwidth has-background-white">
                      <select 
                        name="metode_pembayaran" 
                        className="has-background-white has-text-black"
                        value={formData.metode_pembayaran} 
                        onChange={handleInputChange}
                        required
                      >
                        <option value="transfer_bank">Transfer Bank</option>
                        <option value="e_wallet">E-Wallet</option>
                        <option value="kartu_kredit">Kartu Kredit</option>
                        <option value="virtual_account">Virtual Account</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <button type="submit" className="button is-fullwidth" style={{ backgroundColor: "#0095DA", color: "white" }}>
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking; 