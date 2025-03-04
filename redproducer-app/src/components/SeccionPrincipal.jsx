import "../css/SeccionPrincipal.css";
import { useState, useEffect } from "react";
import Cancion from "./Cancion";
import canciones from "../data/canciones.json";

function SeccionPrincipal({ seleccionarCancion }) {
  const [busqueda, setBusqueda] = useState("");
  const [busquedaTemporal, setBusquedaTemporal] = useState("");

  const [cancionesAPI, setCancionesAPI] = useState([]);
  const [error, setError] = useState("");

  // Realizar la solicitud a la API para obtener las canciones
  useEffect(() => {
    const fetchCanciones = async () => {
      try {
        // Realizamos la solicitud a la API
        const response = await fetch("http://localhost:8080/api/canciones");
        if (!response.ok) {
          setError(new Error("No se pudieron cargar las canciones"));
          throw error;
        }
        const data = await response.json();
        setCancionesAPI(data); // Guardamos las canciones en el estado
      } catch (err) {
        setError(err); // Si ocurre un error, lo guardamos en el estado
        console.log(error);
      }
    };

    fetchCanciones();
  }, []);

  // Filtrar las canciones según la búsqueda
  const filtrarCanciones = cancionesAPI.filter((cancion) =>
    cancion.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor-principal">
      <h1 className="titulo-pagina-inicio">Inicio</h1>
      <div className="caja-buscador">
        <input
          type="text"
          className="buscador"
          placeholder="¿Qué quieres escuchar? ♫"
          value={busquedaTemporal}
          onChange={(e) => setBusquedaTemporal(e.target.value)}
        />
        <button
          className={busquedaTemporal ? "boton-encendido" : "boton-buscador"}
          onClick={() => setBusqueda(busquedaTemporal)}
          id="boton-buscador"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="white"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </div>
      <p className="texto-busqueda">
        {busqueda ? "Resultados de " + busqueda : "Canciones"}
      </p>
      <div className="contenedor-canciones">
        {filtrarCanciones.length > 0 ? (
          filtrarCanciones.map((cancion, i) => (
            <Cancion
              key={i}
              titulo={cancion.titulo}
              portada={cancion.portada}
              artista={cancion.artista ? cancion.artista.nombre : "Desconocido"} // Manejo de error en caso de que el artista sea null
              seleccionarCancion={() => seleccionarCancion(cancion)}
              activo={true}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron canciones con ese título.</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M480-420q-54 0-101.5 23.5T302-328q-11 16-3 32t26 16q8 0 14.5-3.5T351-294q23-31 57-48.5t72-17.5q38 0 72 17.5t57 48.5q4 7 10.5 10.5T634-280q18 0 26-16.5t-3-33.5q-29-44-76.5-67T480-420Zm140-100q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeccionPrincipal;
