import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

let logo= require('./logo2.jpg');

class Logo extends React.Component{
	constructor(props){
		super(props);
	}

	home(){
		this.props.home();
	}

	render(){
		return(
			<Link to="/" className="Logo" onClick={ this.home.bind(this) }>
				<img className="Logo__img" src={ logo } alt="logo"/>
			</Link>
		)
	}
}





export default connect(
	store => {
		return{

		}
	},
	dispatch => {
		return{
			home: () => {
				dispatch({
					type: 'HOME_ACTIVE_NAV_ITEM',
					link: '/'
				})
			}
		}
	}
)(Logo);