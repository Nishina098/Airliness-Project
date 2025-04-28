import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoPerson, IoHome } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";

import '../../App.css';

const Sidebar = () => {
  return (
    <div 
      className="sidebar has-shadow" 
      style={{
        minHeight: '100vh',
        width: '250px',
        padding: 50,
        backgroundColor: "#3E3F5B",
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40
      }}
    >
       <div className="navbar-brand">
        <NavLink to="/admin" className="navbar-item"> 
          <img src="http://localhost:3000/Logo.png" width={100} alt='logo' />
        </NavLink>
        <a 
          href='!#'
          role="button" 
          className="navbar-burger burger" 
          aria-label="menu" 
          aria-expanded="false" 
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      
      <div className="menu">
        <NavLink to="/admin" className="navbar-item has-text-white">
          <IoHome size={20} className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className="navbar-item has-text-white">
          <IoPerson size={20} className="mr-2" />
          Users
        </NavLink>
        <NavLink to="/admin/maskapai" className="navbar-item has-text-white">
          <FaPlane size={20} className="mr-2" />
          Maskapai
        </NavLink>
        <NavLink to="/admin/penerbangan" className="navbar-item has-text-white">
          <MdFlight size={20} className="mr-2" />
          Penerbangan
        </NavLink>
        <NavLink to="/admin/transaksi" className="navbar-item has-text-white">
          <BiSolidPurchaseTag size={20} className="mr-2" />
          Transaksi
        </NavLink>
        <NavLink to="/admin/riwayat-transaksi" className="navbar-item has-text-white">
          <BsClockHistory size={20} className="mr-2" />
          Riwayat Transaksi
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
