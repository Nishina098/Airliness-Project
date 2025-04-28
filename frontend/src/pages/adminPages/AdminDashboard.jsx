import React, { useState, useEffect } from 'react';
import '../../App.css';
import Layout from '../Layout';
import { FaUsers, FaPlane, FaMoneyBillWave } from 'react-icons/fa';
import { BsReceiptCutoff } from 'react-icons/bs';
import { MdPendingActions, MdCancel, MdCheckCircle } from 'react-icons/md';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFlights: 0,
    totalTransactions: 0,
    successTransactions: 0,
    pendingTransactions: 0,
    failedTransactions: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    if (!price) return 'Rp 0,00';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching statistics...");
        const response = await axios.get('http://localhost:5000/stats', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log("Stats response:", response.data);
        
        if (response.data) {
          setStats({
            totalUsers: response.data.totalUsers || 0,
            totalFlights: response.data.totalPenerbangan || 0,
            totalTransactions: response.data.totalTransaksi || 0,
            successTransactions: response.data.successTransactions || 0,
            pendingTransactions: response.data.pendingTransactions || 0,
            failedTransactions: response.data.failedTransactions || 0,
            totalRevenue: response.data.totalRevenue || 0
          });
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        let errorMessage = 'Gagal memuat data statistik';
        
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = 'Anda harus login terlebih dahulu';
          } else if (error.response.status === 403) {
            errorMessage = 'Anda tidak memiliki akses ke halaman ini';
          } else if (error.response.data && error.response.data.msg) {
            errorMessage = error.response.data.msg;
          }
        } else if (error.request) {
          errorMessage = 'Tidak dapat terhubung ke server';
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="has-background-white">
        <Layout>
          <div className="column" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
            <div className="has-text-centered">
              <div className="button is-loading is-large"></div>
              <p className="mt-2">Memuat data statistik...</p>
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  if (error) {
    return (
      <div className="has-background-white">
        <Layout>
          <div className="column" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
            <div className="notification is-danger">
              <p>{error}</p>
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <div className="has-background-white">
      <Layout>
        <div className="column" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-centered mb-6" style={{ color: "#0095DA" }}>
                Dashboard Admin
              </h1>

              {/* Main Stats */}
              <div className="columns is-multiline">
                {/* Total Users */}
                <div className="column is-3">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level">
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Total Pengguna</p>
                          <p className="title is-4" style={{ color: "#0095DA" }}>{stats.totalUsers}</p>
                        </div>
                      </div>
                      <div className="level-right">
                        <span className="icon is-large has-text-info">
                          <FaUsers size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Flights */}
                <div className="column is-3">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level">
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Total Penerbangan</p>
                          <p className="title is-4" style={{ color: "#0095DA" }}>{stats.totalFlights}</p>
                        </div>
                      </div>
                      <div className="level-right">
                        <span className="icon is-large has-text-info">
                          <FaPlane size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Transactions */}
                <div className="column is-3">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level">
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Total Transaksi</p>
                          <p className="title is-4" style={{ color: "#0095DA" }}>{stats.totalTransactions}</p>
                        </div>
                      </div>
                      <div className="level-right">
                        <span className="icon is-large has-text-info">
                          <BsReceiptCutoff size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="column is-3">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level" style={{ marginBottom: 0 }}>
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Total Pendapatan</p>
                          <p className="title is-4 has-text-success">{formatPrice(stats.totalRevenue)}</p>
                        </div>
                      </div>
                      <div className="level-right" style={{ marginLeft: '10px' }}>
                        <span className="icon is-large has-text-success">
                          <FaMoneyBillWave size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transaction Status */}
                <div className="column is-4">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level" style={{ marginBottom: 0 }}>
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Transaksi Berhasil</p>
                          <p className="title is-4 has-text-success">{stats.successTransactions}</p>
                        </div>
                      </div>
                      <div className="level-right" style={{ marginLeft: '10px' }}>
                        <span className="icon is-large has-text-success">
                          <MdCheckCircle size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-4">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level" style={{ marginBottom: 0 }}>
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Transaksi Pending</p>
                          <p className="title is-4 has-text-warning">{stats.pendingTransactions}</p>
                        </div>
                      </div>
                      <div className="level-right" style={{ marginLeft: '10px' }}>
                        <span className="icon is-large has-text-warning">
                          <MdPendingActions size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-4">
                  <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <div className="level" style={{ marginBottom: 0 }}>
                      <div className="level-left">
                        <div>
                          <p className="heading has-text-grey">Transaksi Gagal</p>
                          <p className="title is-4 has-text-danger">{stats.failedTransactions}</p>
                        </div>
                      </div>
                      <div className="level-right" style={{ marginLeft: '10px' }}>
                        <span className="icon is-large has-text-danger">
                          <MdCancel size={30} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="box mt-6 has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <p className="has-text-centered has-text-weight-bold mb-4" style={{ color: "#0095DA" }}>
                  Selamat Datang di Dashboard Admin
                </p>
                <p className="has-text-grey has-text-centered">
                  Di sini Anda dapat melihat ringkasan data dan statistik penting tentang pengguna, penerbangan, dan transaksi.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
