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
	constructor() {
		super()
		this.state = {
			date: new Date(),
			price: 1.40,
			history: [
				{ date: new Date(2018, 3, 1), price: 1.30 },
				{ date: new Date(2018, 3, 2), price: 1.31 },
				{ date: new Date(2018, 3, 3), price: 1.31 },
			]
		}
	}

	componentWillMount() {
		var date = new Date()
		var params = {
			startAt: '2010-01-01',
			endAt: `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`,
			symbols: 'EUR',
			base: 'GBP',
		}
		
		var url = 'https://api.exchangeratesapi.io/history' +
			`?base=${params.base}&symbols=${params.symbols}&start_at=${params.startAt}&` +
			`end_at=${params.endAt}`
		
		fetch(url, { mode: 'cors'}).then(resp => {
			return resp.json()
		}).then(json => {
			var newHistory = Object.entries(json.rates).map(([date, price]) => {
				return { date: new Date(date), price: price.EUR }		
			})
			newHistory.sort((a, b) => a.date < b.date)
			var { date, price } = newHistory[0]

			this.setState({ 
				history: newHistory,
				date: date,
				price: price,
			})
		})
	}

	render() {
		// Probably a bad side effect behaviour, but oh well..
		if (this.state.price < 1.10) {
			document.body.style.fontFamily = "\"GBP OTF 1.05\""	
		} else if (this.state.price < 1.15) {
			document.body.style.fontFamily = "\"GBP OTF 1.10\""
		} else if (this.state.price < 1.20) {
			document.body.style.fontFamily = "\"GBP OTF 1.15\""
		} else if (this.state.price < 1.25) {
			document.body.style.fontFamily = "\"GBP OTF 1.20\"" 
		} else if (this.state.price < 1.30) {
			document.body.style.fontFamily = "\"GBP OTF 1.25\"" 
		} else if (this.state.price < 1.35) {
			document.body.style.fontFamily = "\"GBP OTF 1.30\"" 
		} else if (this.state.price < 1.40) {
			document.body.style.fontFamily = "\"GBP OTF 1.35\"" 
		} else {
			document.body.style.fontFamily = "\"GBP OTF 1.40\""
		}

		return (
			<Router basename={process.env.PUBLIC_URL}>
				<Nav />
				<div className="container mt-4">
					<Route
						exact
						path="/"
						render={() => <Home data={this.state.history} /> }
					/>
					<Route path="/download" component={Download} />
					<Route path="/feed" component={Feed} />
					<Route path="/about" component={About} />
				</div>
			</Router>
		)
	}
}

export default App
