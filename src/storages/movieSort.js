let init= {
	genre: []
};

let movieSort= (store= init, action) => {
	switch(action.type){
		case('INIT_MOVIE_SORT'):{
			store.genre= action.data.map( (e, i) => {
				e.status= e.name == action.genreName ? true : false;
				return e;
			});
			return Object.assign({}, store);
		}

		case('GET_MOVIE_LIST'):{
			store.genre.map( (e, i) => {
				e.status= false;
				return e;
			});
			return Object.assign({}, store);
		}
		
		case('GENRE_SORT_MOVIE_LIST'):{
			store.genre= store.genre.map( (e, i) => {
				e.status= e.name == action.genreName ? true : false;
				return e;
			});
			return Object.assign({}, store);
		}
		default:
			return store;
	}
}

export default movieSort;