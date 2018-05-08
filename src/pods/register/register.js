/* eslint-disable */
import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import RegisterPersonalDetails from '../registerPersonalDetails/registerPersonalDetails';
import RegisterInterests from '../registerInterests/registerInterests';
import RegisterInfluencers from '../registerInfluencers/registerInfluencers';
import RegisterPrivacy from '../registerPrivacy/registerPrivacy';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className='register page'>
				<form className='register-form form-container'>
					<Route exact path={this.props.match.path} component={RegisterPersonalDetails} />
					<Route path={`${this.props.match.path}/personal`} component={RegisterPersonalDetails} />
					<Route path={`${this.props.match.path}/interests`} component={RegisterInterests} />
					<Route path={`${this.props.match.path}/influencers`} component={RegisterInfluencers} />
					<Route path={`${this.props.match.path}/privacy`} component={RegisterPrivacy} />
				</form>
			</div>
		);
	}

}

export default Register;
