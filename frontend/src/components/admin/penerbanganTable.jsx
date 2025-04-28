import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";
import axios from 'axios';

const PenerbanganTable = () => {
  const [penerbangan, setPenerbangan] = useState([]);
  const [maskapai, setMaskapai] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPenerbangan, setEditPenerbangan] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userMaskapai, setUserMaskapai] = useState(null);
  const [newPenerbangan, setNewPenerbangan] = useState({
    kode_penerbangan: '',
    maskapai: '',
    dari: '',
    ke: '',
    tanggal_berangkat: '',
    durasi_penerbangan: '',
    harga: '',
    kapasitas: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // 'success' atau 'error'

  const kotaList = [
    'Jakarta', 'Surabaya', 'Medan', 'Bandung', 'Yogyakarta', 'Semarang', 
    'Makassar', 'Denpasar', 'Manado', 'Padang', 'Palembang', 'Banjarmasin'
  ];

  useEffect(() => {
    fetchUserInfo();
    fetchPenerbangan();
    fetchMaskapai();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/session', {
        withCredentials: true
      });
      setUserRole(response.data.role);
      setUserMaskapai(response.data.nama_maskapai);
      
      // Set nilai awal maskapai jika user adalah maskapai
      if (response.data.role === 'maskapai') {
        setNewPenerbangan(prev => ({
          ...prev,
          maskapai: response.data.nama_maskapai
        }));
      }
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

  const fetchMaskapai = async () => {
    try {
      const response = await axios.get('http://localhost:5000/maskapai', {
        withCredentials: true
      });
      setMaskapai(response.data);
    } catch (error) {
      console.error('Error fetching maskapai:', error);
    }
  };

  const fetchPenerbangan = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/penerbangan', {
        withCredentials: true
      });
      setPenerbangan(response.data);
      setError(null);
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      setError(error.response?.data?.msg || 'Gagal mengambil data penerbangan');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditModalOpen) {
      setEditPenerbangan(prev => ({ ...prev, [name]: value }));
    } else {
      setNewPenerbangan(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (data) => {
    // Validasi kode penerbangan (format: XX-XXXX)
    const kodeRegex = /^[A-Z]{2}-\d{4}$/;
    if (!kodeRegex.test(data.kode_penerbangan)) {
      setError('Kode penerbangan harus dalam format XXX-XXXX (contoh: GAA-1234)');
      return false;
    }

    // Validasi durasi penerbangan (format: X jam Y menit)
    const durasiRegex = /^\d+\s+jam\s+\d+\s+menit$/;
    if (!durasiRegex.test(data.durasi_penerbangan)) {
      setError('Durasi penerbangan harus dalam format "X jam Y menit"');
      return false;
    }

    // Validasi tanggal berangkat
    const selectedDate = new Date(data.tanggal_berangkat);
    const now = new Date();
    if (selectedDate < now) {
      setError('Tanggal berangkat tidak boleh di masa lalu');
      return false;
    }

    // Validasi harga
    if (data.harga <= 0) {
      setError('Harga harus lebih dari 0');
      return false;
    }

    // Validasi kapasitas
    if (data.kapasitas <= 0 || data.kapasitas > 500) {
      setError('Kapasitas harus antara 1 dan 500');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setNewPenerbangan({
      kode_penerbangan: '',
      maskapai: userRole === 'administrator' ? '' : userMaskapai,
      dari: '',
      ke: '',
      tanggal_berangkat: '',
      durasi_penerbangan: '',
      harga: '',
      kapasitas: ''
    });
    setEditPenerbangan(null);
    setError(null);
  };

  const showAlertMessage = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm(newPenerbangan)) {
        showAlertMessage(error, 'error');
        return;
      }
      
      // Jika user adalah maskapai, set maskapai sesuai dengan nama maskapai mereka
      if (userRole === 'maskapai') {
        newPenerbangan.maskapai = userMaskapai;
      }
      
      await axios.post('http://localhost:5000/penerbangan', newPenerbangan, {
        withCredentials: true
      });
      showAlertMessage('Penerbangan berhasil ditambahkan!');
      fetchPenerbangan();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      showAlertMessage(error.response?.data?.msg || 'Gagal menambah penerbangan', 'error');
    }
  };

  const handleEdit = (data) => {
    // Cek apakah user memiliki akses ke data ini
    if (userRole === 'maskapai' && data.maskapai !== userMaskapai) {
      setError('Anda tidak memiliki akses ke data ini');
      return;
    }
    // Format tanggal berangkat ke format yang sesuai untuk input datetime-local
    const formattedData = {
      ...data,
      tanggal_berangkat: new Date(data.tanggal_berangkat).toISOString().slice(0, 16)
    };
    setEditPenerbangan(formattedData);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm(editPenerbangan)) {
        showAlertMessage(error, 'error');
        return;
      }
      
      // Jika user adalah maskapai, pastikan maskapai tidak diubah
      if (userRole === 'maskapai') {
        editPenerbangan.maskapai = userMaskapai;
      }
      
      await axios.patch(`http://localhost:5000/penerbangan/${editPenerbangan.id}`, editPenerbangan, {
        withCredentials: true
      });
      showAlertMessage('Penerbangan berhasil diupdate!');
      fetchPenerbangan();
      setIsEditModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      showAlertMessage(error.response?.data?.msg || 'Gagal mengupdate penerbangan', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus penerbangan ini?')) {
      try {
        await axios.delete(`http://localhost:5000/penerbangan/${id}`, {
          withCredentials: true
        });
        showAlertMessage('Penerbangan berhasil dihapus!');
        fetchPenerbangan();
      } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        showAlertMessage(error.response?.data?.msg || 'Gagal menghapus penerbangan', 'error');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (loading) return <div className="has-text-centered">Memuat data...</div>;

  return (
    <div>
      {showAlert && (
        <div className={`notification ${alertType === 'success' ? 'is-success' : 'is-danger'} is-light`} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          maxWidth: '400px'
        }}>
          <button className="delete" onClick={() => setShowAlert(false)}></button>
          {alertMessage}
        </div>
      )}
      
      {(userRole === 'administrator' || userRole === 'maskapai') && (
        <button className="button is-success mb-4" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Tambah Penerbangan
        </button>
      )}

      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Maskapai</th>
              <th>Dari</th>
              <th>Ke</th>
              <th>Tanggal</th>
              <th>Durasi</th>
              <th>Harga</th>
              <th>Kapasitas</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penerbangan.map((penerbangan) => (
              <tr key={penerbangan.id}>
                <td>{penerbangan.kode_penerbangan}</td>
                <td>{penerbangan.maskapai}</td>
                <td>{penerbangan.dari}</td>
                <td>{penerbangan.ke}</td>
                <td>{new Date(penerbangan.tanggal_berangkat).toLocaleDateString('id-ID')}</td>
                <td>{penerbangan.durasi_penerbangan}</td>
                <td>{formatPrice(penerbangan.harga)}</td>
                <td>{penerbangan.kapasitas}</td>
                <td>
                  {(userRole === 'administrator' || (userRole === 'maskapai' && penerbangan.maskapai === userMaskapai)) && (
                    <>
                      <button 
                        className="button is-small is-info mr-2" 
                        onClick={() => handleEdit(penerbangan)}
                      >
                        <FaPen />
                      </button>
                      <button 
                        className="button is-small is-danger" 
                        onClick={() => handleDelete(penerbangan.id)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal Tambah */}
      <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setIsModalOpen(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" style={{ color: '#fffff' }}>Tambah Penerbangan</p>
            <button className="delete" onClick={() => setIsModalOpen(false)}></button>
          </header>
          <form onSubmit={handleSubmit}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Kode Penerbangan</label>
                <div className="control">
                  <input 
                    type="text" 
                    name="kode_penerbangan" 
                    className="input"
                    style={{ color: '#000' }}
                    value={newPenerbangan.kode_penerbangan} 
                    onChange={handleInputChange} 
                    placeholder="Contoh: GA-1234"
                    required 
                  />
                </div>
                <p className="help" style={{ color: '#fffff' }}>Format: XX-XXXX (contoh: GA-1234)</p>
              </div>
              
              {userRole === 'administrator' && (
                <div className="field">
                  <label className="label" style={{ color: '#fffff' }}>Maskapai</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select name="maskapai" value={newPenerbangan.maskapai} onChange={handleInputChange} required>
                        <option value="">Pilih Maskapai</option>
                        {maskapai.map(m => (
                          <option key={m.id} value={m.nama_maskapai}>{m.nama_maskapai}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Dari</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select name="dari" value={newPenerbangan.dari} onChange={handleInputChange} required>
                      <option value="">Pilih Kota Asal</option>
                      {kotaList.map(kota => (
                        <option key={kota} value={kota}>{kota}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Ke</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select name="ke" value={newPenerbangan.ke} onChange={handleInputChange} required>
                      <option value="">Pilih Kota Tujuan</option>
                      {kotaList.map(kota => (
                        <option key={kota} value={kota}>{kota}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Tanggal Berangkat</label>
                <div className="control">
                  <input 
                    type="datetime-local" 
                    name="tanggal_berangkat" 
                    className="input"
                    style={{ color: '#000' }}
                    value={newPenerbangan.tanggal_berangkat} 
                    onChange={handleInputChange} 
                    min={new Date().toISOString().slice(0, 16)}
                    required 
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Durasi Penerbangan</label>
                <div className="control">
                  <input 
                    type="text" 
                    name="durasi_penerbangan" 
                    className="input"
                    style={{ color: '#000' }}
                    value={newPenerbangan.durasi_penerbangan} 
                    onChange={handleInputChange} 
                    placeholder="Contoh: 2 jam 30 menit"
                    required 
                  />
                </div>
                <p className="help" style={{ color: '#fffff' }}>Format: X jam Y menit</p>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Harga</label>
                <div className="control">
                  <input 
                    type="number" 
                    name="harga" 
                    className="input"
                    style={{ color: '#000' }}
                    value={newPenerbangan.harga} 
                    onChange={handleInputChange} 
                    min="0"
                    required 
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Kapasitas</label>
                <div className="control">
                  <input 
                    type="number" 
                    name="kapasitas" 
                    className="input"
                    style={{ color: '#000' }}
                    value={newPenerbangan.kapasitas} 
                    onChange={handleInputChange} 
                    min="1"
                    max="500"
                    required 
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">Simpan</button>
              <button type="button" className="button" onClick={() => setIsModalOpen(false)}>Batal</button>
            </footer>
          </form>
        </div>
      </div>

      {/* Modal Edit */}
      <div className={`modal ${isEditModalOpen ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={() => setIsEditModalOpen(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" style={{ color: '#fffff' }}>Edit Penerbangan</p>
            <button className="delete" onClick={() => setIsEditModalOpen(false)}></button>
          </header>
          <form onSubmit={handleUpdate}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Kode Penerbangan</label>
                <div className="control">
                  <input 
                    type="text" 
                    name="kode_penerbangan" 
                    className="input"
                    style={{ color: '#000' }}
                    value={editPenerbangan?.kode_penerbangan || ''} 
                    onChange={handleInputChange} 
                    placeholder="Contoh: GA-1234"
                    required 
                  />
                </div>
                <p className="help" style={{ color: '#fffff' }}>Format: XX-XXXX (contoh: GA-1234)</p>
              </div>
              
              {userRole === 'administrator' && (
                <div className="field">
                  <label className="label" style={{ color: '#fffff' }}>Maskapai</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select name="maskapai" value={editPenerbangan?.maskapai || ''} onChange={handleInputChange} required>
                        <option value="">Pilih Maskapai</option>
                        {maskapai.map(m => (
                          <option key={m.id} value={m.nama_maskapai}>{m.nama_maskapai}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Dari</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select name="dari" value={editPenerbangan?.dari || ''} onChange={handleInputChange} required>
                      <option value="">Pilih Kota Asal</option>
                      {kotaList.map(kota => (
                        <option key={kota} value={kota}>{kota}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Ke</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select name="ke" value={editPenerbangan?.ke || ''} onChange={handleInputChange} required>
                      <option value="">Pilih Kota Tujuan</option>
                      {kotaList.map(kota => (
                        <option key={kota} value={kota}>{kota}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Tanggal Berangkat</label>
                <div className="control">
                  <input 
                    type="datetime-local" 
                    name="tanggal_berangkat" 
                    className="input"
                    style={{ color: '#000' }}
                    value={editPenerbangan?.tanggal_berangkat || ''} 
                    onChange={handleInputChange} 
                    min={new Date().toISOString().slice(0, 16)}
                    required 
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Durasi Penerbangan</label>
                <div className="control">
                  <input 
                    type="text" 
                    name="durasi_penerbangan" 
                    className="input"
                    style={{ color: '#000' }}
                    value={editPenerbangan?.durasi_penerbangan || ''} 
                    onChange={handleInputChange} 
                    placeholder="Contoh: 2 jam 30 menit"
                    required 
                  />
                </div>
                <p className="help" style={{ color: '#fffff' }}>Format: X jam Y menit</p>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Harga</label>
                <div className="control">
                  <input 
                    type="number" 
                    name="harga" 
                    className="input"
                    style={{ color: '#000' }}
                    value={editPenerbangan?.harga || ''} 
                    onChange={handleInputChange} 
                    min="0"
                    required 
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" style={{ color: '#fffff' }}>Kapasitas</label>
                <div className="control">
                  <input 
                    type="number" 
                    name="kapasitas" 
                    className="input"
                    style={{ color: '#000' }}
                    value={editPenerbangan?.kapasitas || ''} 
                    onChange={handleInputChange} 
                    min="1"
                    max="500"
                    required 
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">Update</button>
              <button type="button" className="button" onClick={() => setIsEditModalOpen(false)}>Batal</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PenerbanganTable;
