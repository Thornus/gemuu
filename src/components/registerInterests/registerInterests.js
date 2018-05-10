import React, {Component} from 'react';
import SearchBar from '../searchBar/searchBar';

class RegisterInterests extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className='interests center-flex w100'>
				<SearchBar/>
			</div>
		);
	}

}

export default RegisterInterests;
