import React from "react";
import "../css/ModalLyrics.css";

const ModalLyrics = ({ letra, lineaActual, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="cerrar-modal" onClick={onClose}>✖</button>

        {/* Letras con efecto Spotify */}
        <div className="lyrics-container">
          <p className="lyrics-prev">{letra[lineaActual - 1]?.texto || ""}</p>
          <p className="lyrics-current">{letra[lineaActual]?.texto || ""}</p>
          <p className="lyrics-next">{letra[lineaActual + 1]?.texto || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalLyrics;
