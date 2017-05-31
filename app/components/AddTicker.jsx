import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');
import AddTickerFilteredList from 'AddTickerFilteredList';

export var AddTicker = React.createClass({
	getInitialState: function(e){
		return {
			invalidCode: false
		}
	},
	handleSubmit: function(e){
		e.preventDefault();
		var {dispatch, searchText, filteredSearch, endDate} = this.props;
		//verify its a valid code
		if(searchText.length){
			var found= filteredSearch.find((element) => {
				return element.symbol === searchText;
			});
			if(found) {
				// add ticker symbol to state
				dispatch(actions.startAddActiveTicker(found))
				//dispatch(actions.startAddStock(tickerSymbol));
				console.log("My cutoff date is: ", endDate.format("MMM Do, YYYY"));
				// fetch 1Y of data
			}else {
				this.setState({invalidCode: true})
			}
			
			
			dispatch(actions.clearSearch());
		}
		
	},
	handleInput: function(e){
		e.preventDefault();
		var {dispatch} = this.props;
		var {invalidCode} = this.state;
		if(invalidCode){ this.setState({invalidCode: false})}
		var tickerSymbol = this.refs.tickerSymbolSearch.value.toUpperCase();
		if(/^([A-Z]*[\.\-]?[A-Z]*)$/.test(tickerSymbol)){
			dispatch(actions.startSearchFilter(tickerSymbol));
		}
	},	
	render: function(){
		
		var {searchText} = this.props;
		var {invalidCode} = this.state;
		var renderInvalidMessage = () => {
			if(invalidCode){
				return (<div className="invalidCodeMessage">Sorry that code appears to be invalid. Try Again. </div>)
			}
		}
		return(
			<div className="add-ticker-container">
				<h6 className="add-ticker-title">Syncs in realtime.</h6>
				<div className="form-wrapper">
					<div className="row">
						<div className="large-10 large-centered columns">
							<form ref="form" onSubmit={this.handleSubmit} className="code-form">
								<div className="input-group">
									<input type="text" className="input-group-field" ref="tickerSymbolSearch" placeholder="Stock code" value={searchText} onChange={this.handleInput}/>
									<div className="input-group-button">
										<input type="submit" className="button" value="Add"/>
									</div>
								</div>
							</form>
							<div className="invalidMessageWrapper">{renderInvalidMessage()}</div>
							<AddTickerFilteredList/>
						</div>
					</div>
					
				</div>
			</div>
		);
	}
});

export default Redux.connect(
	(state) => {
		return {
			searchText: state.search.searchText,
			filteredSearch: state.search.filtered,
			endDate: state.date.end

		}
	})(AddTicker);