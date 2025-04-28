import React from 'react';
import Layout from '../Layout';
import TransaksiTable from '../../components/admin/transaksiTable';

const Transaksi = () => {
    return (
        <div className='has-background-white'>
            <Layout>
                <div className="column is-four-fifths" style={{ marginLeft: '200px', marginTop: '80px', padding: '20px' }}>
                    <section className="section">
                        <div className="container">
                            <h1 className="title has-text-centered has-text-grey">
                                Manajemen Transaksi
                            </h1>
                            <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                                <p className="has-text-centered has-text-weight-bold has-text-grey">
                                    Kelola data transaksi tiket pesawat di sini.
                                </p>
                                <div className="mt-4">
                                    <TransaksiTable />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </div>
    );
};

export default Transaksi;
