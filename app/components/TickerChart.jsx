import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');

import ReactDOM from 'react-dom';
import {Line as LineChart} from "react-chartjs";

export class TickerChart extends React.Component {

	render(){
		var {data,options,dispatch} = this.props;
		//console.log("options: ", options);
		//console.log("data: ", data);
		return(
			<div className="chartContainer" ref="container">
				<div className="chartWrapper" ref="chartWrapper">
					<LineChart data={data} options={options} width="1000" height="350" redraw/>
				</div>
			</div>
		);
	}

	
};

export default Redux.connect()(TickerChart);