import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Input from '../input/input';

class NotFound extends Component {

	render() {
		return (
			<div className='not-found page center-flex flex-column'>
				<div className='not-found-text'>404</div>
				<Link to='/'><Input type='submit' value="Go home, you're drunk"/></Link>
			</div>
		);
	}

}

export default NotFound;
