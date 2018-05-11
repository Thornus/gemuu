/* eslint-disable */
import React, { Component } from 'react';

class FieldError extends Component {

	render() {
		let isRequired = this.props.message === 'The field can\'t be empty';
		let showRequired =  isRequired && this.props.isDirty;

		let errorMessage = (!isRequired || showRequired) && <span className="message">{this.props.message}</span>;
		
		return (
			<div className="field-error">
				{errorMessage}
			</div>
		);
	}

}

export default FieldError;
