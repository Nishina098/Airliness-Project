import React from 'react';
import LayoutMaskapai from '../LayoutMaskapai';
import UsersTableMaskapai from '../../components/maskapai/usersTableMaskapai';

const UsersMaskapai = () => {
  return (
    <div className='has-background-white'>
      <LayoutMaskapai>
        <div className="column is-four-fifths" style={{ marginLeft: '250px', marginTop: '80px', padding: '20px' }}>
          <section className="section">
            <div className="container">
              <h1 className="title has-text-centered has-text-grey" >
                Manajemen Pengguna
              </h1>
              <div className="box has-background-white" style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <p className="has-text-centered has-text-weight-bold has-text-grey" >
                  Kelola data pengguna sistem di sini.
                </p>
                <div className="mt-4">
                  <UsersTableMaskapai />
                </div>
              </div>
            </div>
          </section>
        </div>
      </LayoutMaskapai>
    </div>
  );
};

export default UsersMaskapai; 