import "../css/SeccionPrincipal.css";
import { useState } from "react";
import Cancion from "./Cancion";
import canciones from "../data/canciones.json";

function SeccionPrincipal({seleccionarCancion}) {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar las canciones según la búsqueda
  const filtrarElementos = canciones.filter((cancion) =>
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
		  value={busqueda}
		  onChange={(e) => setBusqueda(e.target.value)}
		/>
		<button className="boton-buscador">
		  <img
			src="./../img/search_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png"
			alt="Buscar"
		  />
		</button>
	  </div>
	  <div className="contenedor-canciones">
		{filtrarElementos.length > 0 ? (
		  filtrarElementos.map((cancion, i) => (
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
