import React from 'react';

class Footer extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let year= new Date().getFullYear();
		return(
			<footer className="Footer text-center">
				KINO - { year }
			</footer>
		)
	}
}

export default Footer;