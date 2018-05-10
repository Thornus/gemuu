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
		const newState = {...this.state};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	handleFocus() {
		if(this.state.wrongDataClass) {
			this.setState({...this.state, wrongDataClass: ''});
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
                setTimeout(() => self.setState({...this.state, wrongDataClass: 'red-outline'}), 840);
			}

			this.setState({...this.state, wrongDataClass: 'shake red-outline'}, callback);
		}
	}

	render() {
		// if (this.props.loggedIn) {
		// 	this.goToUserPage.bind(this)();
		// }

		//const message = this.props.message ? this.props.message : null;
		return (
			<div className='login page center-flex'>
				<form className='login-form inner-block' onSubmit={this.handleSubmit}>
					<Input placeholder='Username' type='text' name='username'
						value={this.state.username} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						className={this.state.wrongDataClass}/>
					<Input placeholder='Password' type='password' name='password'
						value={this.state.password} onChangeValue={this.handleChange} onFocus={this.handleFocus}
						className={this.state.wrongDataClass}/>
					<Input type='submit' value='Login'/>
					<Link to='/register'><Input type='submit' value='Register'/></Link>
				</form>
			</div>
		);
	}

}

export default Login;
