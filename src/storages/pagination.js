let pagination= (store= 0, action) => {
	switch(action.type){
		case('GET_MOVIE_LIST'): {
			return action.page;
		}
		default:
			return store;
	}
}

export default pagination;