import { DataTypes, Op } from "sequelize";
import db from "../config/database.js";
import Users from "../models/UsersModels.js";
import Maskapai from "../models/MaskapaiModels.js";
import Penerbangan from "../models/PenerbanganModels.js";
import Transaksi from "../models/TransaksiModels.js";

export const getStats = async (req, res) => {
    try {
        console.log("Fetching statistics...");
        
        // Test database connection
        try {
            await db.authenticate();
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            return res.status(500).json({ 
                msg: 'Database connection error',
                error: error.message,
                details: error.stack
            });
        }

        // Get total users
        let totalUsers;
        try {
            totalUsers = await Users.count();
            console.log("Total users:", totalUsers);
        } catch (error) {
            console.error('Error counting users:', error);
            totalUsers = 0;
        }
        
        // Get total maskapai
        let totalMaskapai;
        try {
            totalMaskapai = await Maskapai.count();
            console.log("Total maskapai:", totalMaskapai);
        } catch (error) {
            console.error('Error counting maskapai:', error);
            totalMaskapai = 0;
        }
        
        // Get total penerbangan
        let totalPenerbangan;
        try {
            totalPenerbangan = await Penerbangan.count();
            console.log("Total penerbangan:", totalPenerbangan);
        } catch (error) {
            console.error('Error counting penerbangan:', error);
            totalPenerbangan = 0;
        }
        
        // Get total transaksi
        let totalTransaksi;
        try {
            totalTransaksi = await Transaksi.count();
            console.log("Total transaksi:", totalTransaksi);
        } catch (error) {
            console.error('Error counting transaksi:', error);
            totalTransaksi = 0;
        }
        
        // Get transaksi by status
        let successTransactions;
        try {
            successTransactions = await Transaksi.count({
                where: { 
                    status_pembayaran: 'berhasil'
                }
            });
            console.log("Success transactions:", successTransactions);
        } catch (error) {
            console.error('Error counting success transactions:', error);
            successTransactions = 0;
        }
        
        let pendingTransactions;
        try {
            pendingTransactions = await Transaksi.count({
                where: { 
                    status_pembayaran: 'pending'
                }
            });
            console.log("Pending transactions:", pendingTransactions);
        } catch (error) {
            console.error('Error counting pending transactions:', error);
            pendingTransactions = 0;
        }
        
        let failedTransactions;
        try {
            failedTransactions = await Transaksi.count({
                where: { 
                    status_pembayaran: 'gagal'
                }
            });
            console.log("Failed transactions:", failedTransactions);
        } catch (error) {
            console.error('Error counting failed transactions:', error);
            failedTransactions = 0;
        }
        
        // Get total revenue from successful transactions
        let totalRevenue;
        try {
            totalRevenue = await Transaksi.sum('total_harga', {
                where: { 
                    status_pembayaran: 'berhasil'
                }
            });
            console.log("Total revenue:", totalRevenue);
        } catch (error) {
            console.error('Error calculating total revenue:', error);
            totalRevenue = 0;
        }

        // Log all transactions for debugging
        try {
            const allTransactions = await Transaksi.findAll({
                attributes: ['id_transaksi', 'status', 'total_harga'],
                order: [['id_transaksi', 'DESC']],
                limit: 10
            });
            console.log("Last 10 transactions:", JSON.stringify(allTransactions, null, 2));
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }

        res.status(200).json({
            totalUsers,
            totalMaskapai,
            totalPenerbangan,
            totalTransaksi,
            successTransactions,
            pendingTransactions,
            failedTransactions,
            totalRevenue: totalRevenue || 0
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            msg: 'Terjadi kesalahan saat mengambil data statistik',
            error: error.message,
            details: error.stack,
            type: error.name
        });
    }
}; 