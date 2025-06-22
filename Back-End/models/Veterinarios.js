import { Sequelize } from "sequelize"
import db from "../config/db.js"
import generarToken from "../helpers/generarToken.js";

const veterinariosTabla = db.define("veterinarios", {
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefono: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    web: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: generarToken()
    },
    confirmado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export default veterinariosTabla;