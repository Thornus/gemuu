/* eslint-disable */
import React, { Component } from 'react';

class Input extends Component {

	render() {
		return (
			<div className="input-field">
				<span>{this.props.text}</span>
				<input type={this.props.type}
					name={this.props.name}
					placeholder={this.props.placeholder}
					value={this.props.value}
					required={this.props.required}
					pattern={this.props.pattern}
					title={this.props.title}
					onChange={(e) => this.props.onChangeValue(this.props.validations, e)}
					onFocus={this.props.onFocus}
					className={this.props.className}/>
			</div>
		);
	}

}

export default Input;
