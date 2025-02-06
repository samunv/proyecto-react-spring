import "../css/Header.css"
function Header(){
	return(
		<header className="header">
			<a href="/">
				<img src="/img/logo-app.png" alt="" className="icono-app"/>
			</a>
			<nav className="nav">
				<ul>
					<li>Inicio</li>
					<li>Panel</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;