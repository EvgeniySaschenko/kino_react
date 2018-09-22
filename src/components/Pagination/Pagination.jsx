import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Pagination extends React.Component{
	constructor(props){
		super(props);
	}

	movieList(e){
		let page= e.target.getAttribute('data-page');
		this.props.movieList(page);
	}


	render(){
		let { movieList, pagination }= this.props.data;
		let templatePagination= [];
		let count_movie= movieList[0] ? movieList[0].count_movie : 0;
		for( let i= 0; i <= count_movie; i= i+12){
			let page= Math.ceil( (i + 12) / 12 );
			templatePagination.push(
				<li className={ `Pagination__item page-item ${ parseInt(pagination) + 1 == page ? 'active' : '' }`} key={ i }>
					<Link onClick={ this.movieList.bind(this) } 
								to={ '/page/' + page } 
								className="Pagination__link page-link"
								data-page={ page - 1 }>
								{ page }
					</Link>
				</li>
			)
		}

		return(
			<ul className={ `Pagination pagination ${ count_movie ? '' : 'd-none' }` }>
				{ templatePagination }
			</ul>
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
			}
		}
	}
)(Pagination);