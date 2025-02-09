import "../css/Cancion.css";
import BotonReproducir from "./BotonReproducir";

function Cancion({ titulo, portada, artista, seleccionarCancion }) {
  return (
    <div className="contenedor-cancion">
      <img src={portada} alt={titulo} className="portada-cancion" />
      <div className="texto-boton">
        <div className="texto-cancion">
          <h4>{titulo}</h4>
          <p>{artista}</p>
        </div>
        {/* Botón que cambia la canción en el reproductor */}
        <button className="boton-reproducir" onClick={seleccionarCancion}>
          <BotonReproducir />
        </button>
      </div>
    </div>
  );
}

export default Cancion;
