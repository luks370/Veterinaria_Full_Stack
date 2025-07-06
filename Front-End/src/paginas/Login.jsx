import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="container mt-20 mx-auto md:grid md:grid-cols-2 items-center">
      <div className="p-5">
        <h2 className="text-indigo-500 font-bold text-6xl">
          Inicia Sesion y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h2>
      </div>

      <div className="mt-10">
        <form action="#" className="shadow p-10 bg-white rounded-xl gap-20">
          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">
              Email:
            </label>
            <input
              type="email"
              placeholder="Tu Email"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
            />
          </div>

          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">
              Password:
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
            />
          </div>

          <div className="my-7">
            <input
              type="submit"
              value="Iniciar Sesion"
              className="bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer text-white uppercase text-xl font-bold p-4 rounded-xl w-full md:w-auto"
            />
          </div>

          <div className="flex justify-around">
            <Link to="/registrar" className="text-gray-500 hover:text-gray-700">
              ¿No tienes cuenta? Registrarse
            </Link>
            <Link
              to="/olvide-password"
              className="text-gray-500 hover:text-gray-700"
            >
              Olvide Password
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login