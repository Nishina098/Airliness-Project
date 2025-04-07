import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const MaskapaiTable = () => {
  const [maskapai, setMaskapai] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMaskapai, setSelectedMaskapai] = useState(null);
  const [newMaskapai, setNewMaskapai] = useState({
    nama_maskapai: '',
    kode_maskapai: '',
    logo_maskapai: null,
    deskripsi: '',
    status_operasional: 'aktif',
    jumlah_pesawat: '',
    nomor_kontak: '',
    email: '',
    website: '',
    password: '',
    confPassword: ''
  });
  const [msg, setMsg] = useState('');
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    getMaskapai();
  }, []);

  const getMaskapai = async () => {
    try {
      const response = await axios.get('http://localhost:5000/maskapai');
      setMaskapai(response.data);
    } catch (error) {
      console.error('Error fetching maskapai:', error);
      showNotification('danger', 'Gagal mengambil data maskapai. Silakan coba lagi.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaskapai(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewMaskapai(prev => ({
      ...prev,
      logo_maskapai: e.target.files[0]
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama_maskapai', newMaskapai.nama_maskapai);
    formData.append('kode_maskapai', newMaskapai.kode_maskapai);
    formData.append('deskripsi', newMaskapai.deskripsi);
    formData.append('status_operasional', newMaskapai.status_operasional);
    formData.append('jumlah_pesawat', newMaskapai.jumlah_pesawat);
    formData.append('nomor_kontak', newMaskapai.nomor_kontak);
    formData.append('email', newMaskapai.email);
    formData.append('website', newMaskapai.website);
    formData.append('password', newMaskapai.password);
    formData.append('confPassword', newMaskapai.confPassword);
    
    if (newMaskapai.logo_maskapai) {
      formData.append('file', newMaskapai.logo_maskapai);
    }

    try {
      if (isEditMode && selectedMaskapai) {
        await axios.patch(`http://localhost:5000/maskapai/${selectedMaskapai.uuid}`, formData);
        showNotification('success', 'Maskapai berhasil diperbarui!');
      } else {
        await axios.post('http://localhost:5000/maskapai', formData);
        showNotification('success', 'Maskapai berhasil ditambahkan!');
      }
      getMaskapai();
      closeModal();
      setMsg('');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        showNotification('danger', error.response.data.msg || 'Gagal menyimpan data maskapai');
      } else {
        showNotification('danger', 'Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  const handleEdit = (maskapai) => {
    setSelectedMaskapai(maskapai);
    setNewMaskapai({
      nama_maskapai: maskapai.nama_maskapai,
      kode_maskapai: maskapai.kode_maskapai,
      logo_maskapai: null,
      deskripsi: maskapai.deskripsi,
      status_operasional: maskapai.status_operasional,
      jumlah_pesawat: maskapai.jumlah_pesawat,
      nomor_kontak: maskapai.nomor_kontak,
      email: maskapai.email,
      website: maskapai.website,
      password: '',
      confPassword: ''
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus maskapai ini?')) {
      try {
        await axios.delete(`http://localhost:5000/maskapai/${uuid}`);
        showNotification('success', 'Maskapai berhasil dihapus!');
        getMaskapai();
      } catch (error) {
        console.error('Error deleting maskapai:', error);
        showNotification('danger', 'Gagal menghapus maskapai. Silakan coba lagi.');
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedMaskapai(null);
    setNewMaskapai({
      nama_maskapai: '',
      kode_maskapai: '',
      logo_maskapai: null,
      deskripsi: '',
      status_operasional: 'aktif',
      jumlah_pesawat: '',
      nomor_kontak: '',
      email: '',
      website: '',
      password: '',
      confPassword: ''
    });
    setMsg('');
  };

  return (
    <div>
      {notification.show && (
        <div className={`notification is-${notification.type} is-light`} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          <button className="delete" onClick={() => setNotification({ show: false, type: '', message: '' })}></button>
          {notification.message}
        </div>
      )}

      <div className="level mb-4">
        <div className="level-left">
          <h1 className="title is-4 has-text-grey">Daftar Maskapai</h1>
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
              <span className="has-text-white">Tambah Maskapai</span>
            </span>
          </button>
        </div>
      </div>

      <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head" style={{ background: '#f5f5f5', borderBottom: '1px solid #dbdbdb' }}>
            <p className="modal-card-title has-text-grey">{isEditMode ? 'Edit Maskapai' : 'Tambah Maskapai Baru'}</p>
            <button className="delete" aria-label="close" onClick={closeModal}></button>
          </header>
          <form onSubmit={handleSubmit}>
            <section className="modal-card-body" style={{ color: '#4a4a4a', background: '#f5f5f5', borderBottom: '1px solid #dbdbdb' }}>
              {msg && <p className="has-text-centered has-text-danger">{msg}</p>}
              <div className="field">
                <label className="label has-text-grey">Nama Maskapai</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="nama_maskapai"
                    value={newMaskapai.nama_maskapai}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Kode Maskapai</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="kode_maskapai"
                    value={newMaskapai.kode_maskapai}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Logo Maskapai</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    onChange={handleFileChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Deskripsi</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="deskripsi"
                    value={newMaskapai.deskripsi}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Status Operasional</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      name="status_operasional"
                      value={newMaskapai.status_operasional}
                      onChange={handleInputChange}
                      style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    >
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Non Aktif</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Jumlah Pesawat</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    name="jumlah_pesawat"
                    value={newMaskapai.jumlah_pesawat}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Nomor Kontak</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="nomor_kontak"
                    value={newMaskapai.nomor_kontak}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    name="email"
                    value={newMaskapai.email}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Website</label>
                <div className="control">
                  <input
                    type="url"
                    className="input"
                    name="website"
                    value={newMaskapai.website}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={newMaskapai.password}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required={!isEditMode}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-grey">Konfirmasi Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="confPassword"
                    value={newMaskapai.confPassword}
                    onChange={handleInputChange}
                    style={{ backgroundColor: 'white', color: '#363636', border: '1px solid #dbdbdb' }}
                    required={!isEditMode}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot" style={{ background: '#f5f5f5', borderTop: '1px solid #dbdbdb' }}>
              <button type="submit" className="button is-success">
                {isEditMode ? 'Simpan Perubahan' : 'Simpan'}
              </button>
              <button type="button" className="button" onClick={closeModal}>
                Batal
              </button>
            </footer>
          </form>
        </div>
      </div>

      <table className="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr className="has-background-primary">
            <th className="has-text-white">No</th>
            <th className="has-text-white">Logo</th>
            <th className="has-text-white">Nama Maskapai</th>
            <th className="has-text-white">Kode</th>
            <th className="has-text-white">Status</th>
            <th className="has-text-white">Jumlah Pesawat</th>
            <th>Kontak</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {maskapai.map((item, index) => (
            <tr key={item.uuid}>
              <td>{index + 1}</td>
              <td>
                <figure className="image is-48x48">
                  <img 
                    src={`http://localhost:5000/images/maskapai/${item.logo_maskapai}`} 
                    alt={item.nama_maskapai} 
                    style={{ maxHeight: '100%', objectFit: 'contain' }} 
                  />
                </figure>
              </td>
              <td>{item.nama_maskapai}</td>
              <td>{item.kode_maskapai}</td>
              <td>
                <span className={`tag ${item.status_operasional === 'aktif' ? 'is-success' : 'is-danger'}`}>
                  {item.status_operasional}
                </span>
              </td>
              <td>{item.jumlah_pesawat}</td>
              <td>{item.nomor_kontak}</td>
              <td>{item.email}</td>
              <td>
                <div className="buttons">
                  <button className="button is-info is-small" onClick={() => handleEdit(item)}>
                    <span className="icon">
                      <FaEdit />
                    </span>
                  </button>
                  <button className="button is-danger is-small" onClick={() => handleDelete(item.uuid)}>
                    <span className="icon">
                      <FaTrash />
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaskapaiTable;
