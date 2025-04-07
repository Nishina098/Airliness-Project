import { Sequelize } from "sequelize";

const db = new Sequelize("eticket_airplanes", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;