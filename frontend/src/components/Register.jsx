import React from 'react';
import { IoKey } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePerson } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import "../App.css";

const Register = () => {
  return (
    <section className="hero is-fullheight has-background-white-ter">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div 
                className="box has-background-white" 
                style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
              >
                <h1 className="title has-text-centered has-text-weight-bold" style={{ color: "#0095DA" }}>
                  Register
                </h1>
                <div className="field">
                  <label className="label has-text-dark">Nama</label>
                  <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Masukkan nama" />
                    <span className="icon is-small is-left">
                      <MdOutlinePerson size={18} color="#0095DA" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-dark">Username</label>
                  <div className="control has-icons-left">
                    <input className="input" type="text" placeholder="Masukkan username" />
                    <span className="icon is-small is-left">
                      <FaUser size={18} color="#0095DA" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-dark">Email</label>
                  <div className="control has-icons-left">
                    <input className="input" type="email" placeholder="Masukkan email" />
                    <span className="icon is-small is-left">
                      <MdOutlineEmail size={18} color="#0095DA" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-dark">Password</label>
                  <div className="control has-icons-left">
                    <input className="input" type="password" placeholder="Masukkan password" />
                    <span className="icon is-small is-left">
                      <IoKey size={18} color="#0095DA" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-dark">Konfirmasi Password</label>
                  <div className="control has-icons-left">
                    <input className="input" type="password" placeholder="Masukkan ulang password" />
                    <span className="icon is-small is-left">
                      <IoKey size={18} color="#0095DA" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-dark">Upload Foto Profil</label>
                  <div className="control has-icons-left">
                    <input className="input" type="file" />
                    <span className="icon is-small is-left">
                      <BsImage size={18} color="#0095DA" />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-fullwidth is-medium" style={{ backgroundColor: "#0095DA", color: "white" }}>
                    Register
                  </button>
                </div>
                <p className="has-text-centered">
                  Sudah punya akun? <a href="/login" style={{ color: "#0095DA", fontWeight: "bold" }}>Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
