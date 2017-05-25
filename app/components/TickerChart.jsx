import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

export var TickerChart = React.createClass({
	componentWillMount: function(){
		this.setState({
			width: "1000",
			height: "350"
		});
		this._chart = null;
	},
	render: function(){
		var {width, height} = this.state;
		var style = {width, height};
		return(
			<div className="chart-container" ref="container">
				<div className="chartWrapper" ref="chartWrapper">
					<canvas ref="canvas" width={width} height={height} style={style}></canvas>
				</div>
			</div>
		);
	},
	componentDidMount: function(){
		//fetch data here

		(window.onresize = () => {
			var wrapper = ReactDOM.findDOMNode(this.refs.chartWrapper);
			var width = wrapper.clientWidth;
			var height = wrapper.clientHeight;
			
			if(this._chart) {
				this._chart.chart.width = width;
				this._chart.chart.height = height;
			}

			this.setState({ width, height});
		})();
	},
	componentDidUpdate: function(){
		if(this._chart) this._chart.destroy();
		var ctx = this.refs.canvas.getDOMNode().getContext("2d");
		this._chart = new Chart(ctx, 
			{
				type: 'line', 
				data: {
					'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				}
			}
		)
	}
});

export default Redux.connect()(TickerChart);