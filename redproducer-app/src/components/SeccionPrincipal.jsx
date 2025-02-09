import "../css/SeccionPrincipal.css";
import { useState } from "react";
import Cancion from "./Cancion";
import canciones from "../data/canciones.json";

function SeccionPrincipal({ seleccionarCancion }) {
  const [busqueda, setBusqueda] = useState("");

  const [busquedaTemporal, setBusquedaTemporal] = useState("");

  // Filtrar las canciones según la búsqueda
  const filtrarCanciones = canciones.filter((cancion) =>
	cancion.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
	<div className="contenedor-principal">
	  <h1 className="titulo-pagina-inicio">Inicio</h1>
	  <div className="caja-buscador">
		<input
		  type="text"
		  className="buscador"
		  placeholder="¿Qué quieres escuchar?"
		  value={busquedaTemporal}
		  onChange={(e) => setBusquedaTemporal(e.target.value)}
		/>
		<button
		  className={busquedaTemporal ? "boton-encendido" : "boton-buscador"}

		  
		  onClick={(e) => setBusqueda(busquedaTemporal)}
		>
		  <img
			src="./../img/search_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png"
			alt="Buscar"
		  />
		</button>
	  </div>
	  <p className="texto-busqueda">
		{busqueda ? "Resultados de " + busqueda + ":" : "Canciones:"}
	  </p>
	  <div className="contenedor-canciones">
		{filtrarCanciones.length > 0 ? (
		  filtrarCanciones.map((cancion, i) => (
			<Cancion
			  key={i}
			  titulo={cancion.titulo}
			  portada={cancion.portada}
			  artista={cancion.artista}
			  seleccionarCancion={() => seleccionarCancion(cancion)}
			/>
		  ))
		) : (
		  <p className="no-results-p">No se encontraron canciones.</p>
		)}
	  </div>
	</div>
  );
}

export default SeccionPrincipal;
