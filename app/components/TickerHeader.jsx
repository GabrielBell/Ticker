import React from 'react';
import * as Redux from 'react-redux';
import moment from 'moment';
var actions = require('actions');

export var TickerHeader = React.createClass({
	getInitialState: function(){
		var {start, end} = this.props;
		return {
			startDateObj: start,
			startDateString: start.format('MMM Do, YYYY'), 
			endDateObj: end,
			endDateString: end.format('MMM Do, YYYY') 
		};
	},
	handleStartSubmit: function(e) {
		e.preventDefault();
		var {startDateObj, endDateObj} = this.state;
		var {dispatch} = this.props;
		var inputStart = this.refs.startDate.value;
		var startObj = moment(inputStart, "YYYY-MM-DD");
		
		var re= /^(\d{2,4}-?){1,3}$/;
		var isValidStart = ((re.test(inputStart))&&(startObj.isValid())&&(startObj.isBefore(endDateObj))&&(!startObj.isSame(startDateObj, 'day')));
		if(isValidStart){
			console.log("handling submit of valid and unique start input: ", startObj.format("MMM Do, YYYY"));
			this.setState({
				startDateString: startObj.format("MMM Do, YYYY"),
				startDateObj: startObj
			});
			dispatch(actions.setStartDate(startObj));

		}else{
			console.log("handling submit of invalid or reused start input: ", inputStart);
			this.setState({
				startDateString: startDateObj.format("MMM Do, YYYY")
			});
		}
	
	},
	handleEndSubmit: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		var {startDateObj, endDateObj} = this.state;
		var inputEnd = this.refs.endDate.value;
		var endObj = moment(inputEnd, "YYYY-MM-DD");
		var re= /^(\d{2,4}-?){1,3}$/;
		var isValidEnd = ((re.test(inputEnd))&&(endObj.isValid())&&(endObj.isBefore(moment()))&&(!endObj.isSame(endDateObj, 'day')));
		if(isValidEnd){
			console.log("handling submit of valid and unique end input: ", endObj.format("MMM Do, YYYY"));
			this.setState({
				endDateString: endObj.format("MMM Do, YYYY"),
				endDateObj: endObj
			});
			dispatch(actions.setEndDate(endObj));
		}else{
			console.log("handling submit of invalid or reused end input: ", inputEnd);
			this.setState({
				endDateString: endDateObj.format("MMM Do, YYYY")
			})
		}
	},
	render: function(){
		
		var {start, end, dispatch} = this.props;
		var {startDateObj, endDateObj, startDateString, endDateString} = this.state;
		
		return(
			<div className="top-bar">
				<div className="top-bar-left">
					<ul className="menu header-controls">
						<li className="menu-text">zoom</li>
						<li className="button tiny secondary">1m</li>
						<li className="button tiny secondary">3m</li>
						<li className="button tiny secondary">6m</li>
						<li className="button tiny secondary">1Y</li>
					</ul>
				</div>
				<div className="top-bar-right">
					<ul className="menu header-dates" id="date-inputs">
						
						<li className="has-form">
							<div className="row collapse">
								<div className="large-4 columns">
									<label>from</label>
								</div>
								<div className="large-8 columns">
									<form onSubmit={this.handleStartSubmit}>
										<input type="text" className="interval" ref="startDate" value={startDateString} onFocus={(e) => {
											e.preventDefault();
											this.refs.startDate.value = startDateObj.format("YYYY-MM-DD");
											
										}} onChange={(e) => {
											e.preventDefault();
											var inputStart = this.refs.startDate.value;
											this.setState({
												startDateString: inputStart
											});

										}} onBlur={(e) => {
											e.preventDefault();
											var startDate = this.refs.startDate.value;
											var startObj = moment(startDate, "YYYY-MM-DD");
											var re= /^(\d{2,4}-?){1,3}$/;
											console.log("startDate isSame: ", startObj.isSame(startDateObj, 'day'));
											//dont dispatch actions if the day hasn't changed
											var isValidDate = ((re.test(startDate))&&(startObj.isValid())&&(startObj.isBefore(endDateObj))&&(!startObj.isSame(startDateObj, 'day')));
											if( isValidDate ){
												console.log("start onBlur accepted");
												this.setState({
													startDateString: startObj.format("MMM Do, YYYY"),
													startDateObj: startObj
												});
												dispatch(actions.setStartDate(startObj));
											}else{
												console.log("start onBlur rejected");
												this.setState({
													startDateString: startDateObj.format("MMM Do, YYYY")
												});
											}
											
										}}/>
									</form>
									
								</div>
							</div>
						</li>
						
						<li className="has-form">
							<div className="row collapse">
								<div className="large-4 columns">
									<label>to</label>
								</div>
								<div className="large-8 columns">
									<form onSubmit={this.handleEndSubmit}>
										<input type="text" className="interval" ref="endDate" value={endDateString} onFocus={(e) => {
											e.preventDefault();
											this.refs.endDate.value = endDateObj.format("YYYY-MM-DD");
										}} onChange={(e) => {
											e.preventDefault();
											var inputEnd = this.refs.endDate.value;
											this.setState({
												endDateString: inputEnd
											});

										}} onBlur={(e) => {
											e.preventDefault();
											var endDate = this.refs.endDate.value;
											var endObj = moment(endDate, "YYYY-MM-DD");
											var re= /^(\d{2,4}-?){1,3}$/;
											console.log("endDate isSame: ", endObj.isSame(endDateObj, 'day'));
											var isValidDate = ((re.test(endDate))&&(endObj.isValid())&&(endObj.isBefore(moment()))&&(!endObj.isSame(endDateObj, 'day')));
											if( isValidDate ){
												console.log("end onBlur accepted");
												this.setState({
													endDateString: endObj.format("MMM Do, YYYY"),
													endDateObj: endObj
												});
												dispatch(actions.setEndDate(endObj));
											}else{
												console.log("end onBlur rejected");
												this.setState({
													endDateString: endDateObj.format("MMM Do, YYYY")
												});
											}
											
										}} />
									</form>
								</div>
							</div>
							
							
						</li>
					</ul>
				</div>
			
			</div>
		);
	}
});

export default Redux.connect(
	(state) => {
		return {
			start: state.date.start,
			end: state.date.end
		}
	}
)(TickerHeader);