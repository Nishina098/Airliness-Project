import Transaksi from "../models/TransaksiModels.js";
import path from "path";
import fs from "fs";
import Users from "../models/UsersModels.js";
import Penerbangan from "../models/PenerbanganModels.js";

export const getTransaksi = async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ msg: "Silakan login terlebih dahulu" });
        }

        // Jika user adalah admin, tampilkan semua transaksi
        if (req.session.role === "administrator" || req.session.role === "maskapai") {
            const response = await Transaksi.findAll({
                attributes: [
                    "id_transaksi",
                    "uuid_user",
                    "id_penerbangan",
                    "kode_booking",
                    "jumlah_tiket",
                    "total_harga",
                    "metode_pembayaran",
                    "status_pembayaran",
                    "tanggal_transaksi",
                    "status_tiket"
                ],
                include: [
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['email_user', 'img_user']
                    },
                    {
                        model: Penerbangan,
                        as: 'penerbangan',
                        attributes: ['kode_penerbangan', 'maskapai', 'dari', 'ke', 'tanggal_berangkat', 'durasi_penerbangan']
                    }
                ],
                order: [['tanggal_transaksi', 'DESC']]
            });
            return res.status(200).json(response);
        }

        // Jika user adalah pelanggan, tampilkan hanya transaksi mereka
        const response = await Transaksi.findAll({
            attributes: [
                "id_transaksi",
                "uuid_user",
                "id_penerbangan",
                "kode_booking",
                "jumlah_tiket",
                "total_harga",
                "metode_pembayaran",
                "status_pembayaran",
                "tanggal_transaksi",
                "status_tiket"
            ],
            where: {
                uuid_user: userId
            },
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['email_user', 'img_user']
                },
                {
                    model: Penerbangan,
                    as: 'penerbangan',
                    attributes: ['kode_penerbangan', 'maskapai', 'dari', 'ke', 'tanggal_berangkat', 'durasi_penerbangan']
                }
            ],
            order: [['tanggal_transaksi', 'DESC']]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getTransaksiById = async (req, res) => {
    try {
        const response = await Transaksi.findOne({
            attributes: [
                "id_transaksi",
                "uuid_user",
                "id_penerbangan",
                "kode_booking",
                "jumlah_tiket",
                "total_harga",
                "metode_pembayaran",
                "status_pembayaran",
                "tanggal_transaksi",
                "status_tiket"
            ],
            where: {
                id_transaksi: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "Data Transaksi tidak ditemukan" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createTransaksi = async (req, res) => {
    const {
        uuid_user,
        id_penerbangan,
        kode_booking,
        jumlah_tiket,
        total_harga,
        metode_pembayaran,
        status_pembayaran,
        status_tiket
    } = req.body;

    try {
        // Cek kapasitas penerbangan
        const penerbangan = await Penerbangan.findOne({
            where: {
                id: id_penerbangan
            }
        });

        if (!penerbangan) {
            return res.status(404).json({ msg: "Penerbangan tidak ditemukan" });
        }

        // Cek apakah kapasitas mencukupi
        if (penerbangan.kapasitas < jumlah_tiket) {
            return res.status(400).json({ msg: "Kapasitas penerbangan tidak mencukupi" });
        }

        // Buat transaksi
        const transaksi = await Transaksi.create({
            uuid_user,
            id_penerbangan,
            kode_booking,
            jumlah_tiket,
            total_harga,
            metode_pembayaran,
            status_pembayaran,
            status_tiket
        });

        // Tidak mengurangi kapasitas saat pemesanan
        // Kapasitas akan berkurang saat admin mengkonfirmasi pembayaran

        res.status(201).json({ 
            msg: "Data Transaksi berhasil ditambahkan",
            id_transaksi: transaksi.id_transaksi
        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateTransaksi = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ msg: "Silakan login terlebih dahulu" });
    }

    const transaksi = await Transaksi.findOne({
        where: {
            id_transaksi: req.params.id
        },
        include: [
            {
                model: Penerbangan,
                as: 'penerbangan',
                attributes: ['id', 'kapasitas']
            }
        ]
    });
    
    if (!transaksi) {
        return res.status(404).json({ msg: "Data Transaksi tidak ditemukan" });
    }

    // Jika user adalah admin, izinkan update
    if (req.session.role === "administrator") {
        const { status_pembayaran, status_tiket } = req.body;
        try {
            // Jika admin mengkonfirmasi pembayaran (status_pembayaran = 'berhasil' dan status_tiket = 'aktif')
            if (status_pembayaran === 'berhasil' && status_tiket === 'aktif') {
                // Cek apakah kapasitas mencukupi
                if (transaksi.penerbangan.kapasitas < transaksi.jumlah_tiket) {
                    return res.status(400).json({ msg: "Kapasitas penerbangan tidak mencukupi" });
                }
                
                // Kurangi kapasitas penerbangan
                await Penerbangan.update(
                    {
                        kapasitas: transaksi.penerbangan.kapasitas - transaksi.jumlah_tiket
                    },
                    {
                        where: {
                            id: transaksi.penerbangan.id
                        }
                    }
                );
            }
            
            // Jika admin menolak pembayaran (status_pembayaran = 'gagal')
            if (status_pembayaran === 'gagal') {
                // Jika sebelumnya tiket aktif, kembalikan kapasitas
                if (transaksi.status_tiket === 'aktif') {
                    // Kembalikan kapasitas penerbangan
                    await Penerbangan.update(
                        {
                            kapasitas: transaksi.penerbangan.kapasitas + transaksi.jumlah_tiket
                        },
                        {
                            where: {
                                id: transaksi.penerbangan.id
                            }
                        }
                    );
                }
            }
            
            // Update status transaksi
            await Transaksi.update(
                {
                    status_pembayaran,
                    status_tiket
                },
                {
                    where: {
                        id_transaksi: req.params.id
                    },
                }
            );
            res.status(200).json({ msg: "Status transaksi berhasil diupdate" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
        return;
    }

    // Untuk user biasa, cek kepemilikan transaksi
    if (transaksi.uuid_user !== userId) {
        return res.status(403).json({ msg: "Anda tidak memiliki akses untuk mengupdate transaksi ini" });
    }

    // Cek status pembayaran untuk user biasa
    if (transaksi.status_pembayaran !== 'pending') {
        return res.status(400).json({ msg: "Pesanan sudah dibayar atau dibatalkan" });
    }

    const { status_pembayaran } = req.body;

    try {
        await Transaksi.update(
            {
                status_pembayaran
            },
            {
                where: {
                    id_transaksi: req.params.id,
                    uuid_user: userId
                },
            }
        );
        res.status(200).json({ msg: "Status pembayaran berhasil diupdate" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteTransaksi = async (req, res) => {
    const transaksi = await Transaksi.findOne({
        where: {
            id_transaksi: req.params.id,
        },
    });

    if (!transaksi) {
        return res.status(404).json({ msg: "Data Transaksi tidak ditemukan" });
    }

    try {
        await Transaksi.destroy({
            where: {
                id_transaksi: req.params.id,
            },
        });
        res.status(200).json({ msg: "Data Transaksi berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const uploadBuktiPembayaran = async (req, res) => {
    try {
        const transaksi = await Transaksi.findOne({
            where: {
                id_transaksi: req.params.id
            }
        });

        if (!transaksi) {
            return res.status(404).json({ msg: "Data Transaksi tidak ditemukan" });
        }

        if (transaksi.status_pembayaran !== 'pending') {
            return res.status(400).json({ msg: "Transaksi sudah dibayar atau dibatalkan" });
        }

        if (req.files === null) {
            return res.status(400).json({ msg: "Tidak ada file yang diupload" });
        }

        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = `bukti_${transaksi.kode_booking}${ext}`;
        const url = `${req.protocol}://${req.get("host")}/images/bukti/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg', '.pdf'];

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Format file tidak didukung" });
        }

        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "Ukuran file maksimal 5MB" });
        }

        // Hapus file lama jika ada
        if (transaksi.bukti_pembayaran) {
            const filepath = `./public/images/bukti/${transaksi.bukti_pembayaran}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }

        // Upload file baru
        file.mv(`./public/images/bukti/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
                await Transaksi.update(
                    {
                        bukti_pembayaran: fileName,
                        url_bukti: url
                    },
                    {
                        where: {
                            id_transaksi: req.params.id
                        }
                    }
                );
                res.status(200).json({ msg: "Bukti pembayaran berhasil diupload" });
            } catch (error) {
                res.status(400).json({ msg: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getRiwayatTransaksi = async (req, res) => {
    try {
        console.log('getRiwayatTransaksi called');
        console.log('Session:', req.session);
        console.log('Headers:', req.headers);
        console.log('URL:', req.url);
        console.log('Method:', req.method);
        console.log('Path:', req.path);
        
        if (!req.session.userId) {
            console.log('No userId in session');
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }

        // Cek role admin
        if (req.session.role !== "administrator") {
            console.log('Access denied: Not an administrator');
            return res.status(403).json({ msg: "Akses terlarang! Hanya administrator yang dapat mengakses." });
        }

        console.log('Fetching all transactions...');
        const transaksi = await Transaksi.findAll({
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['email_user']
                },
                {
                    model: Penerbangan,
                    as: 'penerbangan',
                    attributes: ['kode_penerbangan', 'maskapai', 'dari', 'ke', 'tanggal_berangkat', 'durasi_penerbangan']
                }
            ],
            order: [['tanggal_transaksi', 'DESC']]
        });

        console.log('Found transactions:', transaksi.length);
        console.log('Response data:', transaksi);

        if (!transaksi || transaksi.length === 0) {
            console.log('No transactions found');
            return res.status(200).json([]);
        }
        
        res.status(200).json(transaksi);
    } catch (error) {
        console.error('Error in getRiwayatTransaksi:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ msg: error.message });
    }
};

export const getRiwayatTransaksiMaskapai = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
        }

        // Cek role maskapai
        if (req.session.role !== "maskapai") {
            return res.status(403).json({ msg: "Akses terlarang! Hanya maskapai yang dapat mengakses." });
        }

        const transaksi = await Transaksi.findAll({
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['email_user']
                },
                {
                    model: Penerbangan,
                    as: 'penerbangan',
                    attributes: ['kode_penerbangan', 'maskapai', 'dari', 'ke', 'tanggal_berangkat', 'durasi_penerbangan'],
                    where: {
                        maskapai: req.session.nama_maskapai
                    }
                }
            ],
            order: [['tanggal_transaksi', 'DESC']]
        });

        if (!transaksi || transaksi.length === 0) {
            return res.status(200).json([]);
        }
        
        res.status(200).json(transaksi);
    } catch (error) {
        console.error('Error in getRiwayatTransaksiMaskapai:', error);
        res.status(500).json({ msg: error.message });
    }
}; 