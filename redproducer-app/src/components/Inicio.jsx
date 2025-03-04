import { useState, useEffect } from "react";
import "../css/Inicio.css";
import SeccionPrincipal from "./SeccionPrincipal";
import Reproductor from "./Reproductor";

function Inicio() {
    // Estado para almacenar las canciones obtenidas de la API
    const [cancionesAPI, setCancionesAPI] = useState([]);
    const [cancionActual, setCancionActual] = useState(null);
    const [error, setError] = useState("");

    // Función para obtener una canción aleatoria
    const obtenerCancionAleatoria = (canciones) => {
        if (!canciones || canciones.length === 0) return null;
        const indiceAleatorio = Math.floor(Math.random() * canciones.length);
        return canciones[indiceAleatorio];
    };

    // Obtener canciones desde la API al cargar la página
    useEffect(() => {
        const fetchCanciones = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/canciones");
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las canciones");
                }
                const data = await response.json();
                setCancionesAPI(data);

                // Seleccionar una canción aleatoria cuando se obtienen los datos
                if (data.length > 0) {
                    setCancionActual(obtenerCancionAleatoria(data));
                }
            } catch (err) {
                setError(err.message);
                console.error("Error al obtener las canciones:", err);
            }
        };

        fetchCanciones();
    }, []);

    return (
        <section className="pagina-inicio">
            {/* Se pasa setCancionActual a SeccionPrincipal para actualizar la canción al hacer clic */}
            <SeccionPrincipal seleccionarCancion={setCancionActual} />

            {/* Muestra un mensaje si hay error */}
            {error && <p className="error">{error}</p>}

            {/* El reproductor solo se muestra si hay una canción seleccionada */}
            {cancionActual ? (
                <Reproductor
                    videoSrc={cancionActual.audio}
                    imagenSrc={cancionActual.portada}
                    titulo={cancionActual.titulo}
                    artista={cancionActual.artista ? cancionActual.artista.nombre : "Desconocido"}
                    letra={cancionActual.letra || []}
                />
            ) : (
                <p className="loading">Cargando canción...</p> // Mensaje mientras carga
            )}
        </section>
    );
}

export default Inicio;
