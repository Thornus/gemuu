/* eslint-disable */
import React, { Component } from 'react';
import errorMessages from '../../validations/errorMessages';
import FieldError from '../fieldError/fieldError';

class Input extends Component {

	constructor(props) {
		super(props);

		let error = this.props.error;

		if(this.props.validations && this.props.validations.indexOf('required') > -1) {
			 error = 'required';
		}

		this.state = {
			value: '',
			error,
			isInvalid: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.validateField = this.validateField.bind(this);
	}

	handleChange(e) {
		const newState = {};
		newState.value = e.target.value;

		if(this.props.validations) {
			newState.error = this.validateField(e.target.value, this.props.validations);
		}

		this.setState(newState);
	}

	validateField(value, validations) {
		let error = '';

		for(let validate of validations) {
			let	result = validate(value);

			if(result) {
				error = result;
				break;
			}
		}

		return error;
	}

	static getDerivedStateFromProps(nextProps, preState) {
		if(nextProps.error) {
			return {error: nextProps.error};
		} else {
			return null;
		}
	}

	render() {
		const wrongDataClass = this.state.error ? 'shake red-outline' : '';
		const fieldError = this.props.validations ?
							<FieldError message={errorMessages[this.state.error]}/> : '';

		return (
			<div className='input-field center-flex'>
				<span>{this.props.text}</span>
				<input type={this.props.type}
					name={this.props.name}
					placeholder={this.props.placeholder}
					value={this.state.value}
					required={this.props.required}
					pattern={this.props.pattern}
					onChange={this.handleChange}
					onBlur={this.props.onBlur}
					className={`${this.props.className} ${wrongDataClass}`}/>
					{fieldError}
			</div>
		);
	}

}

export default Input;
