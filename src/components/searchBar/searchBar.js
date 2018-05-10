import React, { Component } from 'react';
import Input from '../input/input';

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = {};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const newState = {...this.state};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
		// MAKE REQUEST TO GET INTERESTS
	}

	render() {
		return (
			<div className="search-bar">
				<Input placeholder="Find what you're looking for..." type='text' name='search'
					value={this.state.searchText} onChangeValue={this.handleChange}/>
			</div>
		);
	}

}

export default SearchBar;
