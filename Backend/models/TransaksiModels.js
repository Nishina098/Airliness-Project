import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Users from "./UsersModels.js";
import Penerbangan from "./PenerbanganModels.js";

const Transaksi = db.define(
    "transaksi",
    {
        id_transaksi: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid_user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Users,
                key: "uuid",
            },
            onDelete: "CASCADE",
        },
        id_penerbangan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Penerbangan,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        kode_booking: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        jumlah_tiket: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        total_harga: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        metode_pembayaran: {
            type: DataTypes.ENUM("transfer", "kartu kredit", "e-wallet"),
            allowNull: false,
        },
        status_pembayaran: {
            type: DataTypes.ENUM("pending", "berhasil", "gagal"),
            defaultValue: "pending",
        },
        bukti_pembayaran: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_bukti: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tanggal_transaksi: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status_tiket: {
            type: DataTypes.ENUM("aktif", "tidak aktif"),
            defaultValue: "tidak aktif",
        },
    },
    {
        freezeTableName: true 
    }
);

// Definisikan relasi
Transaksi.belongsTo(Users, { foreignKey: "uuid_user" });
Transaksi.belongsTo(Penerbangan, { foreignKey: "id_penerbangan" });
Users.hasMany(Transaksi, { foreignKey: "uuid_user" });
Penerbangan.hasMany(Transaksi, { foreignKey: "id_penerbangan" });

export default Transaksi;

(async () => {
    await db.sync();
})();