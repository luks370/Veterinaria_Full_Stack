import pacientesTabla from "../Models/Pacientes.js"



const obtenerPacientes = async (req, res) => {
    try {
      const id = req.veterinario.id;

      const pacientes = await pacientesTabla.findAll({
        where: { veterinarioId: id },
      });

      if(!pacientes || pacientes.length <= 0){
        return res.status(404).json({msj: "No tienes pacientes"})
      }

      return res.status(200).json(pacientes);
    } catch (error) {
        console.error("❌ Error al obtener pacientes:", error);
        return res.status(500).json({ error: error.message });
    }
}

const obtenerPaciente = async (req, res) => {
    const {pacienteId} = req.params;

    try {
        const paciente = await pacientesTabla.findByPk(pacienteId)

        if(!paciente){
            return res.status(404).json({msj: "No existe paciente"})
        }

        if(paciente.veterinarioId !== req.veterinario.id){
            return res.status(404).json({msj: "El paciente no le pertenece"})
        }

        return res.status(200).json(paciente)
    } catch (error) {
        console.log(error)
    }
}

const agregarPaciente = async (req, res) => {
  const { propietario, nombre, email, telefono, fecha, sintomas } = req.body;

  try {
    const pacienteNuevo = await pacientesTabla.create({
      propietario,
      nombre,
      email,
      telefono,
      fecha,
      sintomas,
      veterinarioId: req.veterinario.id,
    });

    res.status(200).json(pacienteNuevo);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msj: "error al agregar" });
  }
};

const actualizarPaciente = async (req, res) => {
  try {
    const {
      propietario,
      nombre,
      email,
      telefono,
      fecha,
      sintomas,
      veterinarioId,
    } = req.body;

    const { id } = req.params;

    const paciente = await pacientesTabla.findByPk(id);

    if (!paciente) {
      return res.status(404).json({ msj: "No existe paciente" });
    }

    if (paciente.veterinarioId != req.veterinario.id) {
      return res
        .status(404)
        .json({ msj: "No puedes modificar un paciente que no es tuyo" });
    }

    paciente.propietario = propietario || paciente.propietario;
    paciente.nombre = nombre || paciente.nombre;
    paciente.email = email || paciente.email;
    paciente.telefono = telefono || paciente.telefono;
    paciente.fecha = fecha || paciente.fecha;
    paciente.sintomas = sintomas || paciente.sintomas;

    await paciente.save();

    return res.status(200).json(paciente);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await pacientesTabla.findByPk(id);

    if (!paciente) {
      return res.status(404).json({ msj: "No existe paciente" });
    }

    if (paciente.veterinarioId != req.veterinario.id) {
      return res
        .status(404)
        .json({ msj: "No puedes eliminar pacientes que no son tuyos" });
    }

    await paciente.destroy();

    res.status(200).json({ msj: "Paciente eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerPacientes,
  obtenerPaciente,
  agregarPaciente,
  actualizarPaciente,
  eliminarPaciente,
};