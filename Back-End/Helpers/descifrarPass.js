import bcrypt from "bcrypt"

export const descifrarPass = async (password, passwordHass) => {
    return await bcrypt.compare(password, passwordHass)
}


// export default bcrypt