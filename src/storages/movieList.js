let movieList= (store= [], action) =>{
	switch( action.type ){
		case('GET_MOVIE_LIST'):{
			return action.data;
		}

		case('GENRE_SORT_MOVIE_LIST'):{
			return action.movie;
		}
		
		default:
			return store;
	}
}

export default movieList;