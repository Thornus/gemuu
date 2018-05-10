import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logo extends Component {

	render() {
		return (
			<Link to='/'>
				<img className='logo' src='/logo.png'/>
			</Link>
		);
	}

}

export default Logo;
