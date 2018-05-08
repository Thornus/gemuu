/* eslint-disable */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
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
			phone: '',
			wrongDataClass: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleChange(e) {
		const newState = {...this.state};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	handleFocus() {
		if(this.state.wrongDataClass) {
			this.setState({...this.state, wrongDataClass: ''});
		}
	}

	render() {
		return (
			<div className='personal-details form-block'>
				<Input placeholder='Username' type='text' name='username'
					value={this.state.username} onChangeValue={this.handleChange} onFocus={this.handleFocus}
					className={this.state.wrongDataClass}/>
				<Input placeholder='First name' type='text' name='firstName'
					value={this.state.firstName} onChangeValue={this.handleChange} onFocus={this.handleFocus}
					className={this.state.wrongDataClass}/>
				<Input placeholder='Last name' type='text' name='lastName'
					value={this.state.lastName} onChangeValue={this.handleChange} onFocus={this.handleFocus}
					className={this.state.wrongDataClass}/>
				<Input placeholder='E-mail' type='text' name='email'
					value={this.state.email} onChangeValue={this.handleChange} onFocus={this.handleFocus}
					className={this.state.wrongDataClass}/>
				<Input placeholder='Password' type='password' name='password'
					value={this.state.password} onChangeValue={this.handleChange} onFocus={this.handleFocus}
					className={this.state.wrongDataClass}/>
				<Input placeholder='Phone (optional)' type='text' name='phone'
					value={this.state.phone} onChangeValue={this.handleChange} onFocus={this.handleFocus}
					className={this.state.wrongDataClass}/>

				<Link to='/register/interests' onClick={() => this.props.saveData(this.state)}><Input type='submit' value='Next'/></Link>
			</div>
		);
	}

}

export default RegisterPersonalDetails;
