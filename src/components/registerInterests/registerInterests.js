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
			let interests = await axios.get(`${config.development.backendUrl}/interests`);
			this.setState({interests});
		} catch(err) {
			// 'delete line';
		}
	}

	render() {
		const minghuoCard = { name: 'Dota2', imgPath: '/images/interests/dota2-interest-bg.jpg', followers: '1.54 million followers' };
		let interests = [minghuoCard, minghuoCard, minghuoCard, minghuoCard, minghuoCard, minghuoCard];
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
