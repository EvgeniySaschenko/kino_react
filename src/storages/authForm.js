const init= {
	id: 'LOGIN',
	msg: '',
	name: '',
	mail: '',
	id_user: ''
}


let authForm= ( store= init, action ) => {
	switch( action.type ){
		case( 'INIT_AUTH' ):{
			if(action.data){
				store.id= 'EXIT';
				store.msg= '';
				store.name= action.data.name;
				store.mail= action.data.mail;
				store.id_user= action.data.id;
			}
			return Object.assign({}, store);
		}

		case( 'ITEM_ACTIVE_FORM_AUTH' ):{
			store.id= action.id;
			return Object.assign({}, store);
		}

		case( 'MSG_ERR_FORM_AUTH' ):{
			store.msg= 'Все поля должны быть заполнены. Проверьте правильность заполнения полей';
			return Object.assign({}, store);
		}

		case( 'CHECK_IN_FORM_AUTH' ):{
			if( action.data.id ){
				store.id= 'EXIT';
				store.msg= `Вы зарегистрированы как ${ action.data.name }, на e-mail ${ action.data.mail } будет отправлено письмо`;
				store.name= action.data.name;
				store.mail= action.data.mail;
				store.id_user= action.data.id;
			} else {
				store.msg= action.data;
			}
			return Object.assign({}, store);
		}

		case( 'LOGIN_FORM_AUTH' ):{
			if( action.data.id ){
				store.id= 'EXIT';
				store.msg= `Вы вошли на сайт как ${ action.data.name }`;
				store.name= action.data.name;
				store.mail= action.data.mail;
				store.id_user= action.data.id;
			} else {
				store.msg= action.data;
			}
			return Object.assign({}, store);
		}

		case( 'EXIT_FORM_AUTH' ):{
			return {
				id: 'LOGIN',
				msg: '',
				name: '',
				mail: '',
				id_user: ''
			};
		}

		default:
			return store;
	}
}

export default authForm;