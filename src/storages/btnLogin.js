let init= {
	text: '',
	status: ''
}

let btnLogin= (store= init, action) =>{
	switch(action.type){
		case('INIT_AUTH'):{
			store.status= action.link == '/login' ? true : false;
			return Object.assign({}, store);
		}

		case('ACTIVE_NAV_ITEM'):{
			store.status= action.id == 'LOGIN' ? true : false;
			return Object.assign({}, store);
		}

		default:
			return store;
	}
}

export default btnLogin;