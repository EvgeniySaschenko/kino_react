import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieControlAdd from '../MovieControlAdd/MovieControlAdd.jsx';
import MovieControlEdit from '../MovieControlEdit/MovieControlEdit.jsx';
import MovieList from '../MovieList/MovieList.jsx';
import AuthForm from '../AuthForm/AuthForm.jsx';
import Movie from '../Movie/Movie.jsx';

class Main extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<main className="Main">
				<Switch>
					<Route exact path='/' component={ MovieList }/>
					<Route path='/page/:id' component={ MovieList }/>
					<Route path='/genre/:genre' component={ MovieList }/>
					<Route path='/movie/:id' component={ Movie }/>
					<Route path='/edit/:id' component={ MovieControlEdit }/>
					<Route path='/add' component={ MovieControlAdd }/>
					<Route path='/login' component={ AuthForm }/>
				</Switch>
			</main>
		)
	}
}

export default Main;