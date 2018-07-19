/* eslint-disable */
import React, { Component } from 'react';
import errorMessages from '../../validations/errorMessages';
import FieldError from '../fieldError/fieldError';

class Input extends Component {

	constructor(props) {
		super(props);

		let error = this.props.error;
		const shouldShowRequired = this.props.validations && this.props.validations.indexOf('required') > -1 && this.props.type !== 'checkbox';

		if(shouldShowRequired) {
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
			return {error: ''};
		}
	}

	render() {
		const wrongDataClass = this.state.error ? 'shake red-outline' : '';
		const fieldError = this.props.validations ?
							<FieldError message={errorMessages[this.state.error]}/> : '';

		let input;

		if (this.props.type === 'checkbox') {
			input = <label className="checkbox-label center-flex">
						<input type="checkbox" name={this.props.name} onChange={this.props.onCheck}/>
						<div className="checkbox-square-container">
							{this.props.text}
							<div className='checkbox-square'></div>
						</div>
						{fieldError}
					</label>
		} else {
			input = <div className='input-field center-flex'>
						<span>{this.props.text}</span>
						<input type={this.props.type}
							name={this.props.name}
							placeholder={this.props.placeholder}
							value={this.state.value}
							required={this.props.required}
							pattern={this.props.pattern}
							onChange={this.handleChange}
							onBlur={this.props.onBlur}
							onFocus={this.props.onFocus ? this.props.onFocus : null}
							className={`${this.props.className} ${wrongDataClass}`}/>
							{fieldError}
					</div>;
		}

		return (
			input
		);
	}

}

export default Input;
