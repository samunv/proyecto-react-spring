import "../css/Inicio.css";
import SeccionPrincipal from "./SeccionPrincipal";
import Reproductor from "./Reproductor";

function Inicio() {
  return (
    <section className="pagina-inicio">
      <SeccionPrincipal />
      <Reproductor
      videoSrc="./../audios/anuel-tu-no-lo-amas.mp4"
      imagenSrc="./../img/portada-anuelaa.jpg"
      titulo="Tu no lo amas"
      artista="Anuel AA"
      />
    </section>
  );
}

export default Inicio;
