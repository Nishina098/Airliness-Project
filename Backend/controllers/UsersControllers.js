import Users from "../models/UsersModels.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: [
                "uuid",
                "nm_user",
                "username",
                "email_user",
                "img_user",
                "url_user",
                "password",
                "role",
            ],
        });

        res.status(200).json(response);
    }   catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getUsersById = async (req,res) => {
    try {
        const response = await Users.findOne({
            attributes: [
                "uuid",
                "nm_user",
                "username",
                "email_user",
                "img_user",
                "url_user",
                "password",
                "role",
            ],
            where: {
                uuid: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "data users tidak ditemukan" });
        } else {
            res.status(200).json(response);
        }
    }   catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createUsers = async (req,res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "no file uploaded" });

    const { title, title1, title2, title3, title4, title5 } = req.body;

    if (title3 !== title4)
        return res
            .status(400)
            .json({ msg: "password dan confirm password tidak cocok" });
    
    const hashPassword = await argon2.hash(title3);

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/users/${fileName}`;
    const allowedType = [".jpg", ".png", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({
            msg: "silahkan pilih gambar dengan ekstensi .png .jpg dan .jpeg",
        });
    
    if (fileSize > 5000000)
        return res
            .status(422)
            .json({ msg: "size gambar yang diupload tidak boleh lebih dari 5Mb" });
    
    file.mv(`./public/images/users/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Users.create({
                nm_user: title,
                username: title1,
                email_user: title2,
                img_user: fileName,
                url_user: url,
                password: hashPassword,
                role: title5,
            });

            res.status(201).json({ msg: "Data user sudah ditambahkan" });
        }   catch (error) {
            res.status(400).json({ msg:error.message });
        }
    });
};

export const updateUsers = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        let fileName = user.img_user; // Gunakan gambar yang ada sebagai default
        if (req.files && req.files.file) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) 
                return res.status(422).json({ msg: "Invalid image type" });
            if (fileSize > 5000000) 
                return res.status(422).json({ msg: "Image must be less than 5 MB" });

            // Hapus file lama jika ada
            const filepath = `./public/images/users/${user.img_user}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }

            // Pindahkan file baru
            file.mv(`./public/images/users/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        const name = req.body.title;
        const username = req.body.title1;
        const email = req.body.title2;
        const password = req.body.title3;
        const confPassword = req.body.title4;
        const role = req.body.title5;

        // Validasi input yang diperlukan
        if (!name || !username || !email) {
            return res.status(400).json({ msg: "Nama, username, dan email harus diisi" });
        }

        let hashPassword;
        if (!password || password.trim() === "") {
            hashPassword = user.password; // Gunakan password yang ada
        } else {
            if (password !== confPassword) {
                return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
            }
            hashPassword = await argon2.hash(password);
        }

        // Update data user
        const updateData = {
            nm_user: name,
            username: username,
            email_user: email,
            password: hashPassword,
            role: role || user.role
        };

        // Tambahkan data gambar jika ada perubahan file
        if (req.files && req.files.file) {
            updateData.img_user = fileName;
            updateData.url_user = `http://localhost:5000/images/users/${fileName}`;
        }

        await Users.update(updateData, {
            where: {
                uuid: req.params.id
            }
        });

        res.status(200).json({ msg: "User berhasil diperbarui" });
    } catch (error) {
        console.error('Update error:', error);
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUsers = async (req,res) => {
    const response = await Users.findOne({
        where: {
            uuid: req.params.id,
        },
    });

    if (!response)
        return res.status(404).json({ msg: "Data users tidak ditemukan" });
    try {
        const filepath = `./public/images/users/${response.img_user}`;
        fs.unlinkSync(filepath);
        
        await Users.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "Data users berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
};

export const registerUser = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { nm_user, username, email_user, password, confPassword } = req.body;

        // Validasi input
        if (!nm_user || !username || !email_user || !password || !confPassword) {
            console.log("Validasi gagal: field kosong");
            return res.status(400).json({ msg: "Semua field harus diisi" });
        }

        // Validasi password
        if (password !== confPassword) {
            console.log("Validasi gagal: password tidak cocok");
            return res.status(400).json({ msg: "Password dan konfirmasi password tidak cocok" });
        }

        // Cek username
        const existingUser = await Users.findOne({
            where: {
                username: username
            }
        });

        if (existingUser) {
            console.log("Validasi gagal: username sudah digunakan");
            return res.status(400).json({ msg: "Username sudah digunakan" });
        }

        // Cek email
        const existingEmail = await Users.findOne({
            where: {
                email_user: email_user
            }
        });

        if (existingEmail) {
            console.log("Validasi gagal: email sudah digunakan");
            return res.status(400).json({ msg: "Email sudah digunakan" });
        }

        // Hash password menggunakan argon2
        const hashPassword = await argon2.hash(password);

        let img_user = null;
        let url_user = null;

        // Handle file upload jika ada
        if (req.files && req.files.img_user) {
            const file = req.files.img_user;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) {
                return res.status(422).json({ msg: "Format gambar tidak didukung. Gunakan .png, .jpg, atau .jpeg" });
            }

            if (fileSize > 5000000) {
                return res.status(422).json({ msg: "Ukuran gambar terlalu besar. Maksimal 5MB" });
            }

            img_user = fileName;
            url_user = `${req.protocol}://${req.get("host")}/images/users/${fileName}`;

            // Pindahkan file
            file.mv(`./public/images/users/${fileName}`, (err) => {
                if (err) {
                    console.error("Error saat memindahkan file:", err);
                    return res.status(500).json({ msg: "Gagal mengupload gambar" });
                }
            });
        }

        // Buat user baru
        console.log("Membuat user baru...");
        const newUser = await Users.create({
            nm_user: nm_user,
            username: username,
            email_user: email_user,
            password: hashPassword,
            img_user: img_user,
            url_user: url_user,
            role: "user" // Default role untuk user baru
        });
        console.log("User baru berhasil dibuat:", newUser);

        res.status(201).json({
            msg: "Pendaftaran berhasil",
            user: {
                uuid: newUser.uuid,
                nm_user: newUser.nm_user,
                username: newUser.username,
                email_user: newUser.email_user,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Error saat registrasi:", error);
        res.status(500).json({ msg: "Terjadi kesalahan saat mendaftar" });
    }
};