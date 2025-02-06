import React, { useRef, useState, useEffect } from "react";
import "../css/Reproductor.css";

const Reproductor = ({ videoSrc, imagenSrc, titulo, artista }) => {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [tiempoActual, setTiempoActual] = useState("0:00");

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setReproduciendo(true);
    }
  }, [videoSrc]); // Cambia la canción automáticamente

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

  return (
    <div className="reproductor">
      <div className="portada">
        <img src={imagenSrc} alt="Portada" className="imagen-portada" />
      </div>

      <h3 className="titulo">{titulo}</h3>
      <p className="artista">{artista}</p>

      <div className="contenedor-barra">
        <input
          type="range"
          min="0"
          max="100"
          value={progreso}
          onChange={(e) => {
            const nuevoTiempo = (audioRef.current.duration * e.target.value) / 100;
            audioRef.current.currentTime = nuevoTiempo;
            setProgreso(e.target.value);
          }}
          className="barra-progreso"
        />
      </div>

      <p className="tiempo">{tiempoActual}</p>

      <button className="boton-reproducir" onClick={alternarReproduccion}>
        <img src={reproduciendo ? "./../img/pause-icon.png" : "./../img/play-icon.png"} alt="Reproducir/Pausar" />
      </button>

      <video ref={audioRef} src={videoSrc} style={{ display: "none" }} />
    </div>
  );
};

export default Reproductor;
