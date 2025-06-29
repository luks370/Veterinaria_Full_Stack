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

const agregar = async (req, res) => {
    const {propietario, nombre, email, telefono, fecha, sintomas} = req.body;

    try {
        const pacienteNuevo = await pacientesTabla.create({propietario, nombre, email, telefono, fecha, sintomas, veterinarioId: req.veterinario.id})

        res.status(200).json(pacienteNuevo)

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: "error al agregar"})
    }
}


 

export {obtenerPacientes, obtenerPaciente,
    agregar
}