import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallo, setIsFallo] = useState(false);
  const [sensorValue, setSensorValue] = useState(0);

  useEffect(() => {
    sensando();
    const updateBackground = () => {
      if (sensorValue>=0 && sensorValue<16250)  {
        document.body.style.backgroundColor = "#1A2130";
        document.body.style.color="white"
      } else if (sensorValue>=16250 && sensorValue<32500 ) {
        document.body.style.backgroundColor = "#5A72A0";
        document.body.style.color ="#FFFBC9"
      } else if(sensorValue>=32500 && sensorValue<48750){
        document.body.style.backgroundColor = "#83B4FF";
        document.body.style.color ="#FFF688"
      } else{
        document.body.style.backgroundColor = "#FDFFE2";
        document.body.style.color="#FCEB1D"
      }
    };

    updateBackground();
  }, [sensorValue]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (response.ok) {
        const users = await response.json();
        setData(users);
        //setSensorValue(users.length); // Utilizando la cantidad de usuarios como valor del sensor
        setIsLoading(false);
      } else {
        setIsFallo("No devolvió ningún mensaje");
      }
    } catch (error) {
      setIsFallo("Hubo un fallo con la petición");
    }
  };

  let identificadorTiempoDeEspera;

  const sensando = () => {
    clearInterval(identificadorTiempoDeEspera); // Limpiar intervalo anterior
    identificadorTiempoDeEspera = setInterval(fetchData, 3000);
  };

  if (isLoading) {
    return (
      <>
        <h1>Lectura del Sensor LDR</h1>
        <div>
          <h4>Cargando...</h4>
        </div>
      </>
    );
  }

  if (isFallo) {
    return (
      <>
        <h1>Lectura del Sensor LDR</h1>
        <div>
          <h4>{isFallo}</h4>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Lectura del Sensor LDR</h1>
      {data.length > 0 ? (
        <ul>
          {data?.map((dato) => (
            <li key={dato.id}>{dato.dato}</li>
          ))}
        </ul>
      ) : (
        <p>No hay datos</p>
      )}
    </>
  );
}

export default App;
