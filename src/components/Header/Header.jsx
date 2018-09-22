import React from 'react';
import Logo from '../Logo/Logo.jsx';
import Nav from '../Nav/Nav.jsx';


class Header extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<header className="Header">
				<div className="row">
					<div className="Header__col col-lg-4 d-flex justify-content-center">
						<Logo />
					</div>
					<div className="Header__col col-lg-8 d-flex justify-content-center align-items-center flex-wrap">
						<Nav />
					</div>
				</div>
				
			</header>
		)
	}
}

export default Header;