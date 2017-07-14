import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');
import moment from 'moment';
import ReactDOM from 'react-dom';
//var ReactHighstock = require('react-highcharts/ReactHighstock.src');
import highcharts from 'highcharts';


export var TickerChart = React.createClass({
	getInitialState: function() {
			
		var {historicalData,activeTickers, lastUpdate, config} = this.props;
		let series = [], lastUpdated = moment("1970-01-01");

		historicalData.forEach((element, index) => {
			series.push({ 
				id: element.id,
				name: element.name, color: element.color,	tooltip: { valueDecimals: 2}, 
				data: element.dayPrices.map((daysPrice) => { return [moment(daysPrice.date).valueOf(),parseFloat(daysPrice.close)]; })
			}) 
			let curr = element.dayPrices.slice(-1);
			lastUpdated= lastUpdated < moment(curr.date) ? moment(curr.date) : lastUpdated;
			
		});
		console.log("Initial State Series: ", series);
		config["series"] = series;
		//change responsive to actually respond
		return { series: series, lastUpdated: lastUpdate, config: config }

	},
	render: function(){
		var {series, config} = this.state;
		console.log("SERIES INSIDE RENDER: ", series);
		config["series"] = series;
		const handleEmpty = () => {
			if(series.length === 0){
				return <div></div>
			}else{
				return <ReactHighstock config={config} ref="chart"/>
			}
		}
		return(
			
			<div className="chartWrapper" ref="chartWrapper">
				{handleEmpty()}
			</div>
		);
	},

	//any time new Data is added to store this method is invoked.
	//make sure to check if nextProps is actually different
		//if so modify series to reflect changes
	componentWillReceiveProps: function(nextProps){
		
		var {series, config, lastUpdated} = this.state;
		let nextPropsData = nextProps["historicalData"];
		let nextPropsKeys = new Set(nextPropsData.map((e) => { return e.name}));
		let nextSeries= [];

		console.log("nextPropsKeys", nextPropsKeys);
		switch(true){
			case nextPropsData.length < series.length:
				//find series index to remove
				let indexToRemove= -1;
				nextSeries= series.filter((element) => { return nextPropsKeys.has(element.name) });
						
				//set series in state
				this.setState({	series: nextSeries	})
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

		}
		
		
	}



	
}); 

export default Redux.connect((state) => {
	return {
		activeTickers: state.activeTickers,
		historicalData: state.historicalData,
		lastUpdate: state.lastUpdate
	}
})(TickerChart);
