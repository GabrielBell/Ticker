import React, {Component} from 'react';
import * as Redux from 'react-redux';
import TickerChart from 'TickerChart';
import moment from 'moment';

export class TickerChartContainer extends Component {
	//we assume activeTickers.length > 0 
	constructor(props) {
		super(props);
		var {historicalData,activeTickers} = this.props;
		let series = [], lastUpdated = moment("1970-01-01");
		historicalData.forEach((element, index) => {
			series.push({ 
				id: element.id,
				name: element.name, color: element.color,	tooltip: { valueDecimals: 2}, 
				data: element.dayPrices.map((daysPrice) => { return [moment(daysPrice.date).valueOf(),parseFloat(daysPrice.close)]; })
			}) 
		});
		this.state = {series: series}
	}
	
	render() {
		var {series} = this.state;
		var config= { 
				rangeSelector:{	selected: 1	},
				title: { text: 'Stocks'	},
				series: series,
				chart:{	height: 450, width: 1150, renderTo: 'chartWrapper'},	
				responsive: {
					rules: [{
						condition: {
							maxWidth: 1200
						},
						chartOptions: {
							navigator: {
								enabled: false
							}
						}
					}]
				},	
			}
		return (
			<div className="tickerChartContainer">
				<div className="tickerChartWrapper">
					<div id="chartContainer" ref="container">
						<TickerChart config={config}/>
					</div>
				</div>
			</div>
			)
	}

};
export default Redux.connect((state) => {
	return {
		activeTickers: state.activeTickers,
		historicalData: state.historicalData,
		lastUpdate: state.lastUpdate
	}
})(TickerChartContainer);




/*














render() {
		var {config} = this.state;
		return (
			<div className="tickerChartContainer">
				<div className="tickerChartWrapper">
					<TickerChart config={config}/>
				</div>
			</div>
			)
	}
*/