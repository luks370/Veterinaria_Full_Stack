import jwt from "jsonwebtoken"

const generarJWT = (informacion, expirado) => {
    const tokenJWT = jwt.sign(informacion, process.env.JWT_SECRET, {
      expiresIn: expirado,
    });

    return tokenJWT;
}

export default generarJWT;