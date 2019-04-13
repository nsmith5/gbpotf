import React, { Component } from 'react'
import * as d3 from "d3"

class SparkLine extends Component {
	constructor(props) {
		super(props)

		var width = 100
		var height = 25
		this.x = d3.scaleLinear().range([0, width])
		this.y = d3.scaleLinear().range([height, 0])
		this.parseDate = d3.timeFormat("%Y-%b-%d").parse
		//this.line = d3.svg.line()
		//		.x(d => this.x(d.date))
		//	.y(d => this.x(d.value))
	}

	componentDidMount() {
		fetch(
			'https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2019-04-01&symbols=EUR&base=GBP')
			.then(resp => {
				console.log(resp.json())
			})
		
	}

	render() {
		var styles = {
			fill: "none",
			stroke: "#ffff",
			strokeWidth: 0.5,
		}
		return <svg style={styles} id="ticker"></svg>
	}
}

function Home() {	
	return (
		<SparkLine />
	)
}

export default Home;
