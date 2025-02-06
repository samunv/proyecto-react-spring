import "../css/Inicio.css"

function SeccionPrincipal() {
  return (
    <div className="contenedor">
      <div className="caja-buscador">
        <input type="text" className="buscador" placeholder="Buscar Canción..." />
        <button className="boton-buscador">
          <img
            src="./../img/lupa.png"// Ruta desde la raíz del proyecto, sin necesidad de importar
            alt="Buscar"
          />
        </button>
      </div>
    </div>
  );
}

export default SeccionPrincipal;
