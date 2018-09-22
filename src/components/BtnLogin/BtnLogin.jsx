import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class BtnLogin extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.initAuth(location.pathname);
	}

	exitAccount(){
		if( this.props.data.authForm.id == 'EXIT' ){
			this.props.exitAccount();
		}
	}

	render(){
		let { btnLogin, authForm }= this.props.data;

		return(
			<Link to={ authForm.id == 'EXIT' ? '/' : '/login' } 
						ref="btnLogin"
						className={ `BtnLogin btn btn-outline-warning btn-lg ${btnLogin.status ? 'active' : ''}` } 
						data-id={ authForm.id == 'EXIT' ? 'EXIT' : 'LOGIN' }
						onClick={ this.exitAccount.bind(this) }>
				{ authForm.id == 'EXIT' ? 'Выход' : 'Вход / Регистрация' }
			</Link>
		)
	}
}


export default connect(
	store => {
		return{
			data: store
		}
	},
	dispatch => {
		return{

			initAuth: (link) =>{
				axios.get(window.srcData + 'ctr/index.php?ctr=user&action=INIT')
				.then( (res) =>{
					dispatch({
						type: 'INIT_AUTH',
						data: res.data,
						link: link
					})
				})
				.catch( (err) => console.log(err) )
			},

			exitAccount: () =>{
				axios.get(window.srcData + 'ctr/index.php?ctr=user&action=EXIT')
				.then( (res)=>{
					dispatch({
						type: 'EXIT_FORM_AUTH'
					})
				})
				.catch( (err) => console.log( err ) )
			}

		}
	}
)(BtnLogin);