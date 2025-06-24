import veterinariosTabla from "../Models/Veterinarios.js"
import generarToken from "../Helpers/generarToken.js"
import { descifrarPass } from "../Helpers/descifrarPass.js";
import { generarJWT } from "../Helpers/generarJWT.js";

const obtenerVeterinarios = async (req, res) => {
  try {
    const veterinarios = await veterinariosTabla.findAll();

    return res.status(200).json(veterinarios);
  } catch (error) {
    console.log(error);
  }
};

// PUBLICO
const registrar = async (req, res) => {
  const { nombre, email, password, telefono, web } = req.body;

  try {
    const existe = await veterinariosTabla.findOne({ where: { email } });

    if (existe) {
      return res.status(403).json({ msj: "El mail ya existe" });
    }

    const veterinario = await veterinariosTabla.create({
      nombre,
      email,
      password,
      telefono,
      web,
      token: generarToken(),
    });

    res
      .status(400)
      .json({ msj: `Veterinario Registrado. Token: ${veterinario.token}` });
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { token } });

    if (!veterinario) {
      return res.status(404).json({ msj: "Token Invalido" });
    }

    veterinario.token = null;
    veterinario.confirmado = true;
    veterinario.save();

    res.status(200).json({ msj: "Token Confirmado" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { email } });

    if (!veterinario) {
      return res.status(404).json({ msj: "Email no registrado" });
    }

    if (!veterinario.confirmado) {
      return res.status(404).json({ msj: "Email no confirmado" });
    }

    if (!(await descifrarPass(password, veterinario.password))) {
      return res.status(404).json({ msj: "Password incorrecta" });
    }

    return res.status(200).json({
      msj: `Auteticacion Correcta. JWT: ${await generarJWT(veterinario)}`,
    });
  } catch (error) {
    console.log(error);
  }
};

// PRIVADO

const obtenerPerfil = async (req, res) => {
  const veterinario = await veterinariosTabla.findByPk(req.veterinario.id, {
    attributes: {
      exclude: ["password", "token", "confirmado"],
    },
  });

  if (!veterinario) {
    return res.status(404).json({ msj: "Error al obtener perfil" });
  }

  res.status(200).json(veterinario);
};

export { obtenerVeterinarios, registrar, confirmar, autenticar, obtenerPerfil };