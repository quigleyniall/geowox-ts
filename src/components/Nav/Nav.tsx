import React from 'react';
import logo from 'assets/logo.jpg';
import './Nav.scss';

export const Nav: React.FC = () => (
	<nav className="nav">
		<img src={logo} alt="geowox" className="geowox-logo" />
	</nav>
);
