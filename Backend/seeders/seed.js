import Admin from "../models/AdminModels.js";
import Users from "../models/UsersModels.js";
import Maskapai from "../models/MaskapaiModels.js";
import db from "../config/database.js";
import argon2 from "argon2";

(async () => {
    try {
        const hashPassword = await argon2.hash("admin");
        await db.sync();

        await Admin.bulkCreate([
            {
                nm_admin: "Super Admin",
                username_admin: "superadmin",
                email_admin: "admin@gmail.com",
                password: hashPassword,
                role: "administrator",
            },
        ]);

        console.log("Seeding Admins selesai!");
    } catch (error) {
        console.error("Seeding Admins gagal:", error);
    }
})();

(async () => {
    try {
        const hashPassword = await argon2.hash("users");

        for (let i = 1; i <= 10; i++) {
             await Users.bulkCreate([
            {
                nm_user: `user ${i}`,
                username: `users${i}`,
                email_user: `users${i}@gmail.com`,
                password: hashPassword,
                role: "pelanggan",
            },
        ]);
        }
       
        console.log("Seeding Users selesai!");
    } catch (error) {
        console.error("Seeding Users gagal:", error);
    }
})();

(async () => {
    try {
        const hashPassword = await argon2.hash("maskapai");

        for (let i = 1; i <= 5; i++) {
            await Maskapai.bulkCreate([
                {
                    nama_maskapai: `Maskapai ${i}`,
                    kode_maskapai: `MK${i}`,
                    logo_maskapai: `maskapai${i}.png`,
                    deskripsi: `Deskripsi untuk maskapai ${i}`,
                    status_operasional: "aktif",
                    jumlah_pesawat: 50 + i * 10,
                    nomor_kontak: `08123456${i.toString().padStart(4, '0')}`,
                    email: `maskapai${i}@gmail.com`,
                    website: `https://www.maskapai${i}.com`,
                    password: hashPassword,
                    role: "maskapai"
                },
            ]);
        }
        
        console.log("Seeding Maskapai selesai!");
    } catch (error) {
        console.error("Seeding Maskapai gagal:", error);
    }
})();
