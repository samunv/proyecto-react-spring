import "../css/Cancion.css";
import BotonReproducir from "./BotonReproducir";

function Cancion(props) {
  return (
	<div className="contenedor-cancion">
	  <img src={`./../img/${props.portada}`} alt="" className="portada" />
	  <div className="texto-boton">
		<div className="texto">
		  <strong>{props.titulo}</strong>
		  <p>{props.artista}</p>
		</div>
		<BotonReproducir cancion={props.cancion}/>
	  </div>
	</div>
  );
}

export default Cancion;
