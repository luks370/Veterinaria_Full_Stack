import jwt from "jsonwebtoken"

const generarJWT = (informacion, expirado) => {
    const token = jwt.sign(
        informacion,
        process.env.JWT_SECRET,
        expirado
      );

    return token
}

export default generarJWT;