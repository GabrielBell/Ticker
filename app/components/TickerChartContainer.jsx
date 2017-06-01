import React, {Component} from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
import TickerChart from 'TickerChart';
import moment from 'moment';


export class TickerChartContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state ={
			activeTickers: props.activeTickers,
			historicalData: props.historicalData,
			isLoading: true
		};
	}

	// anytime store detects changes this method will be invoked
	componentWillReceiveProps(nextProps){
		this.setState({
			activeTickers: nextProps.activeTickers,
			historicalData: nextProps.historicalData,
			isLoading: false
		})
	}



	render() {
		var {historicalData,activeTickers, isLoading} = this.state;
		//console.log("Containers state: ", activeTickerList, isLoading);
		var renderActive = () => {
			if(!isLoading && activeTickers.length === historicalData.length ){
				//extract labels
				
				
				var labels = historicalData[0].dayPrices.map((dayPrice) => { return moment(dayPrice.date).format("MM-DD")})
				var datasets = [];
				
				
				historicalData.forEach((element, index) => {
					var rgbaStr=`rgba(${Math.floor(Math.random() * (115)) +105},${Math.floor(Math.random() * (100)) +120},${Math.floor(Math.random() * (100)) +120},1)`;
					datasets[index] = {
						label: element.name,
						strokeColor: rgbaStr,
						data: element.dayPrices.map((daysPrice) => { return parseFloat(daysPrice.close); })
					}
				});
				const data = { labels: labels,	datasets: datasets	};
				const options = {
									datasetFill: false,
									pointDot: false,
									bezierCurve: true,
									responsive: true,
									tooltips: {
										mode: 'label'
									},
									hover: {
										mode: 'dataset'
									},
									scales: {
										xAxes: [
											{
										        display: true,
										        scaleLabel: {
										          show: true,
										          labelString: 'Date'
										        }
									      	}
										],
										yAxes: [
										      {
										        display: true,
										        scaleLabel: {
										          show: true,
										          labelString: 'Close'
										        },
										        ticks: {
										          suggestedMin: 0,
										          suggestedMax: 500
										        }
										      }
										    ]
									}
								};
				
				//console.log("Data object: ", data);
				return (
					<div className="tickerChartWrapper">
						<TickerChart data={data} options={options}/>
					</div>
					);
			}
		}
		/*<canvas id="tickerCanvas" ref="canvas" width="1000" height="350"></canvas>*/
		return (
			<div className="tickerChartContainer">
				
				{renderActive()}
			</div>
			)
	}

};

export default Redux.connect((state) => {
	return {
		activeTickers: state.activeTickers,
		historicalData: state.historicalData
	}
})(TickerChartContainer);



/**/