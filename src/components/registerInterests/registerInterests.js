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

		this.goToNextPage = this.goToNextPage.bind(this);
		this.validateForm = this.validateForm.bind(this);
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
			// 'delete line';
		}
	}

	goToNextPage() {
		const data = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			phone: this.state.phone
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

	render() {
		if (this.state.isFormValid) {
			return <Redirect to='/register/privacy'/>;
		}

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

				<div className='button w25' onClick={this.goToNextPage}>Next</div>
			</div>
		);
	}

}

export default RegisterInterests;

RegisterInterests.propTypes = {
	match: PropTypes.string,
	saveData: PropTypes.func
};
