import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Movie extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let id= location.pathname.split('/')[2];
		this.props.initMovie(id);
	}

	render(){
		let { movie, authForm }= this.props.data;
		let genre= Array.isArray(movie.genre) ? [] : movie.genre.split(',');
		let templeteGenre= genre.map( (e, i) => {
			return(
				<span className="Movie__genre-item badge badge-danger" key={ i }>
					{ e }
				</span>
			)
		})

		return(
			<div className="Movie">
				<h1 className="Movie__title">{ movie.name }</h1>
				<div className="row">

					<div className="col-md-6 col-lg-4">
						<div className="Movie__img-box">
							<img className="Movie__img" src={ `${window.srcData}img/${movie.id}.jpg?${movie.date_update}` } alt={ movie.name }/>
						</div>
					</div>

					<div className="col-md-6 col-lg-8">

						<Link className={ `Movie__link-edit ${ authForm.id_user == movie.id_user ? '' : 'd-none' }`} to={ '/edit/' + movie.id }> Редактировать </Link>
						<div className="Movie__genre Movie__item">
							<b> Жанр: </b>
							{ templeteGenre }
						</div>
						<div className="Movie__year Movie__item">
							<b> Год: </b>
							{ movie.year }
						</div>

						<div className="Movie__user Movie__item">
							<b> Добавил: </b>
							{ movie.user_name }
						</div>

						<div className="Movie__date-create Movie__item">
							<b> Дата добавления: </b>
							{ movie.date_create }
						</div>

						<p className="Movie__text Movie__item">
							{ movie.text }
						</p>
					</div>

				</div>

			</div>
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
			initMovie: (id) =>{
				axios.get(window.srcData + 'ctr/index.php?ctr=movie&action=GET_MOVIE&id=' + id)
				.then( (res)=> {
					dispatch({
						type: 'INIT_MOVIE',
						data: res.data
					})
				} )
				.catch( (err) => console.log(err) )
			}
		}
	}
)(Movie);