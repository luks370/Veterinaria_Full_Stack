import {Link} from "react-router-dom"

function OlvidePassword() {
  return (
    <main className="container mt-20 mx-auto md:grid md:grid-cols-2 items-center">
      <div>
        <h2 className="text-indigo-500 font-bold text-6xl">
          Recupera Tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h2>
      </div>

      <div className="mt-10">
        <form action="#" className="shadow p-10 bg-white rounded-xl gap-20">
          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">Email:</label>
            <input
              type="email"
              placeholder="Tu Email"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
            />
          </div>

          <div className="my-7">
            <input
              type="submit"
              value="Recuperar"
              className="bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer text-white uppercase text-xl font-bold p-4 rounded-xl w-full md:w-auto"
            />
          </div>


          <div className="flex justify-around">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Iniciar Sesion
            </Link>
            <Link
              to="/registrar"
              className="text-gray-500 hover:text-gray-700"
            >
              ¿No tienes cuenta? Registrate
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default OlvidePassword