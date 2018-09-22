import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AuthForm extends React.Component{
	constructor(props){
		super(props);
	}

	itemActive(e){
		let id= e.target.getAttribute('data-id');
		this.props.itemActive(id);
	}

	sendData(){
		let { name, mail, pass, btnSend }= this.refs;
		let {authForm }= this.props.data;

		if( mail.value.indexOf('@') + 1 && pass.value ){
			let formData= new FormData();
			formData.append('mail', mail.value);
			formData.append('pass', pass.value);

			if( authForm.id == 'LOGIN' ){
				// Вход
				this.props.sendData(formData, authForm.id);
			} else if( name.value ){
				// Регистрация
				formData.append('name', name.value);
				this.props.sendData(formData, authForm.id);

			}	else {
			// Ошибка
			this.props.msgErr();
			}

		} else {
			this.props.msgErr();
		}
	}

	render(){
		let { authForm }= this.props.data;

		return(
			<div className="AuthForm">

				<div className={`alert alert-success ${ authForm.id == 'EXIT' ? '' : 'd-none' }`} role="alert">
					{ authForm.msg }.
					<Link to="/"> перейти на главную </Link>
				</div>

				<div className={ `AuthForm__box-auth ${authForm.id == 'EXIT' ? 'd-none' : ''}` }>

						<ul className="AuthForm__tabs nav nav-tabs">
							<li className="AuthForm__tabs-item nav-item" key="1">
								<span onClick={ this.itemActive.bind(this) } data-id="LOGIN" className={ `nav-link ${authForm.id == 'LOGIN' ? 'active' : ''}` }>Вход</span>
							</li>
							<li className="AuthForm__tabs-item nav-item" key="2">
								<span onClick={ this.itemActive.bind(this) } data-id="CHECK_IN" className={ `nav-link ${authForm.id != 'LOGIN' ? 'active' : ''}` }>Регистрация</span>
							</li>
						</ul>
						<div className="row d-flex justify-content-center">
							<div className="col-lg-6">

								<h1 className="text-center">{ authForm.id == 'LOGIN' ? 'Войти на сайт' : 'Зарегистрироватся' }</h1>

								<div className="form-group">
									<input ref="name" type="text" className={ `form-control ${authForm.id == 'LOGIN' ? 'd-none' : ''}` } placeholder="Ваше имя"/>
								</div>
								<div className="form-group">
									<input ref="mail" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Ваш E-mail"/>
								</div>
								<div className="form-group">
									<input ref="pass" type="password" className="form-control" placeholder="Ваш пароль"/>
								</div>

								<div className={`alert alert-danger ${ authForm.msg ? '' : 'd-none' }`} role="alert">
									{ authForm.msg }
								</div>

								<div className="d-flex justify-content-center">
									<button ref="btnSend" className="btn btn-primary btn-lg" onClick={ this.sendData.bind(this) }>Отправить</button>
								</div>
								
							</div>
						</div>


				</div>
			</div>
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

			itemActive: (id) => {
				dispatch({
					type: 'ITEM_ACTIVE_FORM_AUTH',
					id: id
				})
			},

			sendData: (formData, id) => {
				axios({
					method: 'post',
					url: window.srcData + 'ctr/index.php?ctr=user&action=' + id,
					data: formData
				})
				.then((res)=>{
					dispatch({
						type: id + '_FORM_AUTH',
						data: res.data
					})
				})
				.catch( (err) => console.log( err ) )
			},

			msgErr: () => {
				dispatch({
					type: 'MSG_ERR_FORM_AUTH'
				})
			}
		}
	}
)(AuthForm);