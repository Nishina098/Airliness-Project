import Maskapai from "../models/MaskapaiModels.js";
import path from "path";
import fs from "fs";
import argon2 from "argon2";

export const getMaskapai = async (req, res) => {
    try {
        const response = await Maskapai.findAll({
            attributes: [
                "uuid",
                "nama_maskapai",
                "kode_maskapai",
                "logo_maskapai",
                "deskripsi",
                "status_operasional",
                "jumlah_pesawat",
                "nomor_kontak",
                "email",
                "website",
                "role"
            ],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getMaskapaiById = async (req, res) => {
    try {
        const response = await Maskapai.findOne({
            attributes: [
                "uuid",
                "nama_maskapai",
                "kode_maskapai",
                "logo_maskapai",
                "deskripsi",
                "status_operasional",
                "jumlah_pesawat",
                "nomor_kontak",
                "email",
                "website",
                "role"
            ],
            where: {
                uuid: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "Data Maskapai tidak ditemukan" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createMaskapai = async (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "Logo maskapai harus diupload" });

    const {
        nama_maskapai,
        kode_maskapai,
        deskripsi,
        status_operasional,
        jumlah_pesawat,
        nomor_kontak,
        email,
        website,
        password,
        confPassword
    } = req.body;

    if(password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedType = [".jpg", ".png", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({
            msg: "Format file tidak valid. Silahkan upload gambar dengan format .png, .jpg, atau .jpeg",
        });

    if (fileSize > 5000000)
        return res.status(422).json({ 
            msg: "Ukuran gambar tidak boleh lebih dari 5MB" 
        });

    const hashPassword = await argon2.hash(password);

    file.mv(`./public/images/maskapai/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Maskapai.create({
                nama_maskapai,
                kode_maskapai,
                logo_maskapai: fileName,
                deskripsi,
                status_operasional,
                jumlah_pesawat: parseInt(jumlah_pesawat),
                nomor_kontak,
                email,
                website,
                password: hashPassword,
                role: "maskapai"
            });

            res.status(201).json({ msg: "Data maskapai berhasil ditambahkan" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    });
};

export const updateMaskapai = async (req, res) => {
    const maskapai = await Maskapai.findOne({
        where: {
            uuid: req.params.id,
        },
    });

    if (!maskapai)
        return res.status(404).json({ msg: "Data Maskapai tidak ditemukan" });

    let fileName = maskapai.logo_maskapai;
    if (req.files !== null) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".jpg", ".png", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({
                msg: "Format file tidak valid. Silahkan upload gambar dengan format .png, .jpg, atau .jpeg",
            });

        if (fileSize > 5000000)
            return res.status(422).json({ 
                msg: "Ukuran gambar tidak boleh lebih dari 5MB" 
            });

        const filepath = `./public/images/maskapai/${maskapai.logo_maskapai}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/maskapai/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const {
        nama_maskapai,
        kode_maskapai,
        deskripsi,
        status_operasional,
        jumlah_pesawat,
        nomor_kontak,
        email,
        website,
        password,
        confPassword
    } = req.body;

    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = maskapai.password;
    } else {
        if (password !== confPassword) {
            return res.status(400).json({
                msg: "Password dan Confirm Password tidak cocok"
            });
        }
        hashPassword = await argon2.hash(password);
    }

    try {
        await Maskapai.update(
            {
                nama_maskapai,
                kode_maskapai,
                logo_maskapai: fileName,
                deskripsi,
                status_operasional,
                jumlah_pesawat: parseInt(jumlah_pesawat),
                nomor_kontak,
                email,
                website,
                password: hashPassword
            },
            {
                where: {
                    uuid: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Data maskapai berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteMaskapai = async (req, res) => {
    const maskapai = await Maskapai.findOne({
        where: {
            uuid: req.params.id,
        },
    });

    if (!maskapai)
        return res.status(404).json({ msg: "Data Maskapai tidak ditemukan" });

    try {
        const filepath = `./public/images/maskapai/${maskapai.logo_maskapai}`;
        fs.unlinkSync(filepath);

        await Maskapai.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "Data maskapai berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};