import React from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Main from './Main/Main.jsx';


class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="App">
				<Header />
				<Main />
				<Footer />
			</div>
		)
	}
}

export default App;