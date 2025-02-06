import "../css/SeccionPrincipal.css";
import Cancion from "./Cancion";
import canciones from "../data/canciones.json";

function SeccionPrincipal({ seleccionarCancion }) {
  return (
    <div className="contenedor-principal">
      <div className="caja-buscador">
        <input type="text" className="buscador" placeholder="Buscar Canción..." />
        <button className="boton-buscador">
          <img src="./../img/lupa.png" alt="Buscar" />
        </button>
      </div>
      <div className="contenedor-canciones">
        {canciones.map((cancion, i) => (
          <Cancion
            key={i}
            titulo={cancion.titulo}
            portada={cancion.portada}
            artista={cancion.artista}
            seleccionarCancion={() => seleccionarCancion(cancion)} // Se pasa la función
          />
        ))}
      </div>
    </div>
  );
}

export default SeccionPrincipal;
