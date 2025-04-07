import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoKey } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData, {
        withCredentials: true
      });
      const { role } = response.data;
      
      // Redirect berdasarkan role
      if (role === 'administrator') {
        navigate('/admin');
      } else if (role === 'maskapai') {
        navigate('/maskapai');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        alert(error.response.data.msg || 'Login gagal. Silakan coba lagi.');
      } else {
        alert('Login gagal. Silakan coba lagi.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="hero is-fullheight has-background-white-ter">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div
                className="box has-background-white"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h1
                  className="title has-text-centered has-text-weight-bold"
                  style={{ color: "#0095DA" }}
                >
                  Login
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label has-text-dark">Email</label>
                    <div className="control has-icons-left">
                      <input
                        className="input has-background-white has-text-black"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <MdOutlineEmail size={18} color="#0095DA" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label has-text-dark">Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input has-background-white has-text-black"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <IoKey size={18} color="#0095DA" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <button
                      type="submit"
                      className="button is-fullwidth is-medium"
                      style={{ backgroundColor: "#0095DA", color: "white" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p className="has-text-centered">
                  Belum punya akun?{" "}
                  <a
                    href="/register"
                    style={{ color: "#0095DA", fontWeight: "bold" }}
                  >
                    Daftar
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
