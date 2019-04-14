import React, { Component } from 'react'
import { extent } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

import './Home.css'

class SparkLine2 extends Component {
	constructor(props) {
		super(props)
		this.margin = {top: 10, right: 30, bottom: 30, left: 60}
    	this.width = props.width - this.margin.left - this.margin.right
    	this.height = props.height - this.margin.top - this.margin.bottom
	}
	
	componentDidMount() {
		this.svg = select(this._rootNode)
			.append("svg")
				.attr("width", this.width + this.margin.left + this.margin.right)
				.attr("height", this.height + this.margin.top + this.margin.bottom)
			  .append("g")
				.attr("transform",
					"translate(" + this.margin.left + "," + this.margin.top + ")");


		// Add X axis --> it is a date format
		var x = scaleTime()
			.domain(extent(this.props.data, d => d.date ))
		 	.range([ 0, this.width ]);
		this.svg.append("g")
			.attr("class", "bottom-axis")
		 	.attr("transform", "translate(0," + this.height + ")")
		 	.call(axisBottom(x));

		// Add Y axis
		var y = scaleLinear()
			.domain(extent(this.props.data, d => d.price))
		  .range([this.height, 0]);
		this.svg.append("g")
			.attr("class", "left-axis")
		  	.call(axisLeft(y));

		// Add the line
		this.svg.append("path")
			.datum(this.props.data)
			.attr("class", "line")
			.attr("fill", "none")
		  	.attr("stroke", "white")
		  	.attr("stroke-width", 1)
		  	.attr("d", line()
				.x( d =>  x(d.date) )
				.y( d => y(d.price) )
			)
	}

	componentDidUpdate() {
		// Add X axis --> it is a date format
		var x = scaleTime()
			.domain(extent(this.props.data, d => d.date ))
		 	.range([ 0, this.width ]);
		this.svg.select(".bottom-axis")
		 	.attr("transform", "translate(0," + this.height + ")")
		 	.call(axisBottom(x));

		// Add Y axis
		var y = scaleLinear()
			.domain(extent(this.props.data, d => d.price))
		  .range([this.height, 0]);
		this.svg.select(".left-axis")
		  .call(axisLeft(y));

		// Add the line
		this.svg.select(".line")
			.datum(this.props.data)
			.attr("fill", "none")
		  	.attr("stroke", "white")
		  	.attr("stroke-width", 1)
		  	.attr("d", line()
				.x( d =>  x(d.date) )
				.y( d => y(d.price) )
			)
	}


	_setRef(componentNode) {
		this._rootNode = componentNode
	}

	render() {
		return <div style={{textAlign: 'center'}} className="line-container" ref={this._setRef.bind(this)} />
	}
}


function Home(props) {	
	return (
		<SparkLine2 height={300} width={700} data={props.data}/>
	)
}

export default Home;
