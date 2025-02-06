import "../css/SeccionPrincipal.css";

import Cancion from "./Cancion";

import canciones from "../data/canciones.json";

function SeccionPrincipal() {
  return (
	<div className="contenedor-principal">
	  <h1 className="titulo-pagina-inicio">Buscar Canciones</h1>
	  <div className="caja-buscador">
		<input
		  type="text"
		  className="buscador"
		  placeholder="Buscar Canción..."
		/>
		<button className="boton-buscador">
		  <img src="./../img/search_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="Buscar" />
		</button>
	  </div>
	  <div className="contenedor-canciones">
		{canciones.map((cancion, i) => (
		  <Cancion
			key={i}
			titulo={cancion.titulo}
			portada={cancion.portada}
			cancion={cancion}
			artista={cancion.artista}
		  />
		))}
	  </div>
	</div>
  );
}

export default SeccionPrincipal;
