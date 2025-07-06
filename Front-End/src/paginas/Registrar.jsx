import {Link} from "react-router-dom"
import { useState } from "react";
import Alerta from "../components/Alerta"

function Registrar() {
  let [nombre, setNombre] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [repitePassword, setRepitePassword] = useState("")
  let [telefono, setTelefono] = useState("")
  let [web, setWeb] = useState("")

  let [alerta, setAlerta] = useState({})

  const url = "http://localhost:4000/api/veterinarios/registrar"; 

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          repitePassword,
          telefono,
          web,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msj);
      }

      setAlerta({ msj: data.msj, error: false });

      setTimeout(() => {
        setAlerta({})
      }, 3000);
    } catch (error) {
      setAlerta({ msj: error.message, error: true });

      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }
  }

  return (
    <main className="container mt-20 mx-auto md:grid md:grid-cols-2 items-center">
      <div>
        <h2 className="text-indigo-500 font-bold text-6xl">
          Crea Tu Cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h2>
      </div>

      <div className="my-10">
        {alerta.msj && <Alerta alerta={alerta}/>}

        <form 
          className="shadow p-10 bg-white rounded-xl gap-20"
          onSubmit={handleSubmit}
        >
          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">Nombre:</label>
            <input
              type="text"
              placeholder="Tu Nombre"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">Email:</label>
            <input
              type="email"
              placeholder="Tu Email"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">
              Repite Password:
            </label>
            <input
              type="password"
              placeholder="Repite Tu Password"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
              value={repitePassword}
              onChange={(e) => setRepitePassword(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">
              Telefono:
            </label>
            <input
              type="tel"
              placeholder="Tu Telefono"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <div className="my-2">
            <label className="text-gray-600 font-bold text-2xl">Web:</label>
            <input
              type="text"
              placeholder="Tu Web"
              className="block w-full p-3 my-3 border border-gray-200 rounded"
              value={web}
              onChange={(e) => setWeb(e.target.value)}
            />
          </div>

          <div className="my-7">
            <input
              type="submit"
              value="Crear Cuenta"
              className="bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer text-white uppercase text-xl font-bold p-4 rounded-xl w-full md:w-auto"
            />
          </div>

          <div className="flex justify-around">
            <Link to="/" className="text-gray-500 hover:text-gray-700">
              Iniciar Sesion
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

export default Registrar