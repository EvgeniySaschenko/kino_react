import { createStore, combineReducers } from 'redux';
import movie from './movie';
import movieList from './movieList';
import nav from './nav';
import btnLogin from './btnLogin';
import authForm from './authForm';
import pagination from './pagination';
import movieSort from './movieSort';



let redusers= combineReducers({
	movie: movie,
	movieList: movieList,
	nav: nav,
	btnLogin: btnLogin,
	authForm: authForm,
	pagination: pagination,
	movieSort: movieSort
})

let store= createStore(redusers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;