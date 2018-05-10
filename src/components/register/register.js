/* eslint-disable */
import React, {Component} from 'react';
import { Prompt } from 'react-router';
import { Route } from 'react-router-dom';
import PropsRoute from '../propsRoute/propsRoute';
import RegisterPersonalDetails from '../registerPersonalDetails/registerPersonalDetails';
import RegisterInterests from '../registerInterests/registerInterests';
import RegisterInfluencers from '../registerInfluencers/registerInfluencers';
import RegisterPrivacy from '../registerPrivacy/registerPrivacy';

class Register extends Component {

	constructor(props) {
		super(props);

		this.state = {};

		this.saveData = this.saveData.bind(this);
		this.couldLoseData = this.couldLoseData.bind(this);
	}

	saveData(data) {
		this.setState({...this.state, ...data});
	}

	couldLoseData(location) {
		return Object.getOwnPropertyNames(this.state).length > 0 && !location.pathname.includes('register')
	}

	render() {
		return (
			<div className='register page center-flex inner-block'>
				<form className='register-form w100'>
					<PropsRoute exact path={this.props.match.path} component={RegisterPersonalDetails} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/personal`} component={RegisterPersonalDetails} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/interests`} component={RegisterInterests} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/influencers`} component={RegisterInfluencers} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/privacy`} component={RegisterPrivacy} saveData={this.saveData}/>
				</form>
				<Prompt message={location => this.couldLoseData(location) ? "Are you sure you want to leave?" : true}/>
			</div>
		);
	}

}

export default Register;
