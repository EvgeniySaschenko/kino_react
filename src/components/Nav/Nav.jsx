import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BtnLogin from '../BtnLogin/BtnLogin.jsx';

class Nav extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.initNav(location.pathname);
	}

	activeItem(e){
		let id= e.target.getAttribute('data-id');
		this.props.activeItem(id);
	}

	render(){
		let { nav }= this.props.data;
		let templateNav= nav.map( (e, i) =>{
			return(
				<li className="Nav__item nav-item d-flex" key={ i }>
					<Link to={ e.link } 
								className={ `Nav__link btn btn-outline-primary btn-lg ${ e.status ? 'active' : '' }` }
								data-id={ e.id }>
					{ e.name }
					</Link>
				</li>
			)
		} );

		return(
			<ul className="Nav nav d-flex justify-content-center" onClick={ this.activeItem.bind(this) }>
				{ templateNav }
				<li className="Nav__item nav-item d-flex" key="btn-login">
					<BtnLogin />
				</li>
			</ul>
		)
	}
}

export default connect(
		store => {
			return{
				data : store
			}
		},
		dispatch => {
			return{
				initNav : (link)=>{
					axios.get(window.srcData + 'ctr/index.php?ctr=nav&action=GET_NAV_ALL')
					.then( (res)=>{
						dispatch({
							type: 'INIT_NAV',
							data: res.data,
							link: link
						})
					})
					.catch( (err) => console.log( err ) )
				},

				activeItem: (id) =>{
					dispatch({
						type: 'ACTIVE_NAV_ITEM',
						id: id
					})
				}
			}
		}
)(Nav);