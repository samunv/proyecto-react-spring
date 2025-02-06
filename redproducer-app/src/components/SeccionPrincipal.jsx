import "../css/SeccionPrincipal.css"


import Cancion from "./Cancion";


import canciones from "../data/canciones.json";

function SeccionPrincipal() {
	return (
		<div className="contenedor-principal">
			<div className="caja-buscador">
				<input
					type="text"
					className="buscador"
					placeholder="Buscar Canción..."
				/>
				<button className="boton-buscador">
					<img
						src="./../img/lupa.png" // Ruta desde la raíz del proyecto, sin necesidad de importar
						alt="Buscar"
					/>
				</button>
			</div>
			<div className="contenedor-canciones">
				{canciones.map((cancion, i) => (
					<Cancion
						key={i}
						titulo={cancion.titulo}
						portada={cancion.portada}
						cancion={cancion} // Aquí pasas el objeto completo "cancion"
						artista={cancion.artista}
					/>
				))}
			</div>
		</div>
	);
}

export default SeccionPrincipal;
