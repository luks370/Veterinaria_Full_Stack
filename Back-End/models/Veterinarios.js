import { Sequelize } from "sequelize"
import bcrypt from "bcrypt";
import db from "../config/db.js";
import generarToken from "../helpers/generarToken.js";

const veterinariosTabla = db.define(
  "veterinarios",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    web: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: generarToken(),
    },
    confirmado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    hooks: {
      async beforeCreate(veterinario) {
        const salt = await bcrypt.genSalt(10);
        veterinario.password = await bcrypt.hash(veterinario.password, salt);
      },
      async beforeUpdate(veterinario) {
        if (veterinario.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          veterinario.password = await bcrypt.hash(veterinario.password, salt);
        }
      },
    },
  }
);

export default veterinariosTabla;