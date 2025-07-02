import pacientesTabla from "../Models/pacienteModel.js"


const obtenerPacientes = async (req, res) => {
    
    try {
        const pacientes = await pacientesTabla.findAll({where: {veterinarioId: req.veterinario.id}});

        if(pacientes.length <= 0){
            return res.status(200).json({msj: "No hay pacientes"})
        }

        res.status(200).json(pacientes)
    
    } catch (error) {
        console.log(error)
    }
}

const obtenerPacienteId = async (req, res) => {
    const {id} = req.params;

    try {
      const paciente = await pacientesTabla.findOne({
        where: {id}
      });

      if (!paciente) {
        return res.status(404).json({msj: "No existe paciente"})
      }

      res.status(200).json(paciente);
    } catch (error) {
      console.log(error);
    }
}

const agregar = async (req, res) => {
    const {propietario, nombre, email, telefono, fecha, sintomas} = req.body;
    
    try {
        const paciente = await pacientesTabla.create({propietario, nombre, email, telefono, fecha, sintomas, veterinarioId: req.veterinario.id})

        res.status(200).json({msj: "Paciente agregado"})


    } catch (error) {
        console.log(error)
    }

}

const actualizar = async (req, res) => {
    const {id} = req.params;
    const {propietario, nombre, email, telefono, fecha, sintomas} = req.body;

    try {
        const paciente = await pacientesTabla.findByPk(id);

        paciente.propietario = propietario || paciente.propietario;
        paciente.nombre = nombre || paciente.nombre;
        paciente.email = email || paciente.email;
        paciente.telefono = telefono || paciente.telefono;
        paciente.fecha = fecha || paciente.fecha;
        paciente.sintomas = sintomas || paciente.sintomas;
        
        await paciente.save();

        res.status(200).json({msj: "Paciente Actualizado"})
    } catch (error) {
        console.log(error)
    }
}

const eliminar = async (req, res) => {
    const {id} = req.params;

    const paciente = await pacientesTabla.findByPk(id)

    if(!paciente){
        return res.status(404).json({msj: "No existe paciente"})
    }

    if(paciente.veterinarioId != req.veterinario.id){
        return res.status(404).json({msj: "El paciente no te pertenece"})
    }

    await paciente.destroy();

    res.status(200).json({msj: "Paciente Eliminado"})
}



export {
    obtenerPacientes,
    agregar,
    obtenerPacienteId,
    actualizar,
    eliminar
}