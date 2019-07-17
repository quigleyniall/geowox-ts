import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { Home } from 'Pages/Home/Home';
import history from './history';

const App = () => (
	<Router history={history}>
		<Switch>
			<Route path="/" component={Home} />
		</Switch>
	</Router>
);

export default App;
