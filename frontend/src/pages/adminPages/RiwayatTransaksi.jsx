import React from 'react';
import Layout from '../Layout';
import RiwayatTable from '../../components/admin/riwayatTable';
import '../../App.css';

const RiwayatTransaksi = () => {
    return (
        <div className="has-background-white">
            <Layout>
                <div className="container" style={{ marginLeft: '240px', marginTop: '100px', padding: '60px' }}>
                    <div className="mb-4">
                        <h1 className="title has-text-centered" style={{ color: "#0095DA" }}>Riwayat Transaksi</h1>
                    </div>
                
                    <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                        <RiwayatTable />
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default RiwayatTransaksi;


