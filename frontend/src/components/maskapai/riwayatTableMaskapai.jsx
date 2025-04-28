import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RiwayatTableMaskapai = ({ searchTerm }) => {
    const [riwayat, setRiwayat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRiwayat();
    }, []);

    const getRiwayat = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching riwayat data...');
            
            const response = await axios.get('http://localhost:5000/transaksi/maskapai/riwayat', {
                withCredentials: true
            });
            setRiwayat(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError(error.response?.data?.msg || 'Terjadi kesalahan saat mengambil data transaksi');
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending':
                return 'is-warning';
            case 'berhasil':
                return 'is-success';
            case 'gagal':
                return 'is-danger';
            default:
                return 'is-light';
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    if (loading) {
        return <div className="has-text-centered">Memuat data...</div>;
    }

    if (error) {
        return <div className="notification is-danger">{error}</div>;
    }

    // Filter transaksi yang sudah selesai (status_tiket = 'aktif' atau status_pembayaran = 'gagal')
    let filteredRiwayat = riwayat.filter(r => 
        r.status_tiket === 'aktif' || r.status_pembayaran === 'gagal'
    );

    // Jika ada searchTerm, filter berdasarkan kode booking
    if (searchTerm) {
        filteredRiwayat = filteredRiwayat.filter(r => 
            r.kode_booking.toLowerCase() === searchTerm.toLowerCase()
        );
    }

    return (
        <div className="table-container">
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>Kode Booking</th>
                        <th>Email Pengguna</th>
                        <th>Penerbangan</th>
                        <th>Jumlah Tiket</th>
                        <th>Total Harga</th>
                        <th>Status Pembayaran</th>
                        <th>Status Tiket</th>
                        <th>Tanggal Transaksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRiwayat.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="has-text-centered">
                                {searchTerm ? 'Tidak ditemukan transaksi dengan kode booking tersebut' : 'Tidak ada data riwayat transaksi'}
                            </td>
                        </tr>
                    ) : (
                        filteredRiwayat.map((r) => (
                            <tr key={r.id_transaksi}>
                                <td>{r.kode_booking}</td>
                                <td>{r.user?.email_user || 'N/A'}</td>
                                <td>{r.penerbangan?.kode_penerbangan || 'N/A'} - {r.penerbangan?.maskapai || 'N/A'}</td>
                                <td>{r.jumlah_tiket}</td>
                                <td>{formatPrice(r.total_harga)}</td>
                                <td>
                                    <span className={`tag ${getStatusColor(r.status_pembayaran)}`}>
                                        {r.status_pembayaran === 'pending' ? 'Menunggu Pembayaran' :
                                         r.status_pembayaran === 'berhasil' ? 'Pembayaran Berhasil' : 'Pembayaran Gagal'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`tag ${r.status_tiket === 'aktif' ? 'is-success' : 'is-danger'}`}>
                                        {r.status_tiket === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                    </span>
                                </td>
                                <td>{new Date(r.tanggal_transaksi).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RiwayatTableMaskapai;
