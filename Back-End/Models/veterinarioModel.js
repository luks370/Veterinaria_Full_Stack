import { Sequelize } from "sequelize";
import bcrypt from "bcrypt"
import db from "../config/db.js"

const veterinariosTabla = db.define("veterinarios", {
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
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  web: {
    type: Sequelize.STRING,
  },
  token: {
    type: Sequelize.STRING,
  },
  confirmado: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  hooks: {
    async beforeCreate(veterinario){
      const salt = await bcrypt.genSalt(10)
      const passHash = await bcrypt.hash(veterinario.password, salt)
      veterinario.password = passHash
    },
    async beforeUpdate(veterinario){
      if(veterinario.changed("password")){
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(veterinario.password, salt);
        veterinario.password = passHash;
      }
    }
  }
});

export default veterinariosTabla