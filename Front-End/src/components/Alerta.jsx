function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? "bg-red-500" : "bg-green-500"} p-5 uppercase text-white text-center`}>{alerta.msj}</div>
  )
}

export default Alerta