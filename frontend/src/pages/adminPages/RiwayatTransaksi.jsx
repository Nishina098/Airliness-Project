import React, { useState } from 'react';
import Layout from '../Layout';
import RiwayatTable from '../../components/admin/riwayatTable';
import '../../App.css';

const RiwayatTransaksi = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="has-background-white">
            <Layout>
                <div className="container" style={{ marginLeft: '200px', marginTop: '100px', padding: '60px' }}>
                    <div className="mb-4 is-flex is-justify-content-space-between is-align-items-center">
                        <h1 className="title has-text-centered" style={{ color: "#0095DA" }}>Riwayat Transaksi</h1>
                        
                        <div className="field">
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Cari berdasarkan kode booking..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '300px', color: "#000" }}
                                />
                                <span className="icon is-left">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                
                    <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                        <RiwayatTable searchTerm={searchTerm} />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default RiwayatTransaksi;


