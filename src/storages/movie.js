let init= {
	titlePage: '',
	name: '',
	text: '',
	year: '',
	messageNoValid: false,
	add: false,
	genre: []
}

let movie= (store= init, action) =>{

	switch(action.type){
		case('INIT_MOVIE'):{
			return action.data;
		}

		case('INIT_MOVIE_ADD'):{
			store.titlePage= action.titlePage;
			store.genre= action.genre;
			store.clsMod= action.clsMod;
			store.messageNoValid= false;
			store.send= false;
			store.name= '';
			store.text= '';
			store.year= '';
			return Object.assign({}, store);
		}

		case('INIT_MOVIE_EDIT'):{
			let { movie, genre }= action;
			store.send= false;

			genre= genre.map( (e) => {
				e.status= movie.genre.indexOf(e.name) != -1 ? true  : false;
				return e;
			})
			store.titlePage= action.titlePage;
			store.genre= genre;
			store.id= movie.id;
			store.clsMod= action.clsMod;
			store.id_user= movie.id_user;
			store.name= movie.name;
			store.text= movie.text;
			store.year= movie.year;
			store.date_update= movie.date_update;
			return Object.assign({}, store);
		}
		

		case('TOGGLE_GENRE_MOVIE'):{
			store.genre[action.num].status= store.genre[action.num].status ? false : true;
			return Object.assign({}, store);
		}
		
		case('ADD_MOVIE'):{
			store.send= 'Фильм добавлен в каталог';
			return Object.assign({}, store);
		}

		case('EDIT_MOVIE'):{
			store.send= 'Фильм отредактирован';
			return Object.assign({}, store);
		}

		case('VALID_FORM_MOVIE'):{
			store.messageNoValid= action.status ? 'Проверьте правильность заполнения полей' : false;
			return Object.assign({}, store);
		}

		default:
			return store;
	}
}

export default movie;