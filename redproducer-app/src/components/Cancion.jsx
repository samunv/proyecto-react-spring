import "../css/Cancion.css";

function Cancion({ titulo, portada, artista, seleccionarCancion }) {
  return (
    <div className="contenedor-cancion">
      <img src={portada} alt={titulo} className="portada-cancion" />
      <div className="texto-boton">
        <div className="texto-cancion">
          <strong>{titulo}</strong>
          <p>{artista}</p>
        </div>
        {/* Botón que cambia la canción en el reproductor */}
        <button className="boton-reproducir" onClick={seleccionarCancion}>
          <img src="./../img/play-icon.png" alt="Reproducir" />
        </button>
      </div>
    </div>
  );
}

export default Cancion;
