import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        nm_user: "",
        username: "",
        email_user: "",
        password: "",
        confPassword: "",
        img_user: null
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); // "success" atau "error"
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "img_user") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const showMessage = (message, type) => {
        setModalMessage(message);
        setModalType(type);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            console.log("Mengirim data registrasi:", formData);
            
            // Buat FormData untuk mengirim file
            const formDataToSend = new FormData();
            formDataToSend.append("nm_user", formData.nm_user);
            formDataToSend.append("username", formData.username);
            formDataToSend.append("email_user", formData.email_user);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("confPassword", formData.confPassword);
            if (formData.img_user) {
                formDataToSend.append("img_user", formData.img_user);
            }

            const response = await axios.post("http://localhost:5000/users/register", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            console.log("Response dari server:", response.data);
            showMessage("Pendaftaran berhasil! Anda akan dialihkan ke halaman login.", "success");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error saat registrasi:", error);
            let errorMessage = "Terjadi kesalahan saat mendaftar";
            
            if (error.response?.data?.msg) {
                errorMessage = error.response.data.msg;
            } else if (error.response?.status === 400) {
                errorMessage = "Data yang dimasukkan tidak valid";
            } else if (error.response?.status === 409) {
                errorMessage = "Username atau email sudah digunakan";
            }
            
            showMessage(errorMessage, "error");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1
                    className="title has-text-centered has-text-weight-bold"
                    style={{ color: "#0095DA" }}
                    
                >Daftar Akun</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input
                            type="text"
                            name="nm_user"
                            value={formData.nm_user}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email_user"
                            value={formData.email_user}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Konfirmasi Password</label>
                        <input
                            type="password"
                            name="confPassword"
                            value={formData.confPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Foto Profil</label>
                        <input
                            type="file"
                            name="img_user"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="register-button">
                        Daftar
                    </button>
                </form>
                <p className="login-link">
                    Sudah punya akun? <Link to="/login" style={{ color: "#0095DA", fontWeight: "bold" }}>Login di sini</Link>
                </p>
            </div>

            {/* Modal untuk pesan sukses/error */}
            {showModal && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className={`notification ${modalType === "success" ? "is-success" : "is-danger"}`}>
                            <button className="delete" onClick={() => setShowModal(false)}></button>
                            {modalMessage}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register; 