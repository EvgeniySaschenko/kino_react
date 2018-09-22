import React from 'react';
import { Link } from 'react-router-dom';
let logo= require('./logo2.jpg');

class Logo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Link to="/" className="Logo">
				<img className="Logo__img" src={ logo } alt="logo"/>
			</Link>
		)
	}
}

export default Logo;