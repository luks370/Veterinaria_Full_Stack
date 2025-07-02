import bcrypt from "bcrypt"

const comprobarPass = (password, passHash) => {
    return bcrypt.compare(password, passHash)
}

export default comprobarPass