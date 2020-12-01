import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import App from './App'
import Restaurant from './Restaurant'

const RouterApp = () => {
	
	return (
		<Router>
			<h1 className="App">Chicago Restaurants</h1>
			<Link to='/'>Home</Link>
			<Switch>
				<Route path="/restaurant:id" children={<Restaurant/>}/>
				<Route path="/">
					<App />
				</Route>
			</Switch>
		</Router>
	)
}

export default RouterApp