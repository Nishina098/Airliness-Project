import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersTableMaskapai = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Gagal mengambil data pengguna. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="has-text-centered">
        <div className="button is-loading is-large"></div>
        <p className="mt-2">Memuat data pengguna...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notification is-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="level mb-4">
        <div className="level-left">
          <h1 className="title is-4 has-text-grey">Daftar Pelanggan</h1>
        </div>
      </div>

      <div className="table-container">
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr className="has-background-primary">
              <th className="has-text-white">No</th>
              <th className="has-text-white">Foto</th>
              <th className="has-text-white">Nama</th>
              <th className="has-text-white">Username</th>
              <th className="has-text-white">Email</th>
              <th className="has-text-white">Role</th>
            </tr>
          </thead>
          <tbody className="has-text-grey">
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.uuid}>
                  <td>{index + 1}</td>
                  <td>
                    <figure className="image is-32x32">
                      <img
                        src={user.url_user || "https://via.placeholder.com/32"}
                        alt="Foto Profil"
                        className="is-rounded"
                      />
                    </figure>
                  </td>
                  <td>{user.nm_user}</td>
                  <td>{user.username}</td>
                  <td>{user.email_user}</td>
                  <td>
                    <span className={`tag ${user.role === "admin" ? "is-danger" : "is-info"}`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="has-text-centered has-text-grey">
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTableMaskapai;