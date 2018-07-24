/* eslint-disable */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { required } from '../../validations/validations';
import Input from '../input/input';
import axios from 'axios';
import config from '../../config';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

		this.inputs = {
			username: {
				name: 'username',
				validations: [required],
				error: ''
			},
			password: {
				name: 'password',
				validations: [required],
				error: ''
			}
		};

		this.handleBlur = this.handleBlur.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleBlur(e) {
		let newState = {};

		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	handleFocus(e) {
		this.inputs[e.target.name].error = '';
	}

	async handleSubmit(e) {
		e.preventDefault();

		const data = {
			username: this.state.username,
			password: this.state.password
		};

		try {
			const res = await axios.post(`${config.development.backendUrl}/login`, data);

			if(res.data.token) {
				this.setState({message: 'Logged in! :D'});
			}
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

		// const message = this.state.message ? this.state.message : null;
		return (
			<div className='login page center-flex flex-column w25'>
				<form className='login-form w100'>
					<Input placeholder='Username' type='text' name='username'
						value={this.state.username} onBlur={this.handleBlur} onFocus={this.handleFocus}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Password' type='password' name='password'
						value={this.state.password} onBlur={this.handleBlur} onFocus={this.handleFocus}
						className={this.state.wrongDataClass}/>
					<div className='button' onClick={this.handleSubmit}>Login</div>
					<Link to='/register/personal'>
						<div className='button'>Register</div>
					</Link>
				</form>
				<h1>{this.state.message}</h1>
			</div>
		);
	}

}

export default Login;
