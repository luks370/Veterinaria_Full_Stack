import veterinariosTabla from "../Models/veterinarioModel.js"
import generarToken from "../Helpers/generarToken.js"
import comprobarPass from "../Helpers/comprobarPass.js"
import generarJWT from "../Helpers/generarJWT.js"

const obtenerVeterinarios = async (req, res) => {
    try {
        const veterinarios = await veterinariosTabla.findAll();

        res.json({veterinarios: veterinarios})
    } catch (error) {
        console.log(error)
    }

}

const registrar = async (req, res) => {
  const { nombre, email, password, telefono, web } = req.body;

  try {
    const existe = await veterinariosTabla.findOne({ where: { email } });

    if (existe) {
      return res.json({ msj: "Ya existe una cuenta registrada con ese mail." });
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
      .status(201)
      .json({
        msj: `Veterinario agregado correctamente. Token: ${veterinario.token}`,
      });
  } catch (error) {
    console.log(error);
  }
};

const confirmarToken = async (req, res) => {
  const { token } = req.params;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { token } });

    if (!veterinario) {
      res.status(404).json({ msj: "Token no valido" });
    }

    veterinario.token = null;
    veterinario.confirmado = true;
    await veterinario.save();

    res.status(200).json({ msj: "Token valido. Cuenta confirmada" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const veterinario = await veterinariosTabla.findOne({
      where: { email },
    });

    if (!veterinario) {
      return res.status(404).json({ msj: "No existe cuenta" });
    }

    if (!veterinario.confirmado) {
      return res.status(401).json({ msj: "Cuenta no confirmada" });
    }

    if (!(await comprobarPass(password, veterinario.password))) {
      return res.status(401).json({ msj: "Password incorrecta" });
    }

    const tokenJWT = generarJWT({
      id: veterinario.id,
      email: veterinario.email,
    });

    res.status(200).json({ msj: `Logueo Correcto. Token: ${tokenJWT}` });
  } catch (error) {
    console.log(error);
  }
};

const perfil = async (req, res) => {
  try {
    const veterinario = await veterinariosTabla.findByPk(req.veterinario.id, {
      attributes: {
        exclude: ["password", "token"],
      },
    });

    res.status(200).json(veterinario);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { email } });

    if (!veterinario) {
      res.status(404).json({ msj: "No existe cuenta" });
    }

    veterinario.token = generarToken();
    await veterinario.save();

    res.status(200).json({ msj: `Token generado: ${veterinario.token}` });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { token } });

    if (!veterinario) {
      return res.status(401).json({ msj: "Token invalido" });
    }

    res.status(200).json({ msj: "Token valido" });
  } catch (error) {
    console.log(error);
  }
};

const nuevaPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const veterinario = await veterinariosTabla.findOne({ where: { token } });

    if (!veterinario) {
      return res.status(401).json({ msj: "Token invalido" });
    }

    veterinario.password = password;
    veterinario.token = null;

    await veterinario.save();

    res.status(200).json({ msj: "Password cambiada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  obtenerVeterinarios,
  registrar,
  confirmarToken,
  login,
  perfil,
  olvidePassword,
  comprobarToken,
  nuevaPassword,
};