import React from 'react';
import Layout from '../Layout';
import PenerbanganTable from '../../components/admin/penerbanganTable';

const Penerbangan = () => {
    return (
        <div className='has-background-white'>
          <Layout>
            <div className="column" style={{ 
              marginLeft: '220px', 
              marginRight: '-60px', 
             marginTop: '80px', 
              padding: '40px'
            }}>
              <section className="section">
                <div className="container">
                  <h1 className="title has-text-centered has-text-grey" >
                    Manajemen Penerbangan
                  </h1>
                  <div className="box has-background-white" style={{ 
                    borderRadius: "12px", 
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  }}>
                    <p className="has-text-centered has-text-weight-bold has-text-grey" >
                      Kelola data penerbangan sistem di sini.
                    </p>
                    <div className="mt-4">
                      <PenerbanganTable />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Layout>
        </div>
    );
};
export default Penerbangan;
