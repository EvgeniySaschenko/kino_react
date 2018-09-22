import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class MovieSort extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let url= location.pathname.split('/');
		let genreName= url[1] == 'genre' ? decodeURI(url[2]) : false;
		this.props.init(genreName);
	}

	sortGenre(e){
		let page= location.pathname.split('/');
		let genreName= e.target.getAttribute('data-name');
		let pageNum= page[page.length - 2] == 'page' ? page[page.length - 1] - 1 : 0;

		this.props.sortGenre(genreName, pageNum);
	}

	render(){
		let { movieSort } = this.props.data;
		let templateGenre= movieSort.genre.map( (e, i)=>{
			return(
				<div className="MovieSort__genre-list-item col-12 col-md-3 text-center" key={ i }>
					<Link to={`/genre/${ e.name }`}  onClick={ this.sortGenre.bind(this) } className={ e.status ? 'badge badge-danger' : 'badge badge-secondary'} data-id={ e.id } data-name={ e.name }>{ e.name }</Link>
				</div>
			)
		});
		return(
			<div className="MovieSort">
				<div className="MovieSort__name">
					Сортировать по жанру:
				</div>
				
				<div className="MovieSort__genre-list row">
					{ templateGenre }
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
			init: (genreName) => {
				axios.get(window.srcData + 'ctr/index.php?ctr=genre&action=GET_GENRE_ALL')
				.then((res)=>{
					dispatch({
						type: 'INIT_MOVIE_SORT',
						genreName: genreName,
						data: res.data
					});
				})
				.catch( (err) => console.log( err ) )
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
)(MovieSort);