import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import Users from "./pages/adminPages/Users";
import "./App.css";
import MaskapaiAdmin from "./pages/adminPages/Maskapai";
import Penerbangan from "./pages/adminPages/Penerbangan";
import Transaksi from "./pages/adminPages/Transaksi";
import RiwayatTransaksi from "./pages/adminPages/RiwayatTransaksi";
import Booking from "./pages/Booking";
import Pesanan from "./pages/Pesanan";
import MaskapaiDashboard from "./pages/maskapaiPages/MaskapaiDashboard";
import UsersMaskapai from "./pages/maskapaiPages/UsersMaskapai";
import PenerbanganMaskapai from "./pages/maskapaiPages/PenerbanganMaskapai";
import RiwayatTransaksiMaskapai from "./pages/maskapaiPages/RiwayatTransaksiMaskapai";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pesanan' element={<Pesanan />} />
          <Route path='/register' element={<Register />} />
          <Route path='/booking/:id' element={<Booking />} />

          {/* maskapai */}
          <Route path='/maskapai' element={<MaskapaiDashboard />} />
          <Route path='/maskapai/users' element={<UsersMaskapai />} />
          <Route path='/maskapai/penerbangan' element={<PenerbanganMaskapai />} />
          <Route path='/maskapai/riwayat-transaksi' element={<RiwayatTransaksiMaskapai />} />

          {/* admin */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/maskapai' element={<MaskapaiAdmin />} />
          <Route path='/admin/penerbangan' element={<Penerbangan />} />
          <Route path='/admin/transaksi' element={<Transaksi />} />
          <Route path='/admin/riwayat-transaksi' element={<RiwayatTransaksi />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;