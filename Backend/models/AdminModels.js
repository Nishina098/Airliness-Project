import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Admin = db.define(
    "admin",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        nm_admin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3,100],
            },
        },

        username_admin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },

        email_admin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },

        img_admin: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },

        url_admin: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },

        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false,
            },
        },
    },

    {
        freezeTableName: true,
    }
);

export default Admin;

(async () => {
    await db.sync();
})();