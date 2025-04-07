import React from 'react';
import LayoutMaskapai from '../LayoutMaskapai';
import RiwayatTableMaskapai from '../../components/maskapai/riwayatTableMaskapai';
import '../../App.css';

const RiwayatTransaksiMaskapai = () => {
    return (
        <div className="has-background-white">
            <LayoutMaskapai>
                <div className="container" style={{ marginLeft: '240px', marginTop: '100px', padding: '60px' }}>
                    <div className="mb-4">
                        <h1 className="title has-text-centered has-text-grey" style={{ color: "#0095DA" }}>Riwayat Transaksi</h1>
                    </div>
                
                    <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                        <RiwayatTableMaskapai />
                    </div>
                </div>
            </LayoutMaskapai>
        </div>
    );
};

export default RiwayatTransaksiMaskapai;


