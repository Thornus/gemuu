/* eslint-disable */
import React, {Component} from 'react';
import { Prompt } from 'react-router';
import { Route } from 'react-router-dom';
import PropsRoute from '../propsRoute/propsRoute';
import RegisterPersonalDetails from '../registerPersonalDetails/registerPersonalDetails';
import RegisterInterests from '../registerInterests/registerInterests';
import RegisterInfluencers from '../registerInfluencers/registerInfluencers';
import RegisterPrivacy from '../registerPrivacy/registerPrivacy';
import axios from 'axios';
import config from '../../config';

class Register extends Component {

	constructor(props) {
		super(props);

		this.state = {};

		this.saveData = this.saveData.bind(this);
		this.couldLoseData = this.couldLoseData.bind(this);
		this.submit = this.submit.bind(this);
	}

	saveData(data) {
		this.setState({...data});
	}

	async submit() {
		let res = await axios.post(`${config.development.backendUrl}/registration`, this.state);

		if(res.status === 200) {
			window.location = '/';
		}
	}

	couldLoseData(location) {
		return Object.getOwnPropertyNames(this.state).length > 0 && !location.pathname.includes('register')
	}

	render() {
		return (
			<div className='register page center-flex flex-column w100'>
				<form className='register-form center-flex w100'>
					<PropsRoute exact path={this.props.match.path} component={RegisterPersonalDetails} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/personal`} component={RegisterPersonalDetails} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/interests`} component={RegisterInterests} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/influencers`} component={RegisterInfluencers} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/privacy`} component={RegisterPrivacy} saveData={this.saveData} submit={this.submit}/>
				</form>
				<Prompt message={location => this.couldLoseData(location) ? "Are you sure you want to leave?" : true}/>
			</div>
		);
	}

}

export default Register;
