import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pods/login/login';
import Register from './pods/register/register';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path='/' component={Login}/>
					<Route path='/register' component={Register}/>
				</Switch>
			</div>
		);
	}
}

export default App;
