import React, { useState } from "react";
import "../css/Inicio.css";
import SeccionPrincipal from "./SeccionPrincipal";
import Reproductor from "./Reproductor";
import canciones from "../data/canciones.json"; // Importamos las canciones

function Inicio() {
	//Obtener una canción aleatoria
	const obtenerCancionAleatoria = (canciones) => {
		const cancionAleatoria = Math.floor(Math.random() * canciones.length);
		return canciones[cancionAleatoria];
	};

	// Estado global para manejar la canción actual
	const [cancionActual, setCancionActual] = useState(obtenerCancionAleatoria(canciones)); // Canción por defecto

	return (
		<section className="pagina-inicio">
			{/* Se pasa "setCancionActual" a SeccionPrincipal para actualizar la canción al hacer clic */}
			<SeccionPrincipal seleccionarCancion={setCancionActual} />

			{/* El reproductor recibe la canción seleccionada y cambia dinámicamente */}
			<Reproductor
				videoSrc={cancionActual.audio}
				imagenSrc={cancionActual.portada}
				titulo={cancionActual.titulo}
				artista={cancionActual.artista}
				letra={cancionActual.letra || []}
			/>
		</section>
	);
}

export default Inicio;
