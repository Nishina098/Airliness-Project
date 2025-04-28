import React, { useState, useEffect } from "react";
import axios from "axios";

const TransaksiTable = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTransaksi();
  }, []);

  const getTransaksi = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching transaksi data...");
      const response = await axios.get("http://localhost:5000/transaksi", {
        withCredentials: true,
      });
      console.log("Response data:", response.data);
      setTransaksi(response.data);
    } catch (error) {
      console.error("Error fetching transaksi:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setError(
          error.response.data.msg || "Terjadi kesalahan saat mengambil data"
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("Tidak dapat terhubung ke server");
      } else {
        console.error("Error message:", error.message);
        setError("Terjadi kesalahan saat mengambil data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKonfirmasi = async (id) => {
    try {
      console.log("Konfirmasi pembayaran untuk ID:", id);
      await axios.patch(
        `http://localhost:5000/transaksi/${id}`,
        {
          status_pembayaran: "berhasil",
          status_tiket: "aktif",
        },
        {
          withCredentials: true,
        }
      );
      alert("Pembayaran berhasil dikonfirmasi");
      getTransaksi();
    } catch (error) {
      console.error("Error konfirmasi:", error);
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };

  const handleTolak = async (id) => {
    try {
      console.log("Menolak pembayaran untuk ID:", id);
      await axios.patch(
        `http://localhost:5000/transaksi/${id}`,
        {
          status_pembayaran: "gagal",
          status_tiket: "tidak aktif",
        },
        {
          withCredentials: true,
        }
      );
      alert("Pembayaran ditolak");
      getTransaksi();
    } catch (error) {
      console.error("Error tolak:", error);
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "is-warning";
      case "berhasil":
        return "is-success";
      case "gagal":
        return "is-danger";
      default:
        return "is-light";
    }
  };

  if (loading) {
    return <div className="has-text-centered">Memuat data...</div>;
  }

  if (error) {
    return <div className="notification is-danger">{error}</div>;
  }

  // Filter transaksi yang masih pending atau sudah dibayar/dibatalkan tapi belum dikonfirmasi
  const filteredTransaksi = transaksi.filter(
    (t) =>
      t.status_pembayaran === "pending" ||
      (t.status_pembayaran === "berhasil" && t.status_tiket === "tidak aktif")
  );

  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped ">
        <thead>
          <tr>
            <th>Kode Booking</th>
            <th>Email Pengguna</th>
            <th>Penerbangan</th>
            <th>Tanggal Pemesanan</th>
            <th>Jumlah Tiket</th>
            <th>Total Harga</th>
            <th>Status Pembayaran</th>
            <th>Status Tiket</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransaksi.length === 0 ? (
            <tr>
              <td colSpan="8" className="has-text-centered">
                Tidak ada data transaksi yang perlu dikonfirmasi
              </td>
            </tr>
          ) : (
            filteredTransaksi.map((t) => (
              <tr key={t.id_transaksi}>
                <td>{t.kode_booking}</td>
                <td>{t.user?.email_user}</td>
                <td>
                  {t.penerbangan?.kode_penerbangan} - {t.penerbangan?.maskapai}
                </td>
                <td>
                  {/* {new Date(t.tanggal_transaksi)} */}
                  {new Date(t.tanggal_transaksi).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{t.jumlah_tiket}</td>
                <td>Rp {t.total_harga.toLocaleString()}</td>
                <td>
                  <span
                    className={`tag ${getStatusColor(t.status_pembayaran)}`}
                  >
                    {t.status_pembayaran === "pending"
                      ? "Menunggu Pembayaran"
                      : t.status_pembayaran === "berhasil"
                      ? "Pembayaran Berhasil"
                      : "Pembayaran Gagal"}
                  </span>
                </td>
                <td>
                  <span
                    className={`tag ${
                      t.status_tiket === "aktif" ? "is-success" : "is-danger"
                    }`}
                  >
                    {t.status_tiket === "aktif" ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                <td>
                  {t.status_pembayaran !== "pending" &&
                    t.status_tiket === "tidak aktif" && (
                      <div className="buttons are-small">
                        <button
                          className="button is-success is-small"
                          onClick={() => handleKonfirmasi(t.id_transaksi)}
                        >
                          Konfirmasi
                        </button>
                        <button
                          className="button is-danger is-small"
                          onClick={() => handleTolak(t.id_transaksi)}
                        >
                          Tolak
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransaksiTable;
