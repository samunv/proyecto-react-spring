import React from "react";
import "../css/Reproductor.css";

const Reproductor = () => {
  return (
    <div className="reproductor">
      {/* Imagen de portada */}
      <div className="cover">
        <div className="music-icon">🎵</div>
      </div>

      {/* Información de la canción */}
      <h3 className="title">Título</h3>
      <p className="artist">Artista</p>

      {/* Barra de progreso (sin funcionalidad aún) */}
      <input type="range" min="0" max="100" value="30" readOnly />

      {/* Tiempo actual */}
      <p className="time">1:10</p>

      {/* Botón de reproducción (aún sin funcionalidad) */}
      <button className="play-button">▶️</button>
    </div>
  );
};

export default Reproductor;
