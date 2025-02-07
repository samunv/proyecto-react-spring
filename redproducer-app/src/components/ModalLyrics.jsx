import React, { useEffect, useRef } from "react";
import "../css/ModalLyrics.css";

const ModalLyrics = ({ letra, onClose, titulo, artista }) => {
  const lyricsRef = useRef(null);

  useEffect(() => {
    const lyricsContainer = lyricsRef.current;
    if (!lyricsContainer) return;

    let velocidad = 1; // Velocidad del scroll
    const intervalo = setInterval(() => {
      if (lyricsContainer.scrollTop < lyricsContainer.scrollHeight - lyricsContainer.clientHeight) {
        lyricsContainer.scrollTop += velocidad;
      } else {
        lyricsContainer.scrollTop = 0; // Reinicia el scroll cuando llega al final
      }
    }, 50); // Ajusta la velocidad del scroll

    return () => clearInterval(intervalo); // Limpia el intervalo cuando se cierra el modal
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="cerrar-modal" onClick={onClose}>✖</button>
        <h2 className="titulo-modal">{titulo} - {artista}</h2>
        <div className="lyrics-container" ref={lyricsRef}>
          {letra.map((linea, i) => (
            <p key={i} className="lyrics-line">{linea.texto}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalLyrics;
