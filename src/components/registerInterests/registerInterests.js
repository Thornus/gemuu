/* eslint-disable */
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import numeral from 'numeral';
import config from '../../config';
import SearchBar from '../searchBar/searchBar';
import SelectableCard from '../selectableCard/selectableCard';

class RegisterInterests extends Component {

	constructor(props) {
		super(props);

		this.state = {
			interests: [],
			isFormValid: false
		};

		this.selectedInterests = [];

		this.goToNextPage = this.goToNextPage.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.pushSelectedCard = this.pushSelectedCard.bind(this);
	}

	async componentDidMount() {
		try {
			let res = await axios.get(`${config.development.backendUrl}/interests`);
			let interests = res.data.interests;

			for (let interest of interests) {
				if(interest.followers) {
					interest.followers = numeral(interest.followers).format('0.000 a').toUpperCase();
				}
			}

			this.setState({interests});
		} catch(err) {
			
		}
	}

	goToNextPage() {
		const data = {
			interests: this.selectedInterests
		};

		this.props.saveData(data);

		const isFormValid = this.validateForm();
		this.setState({isFormValid});
	}

	validateForm() {
		let isFormValid = true;

		_.each(this.inputs, (inputObject) => {
			for(let validate of inputObject.validations) {
				let	result = validate(this.state[inputObject.name]);

				if (result) {
					inputObject.error = result;
					isFormValid = false;
					break;
				}
			}
		});

		return isFormValid;
	}

	pushSelectedCard(interestName) {
		if(this.selectedInterests.indexOf(interestName) === -1) {
			this.selectedInterests = this.selectedInterests.concat(interestName);
		}
	}

	render() {
		if (this.state.isFormValid) {
			return <Redirect to='/register/privacy'/>;
		}

		const exampleInterest = { name: 'Dota2', imgPath: '/images/interests/dota2-interest-bg.jpg', followers: '1.54 million' };
		let interests = [exampleInterest, exampleInterest, exampleInterest, exampleInterest, exampleInterest, exampleInterest];

		let cards = [];
		let animDelay = 0.1;

		for (let i = 0; i < interests.length; i++) {
			cards.push(
				<SelectableCard name={interests[i].name} followers={interests[i].followers}
					imgPath={interests[i].imgPath} animDelay={animDelay} key={i}
					handleClick={this.pushSelectedCard}/>
			);
			animDelay += 0.2;
		}

		return (
			<div className='interests center-flex flex-column w100'>
				<SearchBar/>
				<div className='interest-cards-container center-flex w100'>
					{cards}
				</div>

				<div className='button w25' onClick={this.goToNextPage}>Next</div>
			</div>
		);
	}

}

export default RegisterInterests;

RegisterInterests.propTypes = {
	saveData: PropTypes.func
};
