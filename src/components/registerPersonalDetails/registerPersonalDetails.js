/* eslint-disable */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { required, email, noSpecialChars, password, passwordMatch, phone } from '../../validations/validations';
import _ from 'lodash';
import Input from '../input/input';

class RegisterPersonalDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			phone: '',
			isFormValid: false
		};

		this.inputs = {
			username: {
				name: 'username',
				validations: [noSpecialChars, required],
				error: ''
			},
			firstName: {
				name: 'firstName',
				validations: [required, noSpecialChars],
				error: ''
			},
			lastName: {
				name: 'lastName',
				validations: [required, noSpecialChars],
				error: ''
			},
			email: {
				name: 'email',
				validations: [required, email],
				error: ''
			},
			password: {
				name: 'password',
				validations: [required, password],
				error: ''
			},
			passwordConfirm: {
				name: 'password',
				validations: [required],
				error: ''
			},
			phone: {
				name: 'phone',
				validations: [phone],
				error: ''
			}
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.goToNextPage = this.goToNextPage.bind(this);
		this.validateForm = this.validateForm.bind(this);
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

				if(result) {
					inputObject.error = result;
					isFormValid = false;
					break;
				}
			}
		});

		if (!this.inputs['password'].error) {
			this.inputs['password'].error = passwordMatch(this.state.password, this.state.passwordConfirm);
			if (this.inputs['password'].error) {
				isFormValid = false;
			}
		}

		return isFormValid;
    }

	handleBlur(e) {
		let newState = {};

		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	handleFocus(e) {
		this.inputs[e.target.name].error = '';
	}

	render() {
		const nextPage = this.state.isFormValid ? '/register/interests' : this.props.match.path;

		return (
			<div className='personal-details-container w100'>

				<div className='personal-details-form w50'>
					<Input placeholder='Username' type='text' name='username'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['username'].validations} error={this.inputs['username'].error}/>
					<Input placeholder='First name' type='text' name='firstName'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['firstName'].validations} error={this.inputs['firstName'].error}/>
					<Input placeholder='Last name' type='text' name='lastName'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['lastName'].validations} error={this.inputs['lastName'].error}/>
					<Input placeholder='E-mail' type='text' name='email'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['email'].validations} error={this.inputs['email'].error}/>
					<Input placeholder='Password' type='password' name='password'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['password'].validations} error={this.inputs['password'].error}/>
					<Input placeholder='Confirm password' type='password' name='passwordConfirm'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['passwordConfirm'].validations} error={this.inputs['passwordConfirm'].error}/>
					<Input placeholder='Phone (optional)' type='text' name='phone'
						onBlur={this.handleBlur} onFocus={this.handleFocus}
						validations={this.inputs['phone'].validations} error={this.inputs['phone'].error}/>

					<Link to={nextPage} onClick={this.goToNextPage}>
						<div className='button w50'>Next</div>
					</Link>
				</div>

			</div>
		);
	}

}

export default RegisterPersonalDetails;
