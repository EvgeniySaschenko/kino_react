import React from 'react';
let imgCoverInit= require('./cover.jpg');

class MovieControl extends React.Component{
	constructor(props){
		super(props);
	}

	// Исходные данные
	componentDidMount(){
		let id= location.pathname.split('/')[2];
		this.props.initMovie(id);
		let { imgCover }= this.refs;
		imgCover.src= imgCoverInit;
	}

	// При обнослении компонента 
	componentWillReceiveProps(nextProps){
		let { name, year, text, file, imgCover }= this.refs;
		let { movie }= this.props.data;

		// Если был добавлен фильм показать уведомление и очистить поля
		if( nextProps.data.movie.send && nextProps.data.movie.clsMod == 'Add' ){
			setTimeout( ()=>{
				name.value= movie.name;
				year.value= movie.year;
				text.value= movie.text;
				file.value= '';
				imgCover.src= imgCoverInit;
				this.props.initMovie();
			}, 2000 )
		}
		// Если это страница редактирования фильма
		if( nextProps.data.movie.clsMod == 'Edit' ){
				name.value= movie.name;
				year.value= movie.year;
				text.value= movie.text;
				if(file.value == ''){
					imgCover.src= `${window.srcData}img/${movie.id}.jpg?${movie.date_update}`;
				}
				if(this.props.data.movie.send){
					setTimeout( () =>{
						this.props.initMovie(movie.id);
					}, 1000)
				}
		}
	}

	// Добавить / убрать жанр
	toggleGenre(e){
		let num= e.target.getAttribute('data-num');
		this.props.toggleGenre(num);
	}

	// Превью обложки
	vievCover(){
		let { file, imgCover }= this.refs;
		let reader = new FileReader();
		reader.onloadend = () => {
			imgCover.src= reader.result
		}
		reader.readAsDataURL( file.files[0] );	
	}

	// Добавить фильм
	sendMovie(){
		let { name, year, text, file }= this.refs;
		let { movie, authForm } = this.props.data;
		let genre= movie.genre.map( e => e.status == true ? e.name : false );
		genre= genre.filter( e => e != false )

		if( name.value && Number.isInteger( Number(year.value) ) && year.value.length == 4 && text.value && file.files[0] || movie.id && genre.length > 0 ){
			let formData= new FormData();
			formData.append('img', file.files[0])
			formData.append('name', name.value)
			formData.append('year', year.value)
			formData.append('text', text.value)
			formData.append('id_user', authForm.id_user)
			formData.append('genre', `${ genre.join(',') }`)
			this.props.sendMovie( formData, movie.id );
		} else {
			this.props.noValidMessage();
		}
	}

	render(){
		let { movie, authForm } = this.props.data;
		let genre= Array.isArray(movie.genre) ? movie.genre : [];
		let templateGenre= genre.map( (e, i)=>{
			return(
				<div className="MovieControl__genre-list-item col-12 col-md-4 text-center" key={ i }>
					<span className={ e.status ? 'badge badge-danger' : 'badge badge-secondary' } onClick={ this.toggleGenre.bind(this) } data-num={ i }>{ e.name }</span>
				</div>
			)
		} )


		return(
			<div className={`MovieControl MovieControl${ movie.clsMod }`}>
				<h1 className="text-center">
					{ movie.titlePage }
				</h1>

				<div className={`alert alert-warning ${ authForm.id_user ? 'd-none' : '' }`} role="alert">
  				Чтобы <b>добавить</b> или <b>редактировать</b> фильм авторизуйтесь.<br/>
					Редактировать можно будет только свои фильмы.
				</div>

				 {/* Название */}
				<div className="form-group form-check">
					<label className="MovieControl__label form-check-label">
						<h4> Название <span className="font-weight-light"> <small> (обязательное поле)</small> </span></h4>
					</label>
					<input type="text" ref="name" className="form-control" placeholder="Название фильма" />
				</div>

				 {/* Год */}
				<div className="form-group form-check">
					<label className="MovieControl__label form-check-label">
						<h4> Год <span className="font-weight-light"> <small> (обязательное поле, 4 цыфры)</small> </span></h4>
					</label>
					<input type="text" maxLength="4" ref="year" className="form-control col-12 col-md-2" placeholder="YYYY" />
				</div>

				 {/* Описание */}
				<div className="form-group form-check">
					<label className="MovieControl__label form-check-label">
						<h4> Описание <span className="font-weight-light"> <small> (обязательное поле)</small> </span></h4>
					</label>
					<textarea rows="6" ref="text" className="form-control" placeholder="Описание фильма" />
				</div>

				 {/* Жанры */}
				<div className="form-group form-check">
					<label className="MovieControl__label form-check-label">
						<h4> Жанр <span className="font-weight-light"> <small> (нужно выбрать хотябы 1 жанр)</small> </span></h4>
					</label>
					<div className="MovieControl__genre-list row">
						{ templateGenre }
					</div>
				</div>

				 {/* Обложка */}
				<div className="form-group form-check">
					<div className="MovieControl__img-cover-box">
						<img ref="imgCover" className="MovieControl__img-cover" alt="cover"/>
					</div>
					<label className="MovieControl__label form-check-label" htmlFor="">
						<h4> Загрузить обложку <span className="font-weight-light"> <small> (обязательное поле, 1 файл) </small> </span></h4>
					</label>

					<div className="custom-file">
						<input ref="file" type="file" className="custom-file-input" id="file" onChange={ this.vievCover.bind(this) } />
						<label className="custom-file-label" htmlFor="file">Загрузить изображение</label>
					</div>
				</div>
				
				 {/* Уведомления */}
				 <div className={`alert alert-success ${ movie.send ? '' : 'd-none' }`} role="alert">
  				{ movie.send }
				</div>

				<div className={`alert alert-danger ${ movie.messageNoValid ? '' : 'd-none' }`} role="alert">
  				{ movie.messageNoValid }
				</div>

				 {/* Кнопка */}
				 <div className="justify-content-center d-flex">
						<button className={ `MovieControl__btn btn btn-primary btn-lg ${ authForm.id_user ? '' : 'd-none' }` } onClick={ this.sendMovie.bind(this) }>Отправить</button>
				 </div>

				<div className={`alert alert-warning ${ authForm.id_user ? 'd-none' : '' }`} role="alert">
  				Чтобы <b>добавить</b> или <b>редактировать</b> фильм авторизуйтесь.<br/>
					Редактировать можно будет только свои фильмы.
				</div>

			</div>
		)
	}
}

export default MovieControl;