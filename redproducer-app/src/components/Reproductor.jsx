import React, { useRef, useState, useEffect } from "react";
import "../css/Reproductor.css";

const Reproductor = ({ videoSrc, imagenSrc, titulo, artista }) => {
  const audioRef = useRef(null); // Referencia al audio (extraído del MP4)
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [tiempoActual, setTiempoActual] = useState("0:00");

  useEffect(() => {
    const audio = audioRef.current;

    const actualizarProgreso = () => {
      const porcentaje = (audio.currentTime / audio.duration) * 100;
      setProgreso(porcentaje);
      setTiempoActual(formatearTiempo(audio.currentTime));
    };

    audio.addEventListener("timeupdate", actualizarProgreso);
    return () => {
      audio.removeEventListener("timeupdate", actualizarProgreso);
    };
  }, []);

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
      audio.play();
    }
    setReproduciendo(!reproduciendo);
  };

  const cambiarProgreso = (e) => {
    const audio = audioRef.current;
    const nuevoTiempo = (audio.duration * e.target.value) / 100;
    audio.currentTime = nuevoTiempo;
    setProgreso(e.target.value);
  };

  return (
    <div className="reproductor">
      {/* Imagen de portada */}
      <div className="portada">
        <img src={imagenSrc} alt="Portada" className="imagen-portada" />
      </div>

      {/* Información de la canción */}
      <h3 className="titulo">{titulo}</h3>
      <p className="artista">{artista}</p>

      {/* Barra de progreso */}
      <div className="contenedor-barra">
        <input
          type="range"
          min="0"
          max="100"
          value={progreso}
          onChange={cambiarProgreso}
          className="barra-progreso"
        />
      </div>

      {/* Tiempo actual de reproducción */}
      <p className="tiempo">{tiempoActual}</p>

      {/* Botón de reproducción */}
      <button className="boton-reproducir" onClick={alternarReproduccion}>
        <img src={reproduciendo ? "./../img/pause-icon.png" : "./../img/play-icon.png"} alt="Reproducir/Pausar" />
      </button>

      {/* Elemento de audio oculto que usa el MP4 solo para el sonido */}
      <video ref={audioRef} src={videoSrc} style={{ display: "none" }} />
    </div>
  );
};

export default Reproductor;
