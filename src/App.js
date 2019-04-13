import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';
import About from "./About.js"
import Home from "./Home.js"
import Feed from "./Feed.js"
import Download from "./Download.js"

function NavItem(props) {
	return (
		<li className="nav-item">
			<Link className="nav-link" to={props.url}>{props.text}</Link>
		</li>
	)
}

function Nav() {
	return (
		<nav className="navbar">
			<div className="container">
			<Link className="nav-item" to="/">GBP.OTF</Link>
			<ul className="nav justify-content-right" display="inline">
				<NavItem url="/feed" text="FEED" />
				<NavItem url="/about" text="ABOUT" />	
				<NavItem url="/download" text="DOWNLOAD" />	
			</ul>
		</div>
		</nav>
	)
}

class App extends Component {
	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Nav/>
				<div className="container mt-4">
					<Route exact path="/" component={Home} />
					<Route path="/download" component={Download} />
					<Route path="/feed" component={Feed} />
					<Route path="/about" component={About} />
				</div>
			</Router>
		)
  	}
}

export default App;
