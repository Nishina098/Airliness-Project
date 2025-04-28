import Penerbangan from "../models/PenerbanganModels.js";
import { Op } from "sequelize";

export const getPenerbangan = async (req, res) => {
    try {
        console.log('getPenerbangan called');
        console.log('Session:', req.session);
        
        let penerbangan;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set waktu ke awal hari
        
        // Jika user adalah admin, tampilkan semua data
        if (req.session && req.session.role === "administrator") {
            console.log('Admin access - showing all flights');
            penerbangan = await Penerbangan.findAll({
                order: [['tanggal_berangkat', 'ASC']]
            });
        } 
        // Jika user adalah maskapai, tampilkan hanya data maskapai mereka
        else if (req.session && req.session.role === "maskapai") {
            console.log('Maskapai access - showing own flights');
            penerbangan = await Penerbangan.findAll({
                where: {
                    maskapai: req.session.nama_maskapai
                },
                order: [['tanggal_berangkat', 'ASC']]
            });
        }
        // Jika tidak ada session (akses publik) atau user adalah pelanggan
        else {
            console.log('Public access - showing upcoming flights');
            console.log('Today:', today);
            
            // Cek dulu semua penerbangan yang ada
            const allFlights = await Penerbangan.findAll({
                order: [['tanggal_berangkat', 'ASC']]
            });
            console.log('All flights in database:', allFlights.length);
            
            // Filter penerbangan yang akan datang dan masih ada kursi
            penerbangan = allFlights.filter(flight => {
                const flightDate = new Date(flight.tanggal_berangkat);
                flightDate.setHours(0, 0, 0, 0);
                return flightDate >= today && flight.kapasitas > 0;
            });
            
            console.log('Filtered flights:', penerbangan.length);
        }
        
        console.log('Found flights:', penerbangan.length);
        if (penerbangan.length === 0) {
            console.log('No flights found. Checking database...');
            const allFlights = await Penerbangan.findAll();
            console.log('Total flights in database:', allFlights.length);
            if (allFlights.length > 0) {
                console.log('Sample flight data:', allFlights[0]);
            }
        }
        
        res.json(penerbangan);
    } catch (error) {
        console.error("Error in getPenerbangan:", error);
        res.status(500).json({ msg: error.message });
    }
}

export const getPenerbanganById = async (req, res) => {
    try {
        const penerbangan = await Penerbangan.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!penerbangan) return res.status(404).json({ msg: "Penerbangan tidak ditemukan" });
        
        // Cek apakah user memiliki akses ke data ini
        if (req.session.role === "maskapai" && penerbangan.maskapai !== req.session.nama_maskapai) {
            return res.status(403).json({ msg: "Anda tidak memiliki akses ke data ini" });
        }
        
        res.json(penerbangan);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createPenerbangan = async (req, res) => {
    try {
        // Jika user adalah maskapai, set maskapai sesuai dengan nama maskapai mereka
        if (req.session.role === "maskapai") {
            req.body.maskapai = req.session.nama_maskapai;
        }
        
        await Penerbangan.create(req.body);
        res.status(201).json({ msg: "Penerbangan berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updatePenerbangan = async (req, res) => {
    try {
        const penerbangan = await Penerbangan.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!penerbangan) return res.status(404).json({ msg: "Penerbangan tidak ditemukan" });
        
        // Cek apakah user memiliki akses ke data ini
        if (req.session.role === "maskapai" && penerbangan.maskapai !== req.session.nama_maskapai) {
            return res.status(403).json({ msg: "Anda tidak memiliki akses ke data ini" });
        }
        
        // Jika user adalah maskapai, pastikan maskapai tidak diubah
        if (req.session.role === "maskapai") {
            req.body.maskapai = req.session.nama_maskapai;
        }
        
        await Penerbangan.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Penerbangan berhasil diupdate" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deletePenerbangan = async (req, res) => {
    try {
        const penerbangan = await Penerbangan.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!penerbangan) return res.status(404).json({ msg: "Penerbangan tidak ditemukan" });
        
        // Cek apakah user memiliki akses ke data ini
        if (req.session.role === "maskapai" && penerbangan.maskapai !== req.session.nama_maskapai) {
            return res.status(403).json({ msg: "Anda tidak memiliki akses ke data ini" });
        }
        
        await Penerbangan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Penerbangan berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}