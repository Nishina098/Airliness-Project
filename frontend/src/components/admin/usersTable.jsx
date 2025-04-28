import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    nm_user: '',
    username: '',
    email_user: '',
    password: '',
    confPassword: '',
    role: 'pelanggan',
    img_user: null
  });
  const [editUser, setEditUser] = useState({
    uuid: '',
    nm_user: '',
    username: '',
    email_user: '',
    password: '',
    confPassword: '',
    role: 'pelanggan',
    img_user: null
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewUser(prev => ({
      ...prev,
      img_user: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newUser.nm_user);
      formData.append('title1', newUser.username);
      formData.append('title2', newUser.email_user);
      formData.append('title3', newUser.password);
      formData.append('title4', newUser.confPassword);
      formData.append('title5', 'pelanggan');
      if (newUser.img_user) {
        formData.append('file', newUser.img_user);
      }

      await axios.post('http://localhost:5000/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsModalOpen(false);
      setNewUser({
        nm_user: '',
        username: '',
        email_user: '',
        password: '',
        confPassword: '',
        role: 'pelanggan',
        img_user: null
      });
      fetchUsers();
      alert('User berhasil ditambahkan!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Gagal menambahkan user. Silakan coba lagi.');
    }
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        await axios.delete(`http://localhost:5000/users/${uuid}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(users.filter(user => user.uuid !== uuid));
        alert('User berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.response?.data?.msg || 'Gagal menghapus pengguna. Silakan coba lagi.');
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser({
      uuid: user.uuid,
      nm_user: user.nm_user,
      username: user.username,
      email_user: user.email_user,
      password: '',
      confPassword: '',
      role: user.role,
      img_user: null
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFileChange = (e) => {
    setEditUser(prev => ({
      ...prev,
      img_user: e.target.files[0]
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Validasi input yang diperlukan
    if (!editUser.nm_user || !editUser.username || !editUser.email_user) {
      alert('Nama, username, dan email harus diisi!');
      return;
    }

    if (editUser.password && editUser.password !== editUser.confPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', editUser.nm_user);
      formData.append('title1', editUser.username);
      formData.append('title2', editUser.email_user);
      if (editUser.password) {
        formData.append('title3', editUser.password);
        formData.append('title4', editUser.confPassword);
      }
      formData.append('title5', editUser.role);
      if (editUser.img_user) {
        formData.append('file', editUser.img_user);
      }

      await axios.patch(`http://localhost:5000/users/${editUser.uuid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setIsEditModalOpen(false);
      fetchUsers();
      alert('User berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.response?.data?.msg || 'Gagal memperbarui user. Silakan coba lagi.');
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
        <div className="level-right">
          <button 
            className="button is-success"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="icon-text">
              <span className="icon">
                <FaPlus />
              </span>
              <span className="has-text-white">Tambah User</span>
            </span>
          </button>
        </div>
      </div>

      <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head" style={{ background: '#f5f5f5', borderBottom: '1px solid #dbdbdb' }}>
            <p className="modal-card-title has-text-grey">Tambah Pelanggan Baru</p>
            <button 
              className="delete" 
              aria-label="close"
              onClick={() => setIsModalOpen(false)}
            ></button>
          </header>
          <form onSubmit={handleSubmit}>
            <section className="modal-card-body" style={{ color: '#4a4a4a', background: '#f5f5f5', borderBottom: '1px solid #dbdbdb' }}>
              <div className="field" >
                <label className="label has-text-grey">Nama</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="nm_user"
                    value={newUser.nm_user}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email_user"
                    value={newUser.email_user}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Konfirmasi Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="confPassword"
                    value={newUser.confPassword}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Foto Profil</label>
                <div className="control">
                  <input
                    className="input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot" style={{ background: '#f5f5f5', borderTop: '1px solid #dbdbdb' }}>
              <button type="submit" className="button is-success">
                <span className="has-text-white">Simpan</span>
              </button>
              <button 
                type="button" 
                className="button"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="has-text-grey">Batal</span>
              </button>
            </footer>
          </form>
        </div>
      </div>

      {/* Edit User Modal */}
      <div className={`modal ${isEditModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setIsEditModalOpen(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head" style={{ background: '#f5f5f5', borderBottom: '1px solid #dbdbdb' }}>
            <p className="modal-card-title has-text-grey">Edit Pelanggan</p>
            <button 
              className="delete" 
              aria-label="close"
              onClick={() => setIsEditModalOpen(false)}
            ></button>
          </header>
          <form onSubmit={handleUpdate}>
            <section className="modal-card-body" style={{ color: '#4a4a4a', background: '#f5f5f5', borderBottom: '1px solid #dbdbdb' }}>
              <div className="field">
                <label className="label has-text-grey">Nama</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="nm_user"
                    value={editUser.nm_user}
                    onChange={handleEditInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="username"
                    value={editUser.username}
                    onChange={handleEditInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email_user"
                    value={editUser.email_user}
                    onChange={handleEditInputChange}
                    required
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Password (Kosongkan jika tidak ingin mengubah)</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    value={editUser.password}
                    onChange={handleEditInputChange}
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Konfirmasi Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="confPassword"
                    value={editUser.confPassword}
                    onChange={handleEditInputChange}
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label has-text-grey">Foto Profil</label>
                <div className="control">
                  <input
                    className="input"
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileChange}
                    style={{ 
                      backgroundColor: '#fff',
                      color: '#4a4a4a',
                      border: '1px solid #dbdbdb'
                    }}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot" style={{ background: '#f5f5f5', borderTop: '1px solid #dbdbdb' }}>
              <button type="submit" className="button is-info">
                <span className="has-text-white">Update</span>
              </button>
              <button 
                type="button" 
                className="button"
                onClick={() => setIsEditModalOpen(false)}
              >
                <span className="has-text-grey">Batal</span>
              </button>
            </footer>
          </form>
        </div>
      </div>

      <div className="table-container">
        <table className="table is-fullwidth is-striped is-holverabe">
          <thead>
            <tr className="has-background-primary">
              <th className="has-text-white">No</th>
              <th className="has-text-white">Foto</th>
              <th className="has-text-white">Nama</th>
              <th className="has-text-white">Username</th>
              <th className="has-text-white">Email</th>
              <th className="has-text-white">Role</th>
              <th className="has-text-white">Aksi</th>
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
                  <td>
                    <div className="buttons">
                      <button className="button is-info is-small" onClick={() => handleEdit(user)}>
                        <span className="icon">
                          <FaEdit />
                        </span>
                      </button>
                      <button className="button is-danger is-small" onClick={() => handleDelete(user.uuid)}>
                        <span className="icon">
                          <FaTrash />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="has-text-centered has-text-grey">
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

export default UsersTable;