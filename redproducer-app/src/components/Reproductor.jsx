import React, { useRef, useState, useEffect } from "react";
import "../css/Reproductor.css";
import ModalLyrics from "./ModalLyrics"; 

const Reproductor = ({ videoSrc, imagenSrc, titulo, artista, letra }) => {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [lineaActual, setLineaActual] = useState(0); // Índice de la línea actual

  // 📌 Cargar y empezar la canción automáticamente al cambiar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setReproduciendo(true);
    }
  }, [videoSrc]);

  // 📌 Escuchar el tiempo del audio y actualizar progreso
  useEffect(() => {
    const audio = audioRef.current;

    const actualizarProgreso = () => {
      const tiempo = audio.currentTime;
      setTiempoActual(tiempo);
      setProgreso((tiempo / audio.duration) * 100);

      // 📌 Buscar qué línea de la letra debe mostrarse
      const nuevaLinea = letra.findIndex((linea, i) => {
        return i === letra.length - 1 || (tiempo >= linea.tiempo && tiempo < letra[i + 1].tiempo);
      });

      if (nuevaLinea !== -1) {
        setLineaActual(nuevaLinea);
      }
    };

    audio.addEventListener("timeupdate", actualizarProgreso);
    return () => {
      audio.removeEventListener("timeupdate", actualizarProgreso);
    };
  }, [letra]);

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

      <p className="tiempo">{formatearTiempo(tiempoActual)}</p>

      <button className="boton-reproducir" onClick={alternarReproduccion}>
        <img src={reproduciendo ? "./../img/pause-icon.png" : "./../img/play-icon.png"} alt="Reproducir/Pausar" />
      </button>

      <video ref={audioRef} src={videoSrc} style={{ display: "none" }} />
      <button className="boton-lyrics" onClick={() => setModalAbierto(true)}>🎵</button>

      {/* 📌 Sección de lyrics sincronizadas */}
      <div className="lyrics-sync">
        <p className="lyrics-prev">{letra[lineaActual - 1]?.texto || ""}</p>
        <p className="lyrics-current">{letra[lineaActual]?.texto || ""}</p>
        <p className="lyrics-next">{letra[lineaActual + 1]?.texto || ""}</p>
      </div>

      {/* 📌 Mostrar el modal cuando modalAbierto sea true */}
      {modalAbierto && <ModalLyrics letra={letra} onClose={() => setModalAbierto(false)} />}
    </div>
  );
};

export default Reproductor;
