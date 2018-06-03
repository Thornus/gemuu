/* eslint-disable */
import React, { Component } from 'react';

class FieldError extends Component {

	render() {
		let errorMessage = <span className="message">{this.props.message}</span>;

		return (
			<div className="field-error">
				{errorMessage}
			</div>
		);
	}

}

export default FieldError;
