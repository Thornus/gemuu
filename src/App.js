import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pods/login/login';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path='/' component={Login}/>
				</Switch>
			</div>
		);
	}
}

export default App;
