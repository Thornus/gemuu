/* eslint-disable */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Input from '../input/input';
import axios from 'axios';
import config from '../../config';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			wrongDataClass: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const newState = {};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	handleFocus() {
		if(this.state.wrongDataClass) {
			this.setState({wrongDataClass: ''});
		}
	}

	async handleSubmit(e) {
		e.preventDefault();

		const data = {
			username: this.state.username,
			password: this.state.password
		};

		try {
			await axios.post(`${config.development.backendUrl}/login`, data);
		} catch(err) {
			const callback = () => {
				const self = this;
                setTimeout(() => self.setState({wrongDataClass: 'red-outline'}), 840);
			}

			this.setState({wrongDataClass: 'shake red-outline'}, callback);
		}
	}

	render() {
		// if (this.props.loggedIn) {
		// 	this.goToUserPage.bind(this)();
		// }

		//const message = this.props.message ? this.props.message : null;
		return (
			<div className='login page center-flex flex-column w25'>
				<form className='login-form w100'>
					<Input placeholder='Username' type='text' name='username'
						value={this.state.username} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Password' type='password' name='password'
						value={this.state.password} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						className={this.state.wrongDataClass}/>
					<div className='button' onClick={this.handleSubmit}>Login</div>
					<Link to='/register/personal'>
						<div className='button'>Register</div>
					</Link>
				</form>
			</div>
		);
	}

}

export default Login;
