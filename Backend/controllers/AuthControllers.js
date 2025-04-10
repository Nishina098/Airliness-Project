import express from "express";
import Users from "../models/UsersModels.js";
import Admin from "../models/AdminModels.js";
import Maskapai from "../models/MaskapaiModels.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        console.log("Request Body Diterima:", req.body); // Debugging

        const { email, password } = req.body;
        let user;
        let role;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email dan password wajib diisi!" });
        }

        // Cek di tabel Users
        user = await Users.findOne({ where: { email_user: email } });
        if (user) role = "pelanggan";

        // Cek di tabel Admin jika belum ditemukan di Users
        if (!user) {
            user = await Admin.findOne({ where: { email_admin: email } });
            if (user) role = "administrator";
        }

        // Cek di tabel Maskapai jika belum ditemukan di Admin
        if (!user) {
            user = await Maskapai.findOne({ where: { email: email } });
            if (user) role = "maskapai";
        }

        if (!user) return res.status(404).json({ msg: "Akun tidak ditemukan!" });

        const match = await argon2.verify(user.password, password);
        if (!match) return res.status(400).json({ msg: "Password salah!" });

        // Simpan sesi
        req.session.userId = user.uuid;
        req.session.role = role; // Pastikan role disimpan di sesi
        
        // Jika user adalah maskapai, simpan nama_maskapai di session
        if (role === "maskapai") {
            req.session.nama_maskapai = user.nama_maskapai;
        }

        console.log("Session setelah login:");
        console.log("User ID:", req.session.userId);
        console.log("Role:", req.session.role);
        console.log("Nama Maskapai:", req.session.nama_maskapai);

        res.status(200).json({ msg: "Login berhasil", role: req.session.role });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};


// Logout user
export const Logout = async (req, res) => {
    console.log('Logout called');
    console.log('Session before logout:', req.session);
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(400).json({ msg: "Tidak dapat logout" });
        }
        console.log('Session destroyed successfully');
        res.status(200).json({ msg: "Anda telah logout" });
    });
};

// Middleware untuk mengecek sesi login
export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    try {
        let user = await Users.findOne({
            attributes: ["uuid", "nm_user", "email_user", "role", "img_user"],
            where: { uuid: req.session.userId }
        });

        if (!user) {
            user = await Admin.findOne({
                attributes: ["uuid", "nm_admin", "email_admin", "role", "img_admin"],
                where: { uuid: req.session.userId }
            });
        }

        if (!user) {
            user = await Maskapai.findOne({
                attributes: ["uuid", "nama_maskapai", "email", "role", "logo_maskapai"],
                where: { uuid: req.session.userId }
            });
        }

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        // Format response yang konsisten
        const response = {
            uuid: user.uuid,
            role: user.role,
            email: user.email_user || user.email_admin || user.email,
            name: user.nm_user || user.nm_admin || user.nama_maskapai,
            img_user: user.img_user || user.img_admin || user.logo_maskapai
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error in Me:", error);
        res.status(500).json({ msg: error.message });
    }
};

// Middleware untuk memperbarui accessToken
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ msg: "Refresh token tidak ditemukan!" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign(
            { userId: decoded.userId, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15s" }
        );
        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({ msg: "Refresh token tidak valid!" });
    }
};

export const getSession = async (req, res) => {
    console.log('getSession called');
    console.log('Session:', req.session);
    
    if (!req.session.userId) {
        console.log('No userId in session');
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    try {
        console.log('Sending session data:', {
            userId: req.session.userId,
            role: req.session.role,
            nama_maskapai: req.session.nama_maskapai
        });
        res.status(200).json({
            userId: req.session.userId,
            role: req.session.role,
            nama_maskapai: req.session.nama_maskapai
        });
    } catch (error) {
        console.error('Error in getSession:', error);
        res.status(500).json({ msg: error.message });
    }
};