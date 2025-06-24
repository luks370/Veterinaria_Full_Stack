import { Sequelize } from "sequelize";
import bcrypt from "bcrypt"
import db from "../config/db.js"

const veterinariosTabla = db.define(
  "veterinarios",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefono: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    web: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    token: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    confirmado: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
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


export default veterinariosTabla