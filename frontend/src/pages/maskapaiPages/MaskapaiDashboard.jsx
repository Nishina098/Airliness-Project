import React, { useState, useEffect } from 'react';
import '../../App.css';
import LayoutMaskapai from '../LayoutMaskapai';
import { FaUsers, FaPlane, FaMoneyBillWave } from 'react-icons/fa';
import { BsReceiptCutoff } from 'react-icons/bs';
import { MdPendingActions, MdCancel, MdCheckCircle } from 'react-icons/md';

const MaskapaiDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFlights: 0,
    totalTransactions: 0,
    successTransactions: 0,
    pendingTransactions: 0,
    failedTransactions: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Nanti bisa diganti dengan real API calls
    setStats({
      totalUsers: 11,
      totalFlights: 2,
      totalTransactions: 3,
      successTransactions: 3,
      pendingTransactions: 0,
      failedTransactions: 3,
      totalRevenue: 4000000
    });
  }, []);

  return (
    <div className="has-background-white">
      <LayoutMaskapai>
        <div className="column" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-centered has-text-grey" style={{ color: "#0095DA" }}>
                Dashboard Maskapai
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
                          <p className="title is-4 has-text-success">Rp {stats.totalRevenue.toLocaleString()}</p>
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

              {/* Additional Info or Charts can be added here */}
              <div className="box mt-6 has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <p className="has-text-centered has-text-weight-bold mb-4" style={{ color: "#0095DA" }}>
                  Selamat Datang di Dashboard Maskapai
                </p>
                <p className="has-text-grey has-text-centered">
                  Di sini Anda dapat melihat ringkasan data dan statistik penting tentang pengguna, penerbangan, dan transaksi.
                </p>
              </div>
            </div>
          </section>
        </div>
      </LayoutMaskapai>
    </div>
  );
};

export default MaskapaiDashboard;