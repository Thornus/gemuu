/* eslint-disable */
import React, {Component} from 'react';
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
	}

	saveData(data) {
		this.setState({...this.state, ...data});
	}

	render() {
		return (
			<div className='register page'>
				<form className='register-form form-container'>
					<PropsRoute exact path={this.props.match.path} component={RegisterPersonalDetails} saveData={this.saveData}/>
					<PropsRoute path={`${this.props.match.path}/personal`} component={RegisterPersonalDetails} />
					<PropsRoute path={`${this.props.match.path}/interests`} component={RegisterInterests} />
					<PropsRoute path={`${this.props.match.path}/influencers`} component={RegisterInfluencers} />
					<PropsRoute path={`${this.props.match.path}/privacy`} component={RegisterPrivacy} />
				</form>
			</div>
		);
	}

}

export default Register;
