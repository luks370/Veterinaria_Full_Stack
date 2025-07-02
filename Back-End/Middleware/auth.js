import comprobarJWT from "../Helpers/comprobarJWT.js"

const authCheck = async (req, res, next) => {
  const tokenJWT = req.headers["authorization"].split(" ")[1];

  if (!tokenJWT) {
    return res.status(401).json({ msj: "Acceso negado" });
  }

  const decoded = await comprobarJWT(tokenJWT);

  req.veterinario = decoded;

  next();
};

export default authCheck