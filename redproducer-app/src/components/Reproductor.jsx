import React, { useRef, useState, useEffect } from "react";
import "../css/Reproductor.css";
import ModalLyrics from "./ModalLyrics";

// Componente ModalVolumen para ajustar el volumen en una ventana
const ModalVolumen = ({ volume, setVolume, onClose }) => {
	return (
		<div className="modal-volumen-overlay">
			<div className="modal-volumen-content">
				<input
					type="range"
					min="0"
					max="100"
					value={volume * 100}
					onChange={(e) => setVolume(e.target.value / 100)}
					className="barra-volumen"
				/>
				<button className="modal-volumen-cerrar" onClick={onClose}>
					✖
				</button>
			</div>
		</div>
	);
};

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
	const [modalVolumenAbierto, setModalVolumenAbierto] = useState(false);
	const [lineaActual, setLineaActual] = useState(0);
	const [inicioLetra, setInicioLetra] = useState(false);
	const [volume, setVolume] = useState(1); // 1 equivale al 100% de volumen

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();

			// Reproducir la canción automáticamente tras pulsar en el botón de play del Componente Canción
			audioRef.current
				.play()
				.then(() => setReproduciendo(true))
				.catch((error) => console.log("Error al reproducir:", error));

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
			<div
				className="fondo-borroso"
				style={{ backgroundImage: `url(${imagenSrc})` }}
			></div>
			{/* Portada */}
			<div className="portada">
				{imagenSrc ? (
					<img src={imagenSrc} alt="Portada" className="imagen-portada" />
				) : (
					<div className="portada-placeholder">Sin portada</div>
				)}
			</div>

			{/* Información de la canción */}
			<h2 className="titulo">{titulo || "Título desconocido"}</h2>
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

			<div className="iconos-controlador">
				{/* Botón de volumen: abre el modal de volumen */}
				<button
					className="boton-volumen"
					onClick={() => setModalVolumenAbierto(true)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#FFFFFF"
					>
						<path d="M760-481q0-83-44-151.5T598-735q-15-7-22-21.5t-2-29.5q6-16 21.5-23t31.5 0q97 43 155 131.5T840-481q0 108-58 196.5T627-153q-16 7-31.5 0T574-176q-5-15 2-29.5t22-21.5q74-34 118-102.5T760-481ZM280-360H160q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120l132-132q19-19 43.5-8.5T480-703v446q0 27-24.5 37.5T412-228L280-360Zm380-120q0 42-19 79.5T591-339q-10 6-20.5.5T560-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
					</svg>
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
								? "./../img/pause_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
								: "./../img/play_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
						}
						title={reproduciendo ? "Pausar" : "Reproducir"}
					/>
				</button>

				{/* Elemento de audio oculto (usado para reproducir la canción) */}
				<video ref={audioRef} src={videoSrc} style={{ display: "none" }} />

				{/* Botón para abrir el modal de letras */}
				<button className="boton-lyrics" onClick={() => setModalAbierto(true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#FFFFFF"
						className="icono-letras"
					>
						<path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h400q17 0 28.5 11.5T600-280q0 17-11.5 28.5T560-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
					</svg>
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

			{/* Modal para ajustar el volumen */}
			{modalVolumenAbierto && (
				<ModalVolumen
					className="modal-volumen"
					volume={volume}
					setVolume={setVolume}
					onClose={() => setModalVolumenAbierto(false)}
				/>
			)}
		</div>
	);
};

export default Reproductor;
