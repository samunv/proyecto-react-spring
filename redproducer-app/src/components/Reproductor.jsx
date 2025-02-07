import React, { useRef, useState, useEffect } from "react";
import "../css/Reproductor.css";
import ModalLyrics from "./ModalLyrics";

const Reproductor = ({
  videoSrc,
  imagenSrc,
  titulo,
  artista,
  letra,
  delay = 0,
}) => {
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [tiempoActual, setTiempoActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [lineaActual, setLineaActual] = useState(0);
  const [inicioLetra, setInicioLetra] = useState(false);
  const [volume, setVolume] = useState(1); // 1 equivale al 100% de volumen

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setReproduciendo(false);

      const delayTimeout = setTimeout(() => {
        setInicioLetra(true);
      }, delay * 1000);

      return () => clearTimeout(delayTimeout);
    }
  }, [videoSrc, delay]);

  useEffect(() => {
    const audio = audioRef.current;

    const actualizarProgreso = () => {
      if (!audio || isNaN(audio.duration) || audio.duration === 0) return;

      const tiempo = audio.currentTime;
      setTiempoActual(tiempo);
      setProgreso((tiempo / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", actualizarProgreso);
    return () => {
      audio.removeEventListener("timeupdate", actualizarProgreso);
    };
  }, []);

  // Actualizamos el volumen del elemento cada vez que cambie el estado "volume"
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
      audio.play().catch((error) => console.log("Error al reproducir:", error));
    }
    setReproduciendo(!reproduciendo);
  };

  return (
    <div className="reproductor">
      {/* Portada */}
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
            const nuevoTiempo =
              (audioRef.current?.duration * e.target.value) / 100;
            if (!isNaN(nuevoTiempo) && audioRef.current) {
              audioRef.current.currentTime = nuevoTiempo;
              setProgreso(e.target.value);
            }
          }}
          className="barra-progreso"
        />
      </div>

      {/* Tiempo actual */}
      <p className="tiempo">{formatearTiempo(tiempoActual)}</p>

      {/* Barra de sonido para ajustar el volumen */}
      <div className="contenedor-volumen">
        <label htmlFor="volumen">Volumen:</label>
        <input
          id="volumen"
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => {
            const nuevoVolumen = e.target.value / 100;
            setVolume(nuevoVolumen);
          }}
          className="barra-volumen"
        />
      </div>

      <div className="iconos-controlador">
        <button
          className="boton-volumen"
          onClick={() => setModalAbierto(true)}
        >
          <img
            src="./../img/volumen.png"
            alt="Volumen"
            className="icono-letra"
          />
        </button>
        {/* Botón de reproducción */}
        <button
          className="boton-reproducir"
          id="boton-reproductor"
          onClick={alternarReproduccion}
        >
          <img
            src={
              reproduciendo
                ? "./../img/pause_negro.png"
                : "./../img/play_negro.png"
            }
            alt={reproduciendo ? "Pausar" : "Reproducir"}
          />
        </button>

        {/* Elemento de audio oculto (usado para reproducir la canción) */}
        <video ref={audioRef} src={videoSrc} style={{ display: "none" }} />

        {/* Botón para abrir el modal de letras */}
        <button
          className="boton-lyrics"
          onClick={() => setModalAbierto(true)}
        >
          <img
            src="./../img/notes_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png"
            alt="Letras"
            className="icono-letra"
          />
        </button>
      </div>

      {/* Modal con letras */}
      {modalAbierto && (
        <ModalLyrics
          letra={letra}
          titulo={titulo}
          artista={artista}
          onClose={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
};

export default Reproductor;
