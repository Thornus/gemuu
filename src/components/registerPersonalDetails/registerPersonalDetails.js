/* eslint-disable */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { required, email, noSpecialChars, password, passwordMatch, phone } from '../../validations/validations';
import errorMessages from '../../validations/errorMessages';
import _ from 'lodash';
import Input from '../input/input';
import FieldError from '../fieldError/fieldError';

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
			formErrors: {
				username: 'required',
				firstName: 'required',
				lastName: 'required',
				email: 'required',
				password: 'required',
				passwordConfirm: 'required'
			},
			wrongDataClass: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.validateField = this.validateField.bind(this);
	}

	handleChange(validations, e) {
		const newState = {...this.state};
		newState[e.target.name] = e.target.value;

		if(validations) {
			_.assign(newState.formErrors, this.validateField(e.target.name, e.target.value, validations));
		}

		this.setState(newState);
	}

	handleFocus() {
		if(this.state.wrongDataClass) {
			this.setState({...this.state, wrongDataClass: ''});
		}
	}

	validateField(fieldName, value, validations) {
		let formErrors = this.state.formErrors;

		for(let validate of validations) {
			let	result = validate(value);

			if(result) {
				formErrors[fieldName] = result;
				break;
			} else {
				delete formErrors[fieldName];
			}
		}

		return formErrors;
	}

	goToNextPage() {
		const passwordsDontMatch = passwordMatch(this.state.password, this.state.passwordConfirm);

		if(passwordsDontMatch) {
			this.state.formErrors['password'] = passwordsDontMatch;
		}

		if(!_.isEmpty(this.state.formErrors) || passwordsDontMatch) {
			const callback = () => {
				const self = this;
				setTimeout(() => self.setState({wrongDataClass: 'red-outline'}), 840);
			}

			this.setState({wrongDataClass: 'shake red-outline'}, callback);
			console.log('wing');
			return;
		}

		const data = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			phone: this.state.phone
		};

		this.props.saveData(data);
	}

	render() {
		const nextPage = _.isEmpty(this.state.formErrors) && !passwordMatch(this.state.password, this.state.passwordConfirm)
						? '/register/interests' : this.props.match.path;

		return (
			<div className='personal-details-container w100'>

				<div className='personal-details-form inner-block'>
					<Input placeholder='Username' type='text' name='username'
						value={this.state.username} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required, noSpecialChars]}
						className={this.state.wrongDataClass} />
					<Input placeholder='First name' type='text' name='firstName'
						value={this.state.firstName} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required, noSpecialChars]}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Last name' type='text' name='lastName'
						value={this.state.lastName} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required, noSpecialChars]}
						className={this.state.wrongDataClass}/>
					<Input placeholder='E-mail' type='text' name='email'
						value={this.state.email} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required, email]}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Password' type='password' name='password'
						value={this.state.password} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required, password]}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Confirm password' type='password' name='passwordConfirm'
						value={this.state.passwordConfirm} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required]}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Phone (optional)' type='text' name='phone'
						value={this.state.phone} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						validations={[required, phone]}
						className={this.state.wrongDataClass}/>

					<Link to={nextPage} onClick={() => this.goToNextPage()}>
						<div className='button'>Next</div>
					</Link>
				</div>
				<div className='personal-details-errors inner-block'>
					<FieldError message={errorMessages[this.state.formErrors.username]}/>
					<FieldError message={errorMessages[this.state.formErrors.firstName]}/>
					<FieldError message={errorMessages[this.state.formErrors.lastName]}/>
					<FieldError message={errorMessages[this.state.formErrors.email]}/>
					<FieldError message={errorMessages[this.state.formErrors.password]}/>
					<FieldError/>
					<FieldError message={errorMessages[this.state.formErrors.phone]}/>
				</div>

			</div>
		);
	}

}

export default RegisterPersonalDetails;
