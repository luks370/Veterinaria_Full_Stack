const generarToken = () => {
    const token = Math.random().toString(32).slice(2) + Date.now().toString(32)

    return token
}

export default generarToken