import bcrypt from "bcrypt";
import dotenv from "dotenv";
import veterinariosTabla from "../models/Veterinarios.js";
dotenv.config();
import generarJWT from "../helpers/genrarJWT.js";
import generarToken from "../helpers/generarToken.js";

const registrar = async (req, res) => {
  try {
    const { nombre, email, password, telefono, web } = req.body;
    const existeUsuario = await veterinariosTabla.findOne({ where: { email } });

    if (existeUsuario) {
      return res.status(400).json({ msj: "Ya existe ese usuario" });
    }

    // hasheamos la password
    // const salt = await bcrypt.genSalt(10);
    // const passHash = await bcrypt.hash(password, salt);

    await veterinariosTabla.create({
      nombre,
      email,
      password,
      telefono,
      web,
    });

    res.json({ msj: "Usuario registrado" });
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  console.log(token);

  try {
    const usuarioConfirmar = await veterinariosTabla.findOne({
      where: { token },
    });

    if (!usuarioConfirmar) {
      return res.status(400).json({ msj: "Token no valido" });
    }

    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    return res.json({ msj: "Se confirmo email." });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { email } });

    // existe usuario?
    if (!veterinario) {
      return res.json({ msj: "No existe cuenta registrada con ese mail" });
    }
    // esta confirmado?
    if (!veterinario.confirmado) {
      return res.status(403).json({ msj: "El email usado no esta confirmado" });
    }
    // la contraseña es correcta?
    if (!(await bcrypt.compare(password, veterinario.password))) {
      return res.json({ msj: "pass incorrecta" });
    }

    // paso la autenticacion
    const token = await generarJWT({ id: veterinario.id }, "1h");

    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { email } });

    if (!veterinario) {
      return res.status(403).json({ msj: "No existe usuario" });
    }

    veterinario.token = generarToken();
    await veterinario.save();

    res.status(200).json({
      msj: `Cuenta encontrada. Se genero token y se envio instrucciones. ${veterinario.token}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { token } });

    if (!veterinario) {
      return res.status(403).json({ msj: "Token invalido" });
    }

    res.status(200).json({ msj: `Token valido` });
  } catch (error) {
    console.log(error);
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await veterinariosTabla.findOne({ where: { token } });

  if (!veterinario) {
    return res.status(403).json({ msj: "Token invalido" });
  }

  try {
    // const salt = await bcrypt.genSalt(10);
    // const passHash = await bcrypt.hash(password, salt);

    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();

    return res.status(200).json({ msj: "Cambio de password correcto" });
  } catch (error) {
    console.log(error);
  }
};

// PRIVADO
const perfil = async (req, res) => {
  try {
    const idVeterinario = req.veterinario.id;
    const veterinario = await veterinariosTabla.findByPk(idVeterinario, {
      attributes: {
        exclude: ["password", "token", "confirmado"],
      },
    });

    res.json(veterinario);
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  confirmar,
  autenticar,
  perfil,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
