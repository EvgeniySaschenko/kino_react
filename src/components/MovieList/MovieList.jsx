import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Pagination from '../Pagination/Pagination.jsx';
import MovieSort from '../MovieSort/MovieSort.jsx';



class MovieList extends React.Component{
	constructor(props){
		super(props);
	}

	// shouldComponentUpdate(nextProps){
	// 	console.log( 1 )
	// 	if(nextProps.location.pathname != this.props.location.pathname && nextProps.location.pathname == '/'){
	// 		this.props.movieList(0);
	// 		return true;
	// 	} else {
	// 		return true;
	// 	}
	// }

	componentWillReceiveProps(nextProps){
		if(nextProps.location.pathname != this.props.location.pathname && nextProps.location.pathname == '/'){
			this.props.movieList(0);
		}
	}

	componentDidMount(){
		let page= location.pathname.split('/');
		let genreName= page[1] == 'genre' ? decodeURI(page[2]) : false;
		let pageNum= page[page.length - 2] == 'page' ? page[page.length - 1] - 1 : 0;
		genreName ? this.props.sortGenre(genreName, pageNum) : this.props.movieList(pageNum);
	}

	render(){
		let { movieList }= this.props.data;
		let templateMovie= movieList.map( ( e, i) =>{
			return(
				<div key={ i } className="MovieList__item col-md-6 col-lg-4 col-xl-3 text-center">
					<h4 className="MovieList__name">{ e.name }</h4>
					<div className="MovieList__box-img">
					<span className="MovieList__year">{ e.year }</span>
						<img className="MovieList__img" src={ `${window.srcData}img/${e.id}.jpg?${e.date_update}` } alt={ e.name } />
					</div>
					<Link to={ `/movie/${ e.id }` } className="MovieList__link-more">Подробние</Link>
				</div>
			)
		})

		return(
			<React.Fragment>
				<MovieSort />
				<div className="MovieList">
					<h1 className="text-center">Список фильмов</h1>
					<div className="row">
						{ templateMovie }
					</div>
				</div>
				<Pagination />
			</React.Fragment>
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

			movieList: (page)=>{
				axios.get(window.srcData + 'ctr/index.php?ctr=movie&action=GET_MOVIE_LIST&page=' + page)
				.then( (res)=>{
					dispatch({
						type: 'GET_MOVIE_LIST',
						data: res.data,
						page: page
					})
				} )
				.catch( (err) => console.log( err) )
			},

			sortGenre: (genreName, page) => {
				axios.get(window.srcData + 'ctr/index.php?ctr=movie&action=GET_MOVIE_LIST_GENRE&genre=' + genreName + '&page=' + page)
				.then((res)=>{
					dispatch({
						type: 'GENRE_SORT_MOVIE_LIST',
						genreName: genreName,
						movie: res.data
					})
				})
				.catch( (err) => console.log( err ) )
			},

		}
	}
)(MovieList);