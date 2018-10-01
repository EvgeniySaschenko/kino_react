import MovieControl from '../_proto/MovieControl/MovieControl.jsx';
import { connect } from 'react-redux';
import axios from 'axios';


class MovieControlAdd extends MovieControl{
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
			initMovie: ()=>{
				axios.get(window.srcData + 'ctr/index.php?ctr=genre&action=GET_GENRE_ALL')
				.then((res)=>{
					dispatch({
						type: 'INIT_MOVIE_ADD',
						genre: res.data,
						titlePage: 'Добавить фильм',
						clsMod: 'Add' 
					})
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

			// Добавить в фильм в БД
			sendMovie: (formData) => {
				axios({
					method: 'post',
					url: window.srcData + 'ctr/index.php?ctr=movie&action=ADD_MOVIE',
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
							type: 'ADD_MOVIE'
						})
					}

				})
				.catch( (err) => console.log( err ) )
			}

		}
	}
)(MovieControlAdd);