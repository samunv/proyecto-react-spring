import React from "react";
import "../css/Reproductor.css";

const Reproductor = () => {
  return (
    <div className="reproductor">
      {/* Imagen de portada del álbum */}
      <div className="portada">
        <div className="icono-musica">🎵</div>
      </div>

      {/* Información de la canción */}
      <h3 className="titulo">Título</h3>
      <p className="artista">Artista</p>

      {/* Barra de progreso (sin funcionalidad aún) */}
      <input type="range" min="0" max="100" value="30" readOnly />

      {/* Tiempo actual de reproducción */}
      <p className="tiempo">1:10</p>

      {/* Botón de reproducción (aún sin funcionalidad) */}
      <button className="boton-reproducir">▶️</button>
    </div>
  );
};

export default Reproductor;
