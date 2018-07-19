/* eslint-disable */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { required } from '../../validations/validations';
import Input from '../input/input';

class RegisterPrivacy extends Component {

	constructor(props) {
		super(props);
		this.state = {
			eula: '',
			tec: ''
		};

		this.inputs = {
			eula: {
				name: 'eula',
				validations: [required],
				error: ''
			},
			tec: {
				name: 'tec',
				validations: [required],
				error: ''
			}
		};

		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.register = this.register.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	register() {
		const data = {
			eula: this.state.eula,
			tec: this.state.tec
		};

		this.props.saveData(data);

		if (this.validateForm()) {
			this.props.submit();
		}
	}

	handleCheckbox(e) {
		let newState = {};

		if (e.target.checked) {
			newState[e.target.name] = 'checked';
			this.inputs[e.target.name].error = '';
		} else {
			newState[e.target.name] = '';
			this.inputs[e.target.name].error = 'required';
		}

		this.setState(newState);
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

		// ******* WARNING: THIS validateForm FUNCTION WOULD BREAK IF THE FOLLOWING BLOCK WERE UNCOMMENTD *******
		// if (!this.inputs['password'].error) {
		// 	this.inputs['password'].error = passwordMatch(this.state.password, this.state.passwordConfirm);
		// 	if (this.inputs['password'].error) {
		// 		isFormValid = false;
		// 	}
		// }

		return isFormValid;
	}

	render() {
		const nextPage = this.state.isFormValid ? '' : this.props.match.path;

		return (
			<div className='privacy w100'>
				<h1>We value your privacy</h1>

				<div className='inputs-container'>
					<Input type='checkbox' name='eula' text='I have read and agreed to the EULA'
						validations={this.inputs['eula'].validations} error={this.inputs['eula'].error}
						onCheck={this.handleCheckbox}/>
					<Input type='checkbox' name='tec' text='I have read and agreed to the Terms & Conditions'
						validations={this.inputs['tec'].validations} error={this.inputs['tec'].error}
						onCheck={this.handleCheckbox}/>

					<Link to={nextPage} onClick={this.register}>
						<div className='button w25'>Register</div>
					</Link>
				</div>
			</div>
		);
	}

}

export default RegisterPrivacy;
