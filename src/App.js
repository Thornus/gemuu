import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import NotFound from './components/notFound/notFound';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path='/' component={Login}/>
					<Route path='/register' component={Register}/>
					<Route component={NotFound}/>
				</Switch>
			</div>
		);
	}
}

export default App;
