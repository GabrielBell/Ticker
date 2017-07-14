import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');
import ReactDOM from 'react-dom';
var ReactHighstock = require('react-highcharts/ReactHighstock.src');



export var TickerChart = React.createClass({
	render: function(){
		var {config} = this.props;
				
		return(
			
			<div className="chartWrapper" ref="chartWrapper">
				<ReactHighstock config={config} ref="chart"/>
			</div>
		);
	},

	
	componentWillReceiveProps: function(nextProps){
		
		console.log("TickerChart.componentWillReceiveProps()");
		console.log("nextPropsKeys", nextProps);
		/*switch(true){
			case nextPropsData.length < series.length:
				//find series index to remove
				let indexToRemove= -1;
				//nextSeries= series.filter((element) => { return nextPropsKeys.has(element.name) });
						
				//set series in state
				//this.setState({	series: nextSeries	})
				break;
			case nextPropsData.length > series.length:
				let newEntry= nextPropsData.pop();
				console.log("About to add: ", newEntry.name, " to series");
				nextSeries= series.push({
					id: newEntry.id,
					name: newEntry.name,
					color: newEntry.color,
					tooltip: { valueDecimals: 2},
					data: newEntry.dayPrices.map((price) => {return [moment(price.date).valueOf(), parseFloat(price.close) ]})
				});
				console.log("About to set series to :", nextSeries);
				break;
			default:
				//if their length is the same check lastUpdate
				let lastUpdated = moment(nextProps.lastUpdate);
				console.log("DEFAULT CASE: ", lastUpdated.valueOf(), lastUpdate.valueOf() );

		}*/
		
		
	}



	
}); 

export default Redux.connect()(TickerChart);
