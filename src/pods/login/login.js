/* eslint-disable */
import React, {Component} from 'react';
import Input from '../input/input';

class Login extends Component {

	render() {
		if (this.props.loggedIn) {
			this.goToUserPage.bind(this)();
		}

		const message = this.props.message ? this.props.message : null;
		return (
			<div className='login-page'>
				<form className='login-form' onSubmit={this.login}>
					<Input placeholder='Username' type='text' name='username'/>
					<Input placeholder='Password' type='password' name='password'/>
					<Input type='submit' value='Login'/>
				</form>
				{/* <button onClick={this.goToRegister.bind(this)}>Don't have an account?</button> */}
				{/* <div className='message'>{message}</div> */}
			</div>
		);
	}

}

export default Login;
