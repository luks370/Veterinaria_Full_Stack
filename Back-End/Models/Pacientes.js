import {Sequelize} from "sequelize"
import db from "../config/db.js"

const pacientesTabla = db.define("pacientes", {
  propietario: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fecha: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  sintomas: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  veterinarioId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});


export default pacientesTabla;