import React, {Component} from 'react';
import axios from 'axios';
import config from '../../config';
import SearchBar from '../searchBar/searchBar';
import Card from '../card/card';

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
			const callback = () => {
				const self = this;
				setTimeout(() => self.setState({...this.state, wrongDataClass: 'red-outline'}), 840);
			};

			this.setState({...this.state, wrongDataClass: 'shake red-outline'}, callback);
		}
	}

	render() {
		const minghuoCard = { name: 'Dota2', description: 'Dota2 is one of the most famous MOBA games worldwide. Start playing and you\'ll never get your life back!' };
		let interests = [minghuoCard, minghuoCard, minghuoCard, minghuoCard, minghuoCard, minghuoCard];
		let cards = [];
		let animDelay = 0.1;

		for (let i = 0; i < interests.length; i++) {
			cards.push(<Card name={interests[i].name} description={interests[i].description} animDelay={animDelay} key={i}/>);
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
