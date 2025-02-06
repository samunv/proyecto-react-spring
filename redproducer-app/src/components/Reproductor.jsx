import React, { useRef, useState, useEffect } from "react";
import "../css/Reproductor.css";
import ModalLyrics from "./ModalLyrics"; 

const Reproductor = ({ videoSrc, imagenSrc, titulo, artista, letra, delay = 0 }) => {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [lineaActual, setLineaActual] = useState(0);
  const [inicioLetra, setInicioLetra] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setReproduciendo(false); // No iniciar automáticamente para evitar bloqueos

      const delayTimer = setTimeout(() => {
        setInicioLetra(true);
      }, delay * 1000);

      return () => clearTimeout(delayTimer); // Limpiar timeout al cambiar de canción
    }
  }, [videoSrc, delay]);

  useEffect(() => {
    const audio = audioRef.current;

    const actualizarProgreso = () => {
      if (!audio || isNaN(audio.duration) || audio.duration === 0) return;

      const tiempo = audio.currentTime;
      setTiempoActual(tiempo);
      setProgreso((tiempo / audio.duration) * 100);

      const tiempoAjustado = inicioLetra ? tiempo - delay : 0;

      if (inicioLetra) {
        const nuevaLinea = letra.findIndex((linea, i) => {
          return i === letra.length - 1 || (tiempoAjustado >= linea.tiempo && tiempoAjustado < letra[i + 1].tiempo);
        });

        if (nuevaLinea !== -1 && nuevaLinea !== lineaActual) {
          setLineaActual(nuevaLinea);
        }
      }
    };

    audio.addEventListener("timeupdate", actualizarProgreso);
    return () => {
      audio.removeEventListener("timeupdate", actualizarProgreso);
    };
  }, [letra, inicioLetra, delay]);

  const formatearTiempo = (tiempo) => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60);
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
  };

  const alternarReproduccion = () => {
    const audio = audioRef.current;
    if (reproduciendo) {
      audio.pause();
    } else {
      audio.play().catch(error => console.log("Error al reproducir:", error));
    }
    setReproduciendo(!reproduciendo);
  };

  return (
    <div className="reproductor">
      {/* Portada de la canción */}
      <div className="portada">
        {imagenSrc ? (
          <img src={imagenSrc} alt="Portada" className="imagen-portada" />
        ) : (
          <div className="portada-placeholder">Sin portada</div>
        )}
      </div>
  
      {/* Información de la canción */}
      <h3 className="titulo">{titulo || "Título desconocido"}</h3>
      <p className="artista">{artista || "Artista desconocido"}</p>
  
      {/* Barra de progreso */}
      <div className="contenedor-barra">
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progreso) ? 0 : progreso} 
          onChange={(e) => {
            const nuevoTiempo = (audioRef.current?.duration * e.target.value) / 100;
            if (!isNaN(nuevoTiempo) && audioRef.current) {
              audioRef.current.currentTime = nuevoTiempo;
              setProgreso(e.target.value);
            }
          }}
          className="barra-progreso"
        />
      </div>
  
      {/* Tiempo actual de reproducción */}
      <p className="tiempo">{formatearTiempo(tiempoActual)}</p>
  
      {/* Botón de reproducción */}
      <button className="boton-reproducir" onClick={alternarReproduccion}>
        <img 
          src={reproduciendo ? "./../img/pause-icon.png" : "./../img/play-icon.png"} 
          alt={reproduciendo ? "Pausar" : "Reproducir"} 
        />
      </button>
  
      {/* Elemento de audio oculto */}
      <video ref={audioRef} src={videoSrc} style={{ display: "none" }} />
  
      {/* Botón para abrir las letras */}
      <button className="boton-lyrics" onClick={() => setModalAbierto(true)}>🎵</button>
  
      {/* Sección de letras sincronizadas */}
      <div className="lyrics-sync">
        <p className="lyrics-prev">{Array.isArray(letra) ? letra[lineaActual - 1]?.texto || "" : ""}</p>
        <p className="lyrics-current">{Array.isArray(letra) ? letra[lineaActual]?.texto || "" : ""}</p>
        <p className="lyrics-next">{Array.isArray(letra) ? letra[lineaActual + 1]?.texto || "" : ""}</p>
      </div>
  
      {/* Modal con letras */}
      {modalAbierto && <ModalLyrics letra={letra} onClose={() => setModalAbierto(false)} />}
    </div>
  );
  
};

export default Reproductor;
