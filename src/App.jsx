import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallo, setIsFallo] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (response.ok) {
        const sensado = await response.json();
        setData(sensado);
        setIsLoading(false);
        console.log("Trabajo");
      }else{
        setIsFallo("No devolvio ningun mensaje");
      }
    } catch (error) {
      setIsFallo("Hubo fallo con la peticion");
    }
  }

  let identificadorTiempoDeEspera;

  const sensando = () => {
    identificadorTiempoDeEspera = setInterval(fetchData, 3000);
    console.log(identificadorTiempoDeEspera);
  };

  if (isLoading) {
    return (
      <>
        <h1>Lectura del Sensor LDR</h1>
        <div>
          <h4>Cargando...</h4>
        </div>
      </>
    )
  }

  if (isFallo) {
    return (
      <>
        <h1>Lectura del Sensor LDR</h1>
        <div>
          <h4>{isFallo}</h4>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>Lectura del Sensor LDR</h1>
      {data.length > 0 ? (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>{user.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay datos</p>
      )}
      <button onClick={() => sensando()}></button>
    </>
  )
}

export default App
