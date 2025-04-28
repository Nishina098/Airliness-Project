import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Maskapai = db.define(
    "maskapai",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        nama_maskapai: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 255],
            },
        },

        kode_maskapai: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 10],
            },
        },

        logo_maskapai: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status_operasional: {
            type: DataTypes.ENUM('aktif', 'nonaktif'),
            allowNull: false,
            defaultValue: 'aktif',
            validate: {
                notEmpty: true,
                isIn: [['aktif', 'nonaktif']],
            },
        },

        jumlah_pesawat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
                isInt: true,
                min: 0,
            },
        },

        nomor_kontak: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 20],
            },
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },

        website: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, 100],
            },
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "maskapai",
            validate: {
                notEmpty: true,
            },
        },

        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
    }
);

export default Maskapai;

(async () => {
    await db.sync();
})();