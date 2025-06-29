import Pacientes from "./Pacientes.js";
import Veterinarios from "./Veterinarios.js";

Veterinarios.hasMany(Pacientes, { foreignKey: "veterinarioId" });
Pacientes.belongsTo(Veterinarios, { foreignKey: "veterinarioId" });
