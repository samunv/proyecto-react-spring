import "../css/Inicio.css";
import SeccionPrincipal from "./SeccionPrincipal";
import Reproductor from "./Reproductor";

function Inicio() {
  return (
    <section className="pagina-inicio">
      <SeccionPrincipal />
      <Reproductor />
    </section>
  );
}

export default Inicio;
