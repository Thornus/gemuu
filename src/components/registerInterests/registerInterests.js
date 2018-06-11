import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config';
import SearchBar from '../searchBar/searchBar';
import SelectableCard from '../selectableCard/selectableCard';

class RegisterInterests extends Component {

	constructor(props) {
		super(props);
		this.state = {
			interests: []
		};
	}

	async componentDidMount() {
		try {
			let res = await axios.get(`${config.development.backendUrl}/interests`);
			let interests = res.data.interests;
			this.setState({interests});
		} catch(err) {
			// 'delete line';
		}
	}

	render() {
		let interests = this.state.interests;
		let cards = [];
		let animDelay = 0.1;

		for (let i = 0; i < interests.length; i++) {
			cards.push(
				<SelectableCard name={interests[i].name} followers={interests[i].followers} imgPath={interests[i].imgPath} animDelay={animDelay} key={i}/>
			);
			animDelay += 0.2;
		}

		return (
			<div className='interests center-flex flex-column w100'>
				<SearchBar/>
				<div className='interest-cards-container center-flex w100'>
					{cards}
				</div>
			</div>
		);
	}

}

export default RegisterInterests;
