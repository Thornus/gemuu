/* eslint-disable */
import React, { Component } from 'react';

class FieldError extends Component {

	render() {
		return (
			<div className="field-error">
				<span className="message">{this.props.message}</span>
			</div>
		);
	}

}

export default FieldError;
