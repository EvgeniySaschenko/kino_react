import MovieControl from '../_proto/MovieControl/MovieControl.jsx';
import { connect } from 'react-redux';
import axios from 'axios';

class MovieControlEdit extends MovieControl{
	constructor(props){
		super(props);
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
			// Исходное состояние
			initMovie: (id)=>{
				axios.get(window.srcData + 'ctr/index.php?ctr=genre&action=GET_GENRE_ALL')
				.then((res)=>{
					let genre= res.data;
					axios.get(window.srcData + 'ctr/index.php?ctr=movie&action=GET_MOVIE&id=' + id)
					.then((res)=>{
						dispatch({
							type: 'INIT_MOVIE_EDIT',
							genre: genre,
							movie: res.data,
							titlePage: 'Редактировать фильм',
							clsMod: 'Edit' 
						})
					})
					.catch( (err) => console.log( err ) )
				})
				.catch( (err) => console.log( err ) )
			},
			
			// Добавить / убрать жанр
			toggleGenre: (num)=>{
				dispatch({
					type: 'TOGGLE_GENRE_MOVIE',
					num: num
				})
			},

			// Валидация поля
			noValidMessage: () =>{
				dispatch({
					type: 'VALID_FORM_MOVIE',
					status: true
				})
			},

			// Редактировать в фильм в БД
			sendMovie: (formData, id) => {
				axios({
					method: 'post',
					url: window.srcData + 'ctr/index.php?ctr=movie&action=EDIT_MOVIE&id=' + id,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					data: formData
				})
				.then((res)=>{
					dispatch({
						type: 'VALID_FORM_MOVIE',
						status: false
					})
					if(res){
						dispatch({
							type: 'EDIT_MOVIE'
						})
					}

				})
				.catch( (err) => console.log( err ) )
			}

		}
	}
)(MovieControlEdit);