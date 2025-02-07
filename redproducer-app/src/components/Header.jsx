import "../css/Header.css"

function Header(){
	return(
		<header className="header">
			<a href="/">
				<img src="/img/logo-app2.png" alt="" className="icono-app"/>
			</a>
			<nav className="nav">
				<ul>
					<li><a href="/"><img src="/img/home_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="" /> Inicio</a></li>
					<li><a href="/panel"><img src="/img/dock_to_right_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="" /> Panel</a></li>
					<li><a href="/perfil"><img src="/img/account_circle_250dp_B3B3B3_FILL0_wght400_GRAD0_opsz48.png" alt="" /> Perfil</a></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;