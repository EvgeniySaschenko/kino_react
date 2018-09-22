let nav= (store= [], action) => {
	switch(action.type){
		case('INIT_NAV'): {
			store= action.data.map( (e) => {
				e.status= e.link == action.link ? true : false;
				return e;
			})
			return store;
		}
		case('ACTIVE_NAV_ITEM'): {
			store= store.map( (e)=>{
				e.status= e.id == action.id ? true : false;
				return e;
			} )

			return store;
		}
		default:
			return store;
	}
}

export default nav;