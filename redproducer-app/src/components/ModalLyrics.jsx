import React from 'react';
import '../css/ModalLyrics.css';

const ModalLyrics = ({ letra, onClose }) => {
    return (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="cerrar-modal" onClick={onClose}>✖</button>
            <h2 className="titulo-modal">Lyrics</h2>
            <div className="lyrics-container">
              {letra.split("\n").map((linea, i) => (
                <p key={i} className="lyrics-line">{linea}</p>
              ))}
            </div>
          </div>
        </div>
      );
};

export default ModalLyrics;