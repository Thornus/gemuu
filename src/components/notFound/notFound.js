import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {

	render() {
		return (
			<div className='not-found page center-flex flex-column'>
				<div className='not-found-text'>404</div>
				<Link to='/'>
					<div className='button'>Go home, you&#39;re drunk</div>
				</Link>
			</div>
		);
	}

}

export default NotFound;
