import React from 'react';
import Layout from '../Layout';
import MaskapaiTable from '../../components/admin/maskapaiTable';

const MaskapaiAdmin = () => {
  return (
    <div className='has-background-white'>
      <Layout>
        <div className="column" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
          <h1 className="title has-text-centered mb-6" style={{ color: "#0095DA" }}>
            Manajemen Maskapai
          </h1>
          <div className="box has-background-white" style={{ borderRadius: "15px" }}>
            <p className="has-text-centered has-text-grey mb-4">
              Kelola data maskapai penerbangan di sini
            </p>
            <MaskapaiTable />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MaskapaiAdmin;
