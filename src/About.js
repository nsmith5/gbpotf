import React from 'react'
import logo from './assets/letter.png'

function About() {
	return (
		<div className="row">
			<div className="col-6">
				<img src={logo} width="100%" alt="a big letter"></img>
			</div>
			<div className="col-6">	
				<p> 
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Maecenas et magna vulputate quam tempus commodo. Duis non ante
					nisl. Cras ullamcorper vehicula rhoncus. Ut ac hendrerit nibh.
					Fusce euismod mollis augue vel efficitur. Phasellus consectetur
					et nisl a sodales. Aliquam tempus augue risus, in malesuada
					justo lacinia eget.  Aliquam eu leo et nunc ultricies suscipit
					vitae vel turpis.
				</p>
			</div>	
		</div>
	)
}

export default About;
