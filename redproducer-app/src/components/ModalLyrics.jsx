import React from "react";
import "../css/ModalLyrics.css";

const ModalLyrics = ({ letra, onClose, titulo, artista}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="cerrar-modal" onClick={onClose}>✖</button>
        <h2 className="titulo-modal">{titulo} - {artista}</h2>
        <div className="lyrics-container">
          {letra.map((linea, i) => (
            <p key={i} className="lyrics-line">{linea.texto}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalLyrics;
