import "../css/Header.css"

function Header(){
	return(
		<header className="header">
			<a href="/" className="icono-app">
				<img src="/img/logo-app2.png" alt="" />
			</a>
			<nav className="nav">
				<ul>
					<li><a href="/"><img src="/img/home_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="" /><p className="no-p-movil"> Inicio</p></a></li>
					<li><a href="/panel"><img src="/img/dock_to_right_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="" /><p className="no-p-movil">Panel</p></a></li>
					<li><a href="/perfil"><img src="/img/account_circle_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="" /><p className="no-p-movil">Perfil</p></a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;