import React from 'react';
import * as Redux from 'react-redux';
var actions = require('actions');
import SearchResult from 'SearchResult';

export var AddTickerFilteredList = React.createClass({
	render: function(){
		var {searchResults} = this.props;
		var renderResults= () => {
			if(searchResults.length){
				var topFiveResults = searchResults.slice(0,5);
				return topFiveResults.map((ticker) => {
					return <SearchResult key={ticker.id} {...ticker}/>;
				});
			}
		}
		return(
			<div className="tickerSearchResults">
				{renderResults()}
			</div>
			);
	}
});

export default Redux.connect(
	(state) => {
		return {
			searchResults: state.search.filtered
		}
	})(AddTickerFilteredList);