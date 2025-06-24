import veterinariosTabla from "../Models/Veterinarios.js"
import generarToken from "../Helpers/generarToken.js"


const registrar = async (req, res) => {
    const {nombre, email, password, telefono, web} = req.body;

    try {
        const existe = await veterinariosTabla.findOne({where: {email}})

        if(existe){
            return res.status(403).json({msj: "El mail ya existe"})
        }
        
      const veterinario = await veterinariosTabla.create({
        nombre,
        email,
        password,
        telefono,
        web,
        token: generarToken(),
      });

      res.status(400).json({ msj: `Veterinario Registrado. Token: ${veterinario.token}` });
    } catch (error) {
      console.log(error);
    }
}

const confirmar = (req, res) => {
    res.send("comprobando token")
}

const autenticar = (req, res) => {
    res.send("autenticando")
}




export {
    registrar,
    confirmar,
    autenticar
}