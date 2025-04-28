import Admin from "../models/AdminModels.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";

export const getAdmin = async (req, res) => {
    try {
        const response = await Admin.findAll({
            attributes: [
                "uuid",
                "nm_admin",
                "username_admin",
                "email_admin",
                "img_admin",
                "url_admin",
                "password",
                "role",
            ],
        });

        res.status(200).json(response);
    }   catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getAdminById = async (req,res) => {
    try {
        const response = await Admin.findOne({
            attributes: [
                "uuid",
                "nm_admin",
                "username_admin",
                "email_admin",
                "img_admin",
                "url_admin",
                "password",
                "role",
            ],

            where: {
                uuid: req.params.id,
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "data Admin tidak ditemukan" });
        } else {
            res.status(200).json(response);
        }
    }   catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createAdmin = async (req,res) => {
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
    const url = `${req.protocol}://${req.get("host")}/images/admin/${fileName}`;
    const allowedType = [".jpg", ".png", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({
            msg: "silahkan pilih gambar dengan ekstensi .png .jpg dan .jpeg",
        });
    
    if (fileSize > 5000000)
        return res
            .status(422)
            .json({ msg: "size gambar yang diupload tidak boleh lebih dari 5Mb" });
    
    file.mv(`./public/images/admin/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Admin.create({
                nm_admin: title,
                username_admin: title1,
                email_admin: title2,
                img_admin: fileName,
                url_admin: url,
                password: hashPassword,
                role: title5,
            });

            res.status(201).json({ msg: "Data admin sudah ditambahkan" });
    }   catch (error) {
        res.status(400).json({ msg:error.message });
    }
    });
};

export const updateAdmin = async (req,res) => {
    const response = await Admin.findOne({
        where: {
            uuid: req.params.id,
        },
    });
    
    if (!response)
        return res.status(404).json({ msg: "Data Admin tidak ditemukan" });
    let fileName = "";
    if (req.files === null) {
        fileName = response.img_admin;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".jpg", ".png", ".jpeg"];
        
    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({
            msg: "silahkan pilih gambar dengan ekstensi .png, .jpg, .jpeg", 
    });

    if (fileSize > 5000000)
        return res
    .status(422)
    .json({ msg: "size gambar yang diupload tidak boleh lebih dari 5Mb" });

    const filepath = `./public/images/admin/${response.img_admin}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/admin/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message});
    });
    }

    const { title, title1, title2, title3, title4, title5 } =req.body;
    let hashPassword;
    if (title3 === "" || title3 === null) {
        hashPassword = response.password;
    } else {
        if (title3 !== title4) {
            return res
            .status(400)
            .json({ msg: "Password dan confirm Password tidak cocok" });
        } else {
            hashPassword = await argon2.hash(title3);
        }
    }

    const url = `${req.protocol}://${req.get("host")}/images/admin/${fileName}`;

    try {
        await Admin.update(
            {
                nm_admin: title,
                adminname: title1,
                email_admin: title2,
                img_admin: fileName,
                url_admin: url,
                password: hashPassword,
                role: title5,
            },
            {
                where: {
                    uuid: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Data admin berhasil dirubah" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export const deleteAdmin = async (req,res) => {
    const response = await Admin.findOne({
        where: {
            uuid: req.params.id,
        },
    });

    if (!response)
        return res.status(404).json({ msg: "Data Admin tidak ditemukan" });
    try {
        
        const filepath = `./public/images/admin/${response.img_admin}`;
        fs.unlinkSync(filepath);
        
        await Admin.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ msg: "Data Admin berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message});
    }
};