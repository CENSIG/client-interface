import React						 from "react";
import SearchTaxonAction from "../actions/SearchTaxonAction";
import SearchTaxonStore	 from "../stores/SearchTaxonStore";
import TaxonStore				 from "../stores/TaxonStore";
import {connectToStores} from "fluxible/addons";

if (process.env.BROWSER && typeof window !== "undefined") {
	require("../assets/css/base/search.css");
}

/**
 * Class which represent name of taxon
 * @author Jean BOUDET
 */
class ItemContentName extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		var name = this.props.children;

		if (this.props.isref) {
			name = <strong>{name}</strong>
		}
		return (
			<li>
				{name}
			</li>
		)	
	}
}

/**
 * Class which represent content of an item result
 * @author Jean BOUDET
 */
class SearchResultItemContent extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		var data = this.props.children;
		return (
			<ul className="search-result-item-content">
				<ItemContentName isref={data.isref}>
					{data.name}
				</ItemContentName>
				<li className="search-content-obs">{data.observations}</li>
				<li>
					<em>{data.nameRef}</em>
				</li>
			</ul>
		);	
	}
}

/**
 * Class which represent an result item
 * @author Jean BOUDET
 */
class SearchResultItem extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<li>
				<SearchResultItemContent>
					{this.props.content}
				</SearchResultItemContent>
			</li>
		);
	}
}

class HeaderSearchResult extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<li className="search-result-header">
				<ul className="search-result-item-content">
					<li>Nom</li>
					<li className="search-content-obs">Nombre d'observations</li>
					<li>Taxon référent</li>
				</ul>
			</li>
		)	
	}
}

/**
 * Class for result of research
 * @author Jean BOUDET
 */
class SearchResult extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		var results = this.props.results;
		var res;
		if (results.length != 0) {
			var items = results.map(result => {
				return <SearchResultItem content={result} />;
			});
			res = (
				<ul className="card search-results">
					<HeaderSearchResult />
					{items}
				</ul>
			);
		} else {
			res = null;	
		}
		return res;
	}
}

/**
 * Class which represent search input
 * @author Jean BOUDET
 */
class SearchInput extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<div className="card search-input">
				<input type="search" placeholder={this.props.placeholder} onKeyUp={this.props._onKeyUp}/>
			</div>
		);	
	}
}

/**
 * Element for search taxon
 * @author Jean BOUDET
 */
class Search extends React.Component
{
	constructor(props, context) {
		super(props, context);
	}

	_handleKeyUp(e) {
		var q = e.target.value;
		if (q.length > 3) {
			var id = this.context.getStore(TaxonStore).getInfo().id;
			this.context.executeAction(SearchTaxonAction.getSearchChild, {
				id: id,
				options: { q: q }
			});
		}

		if (q.length == 0 && this.props.results.length > 0) {
			this.context.executeAction(SearchTaxonAction.resetSearch, {
				results: [],
				pendingRequest: null
			});
		}
	}

	render() {
		var placeholder = "Recherchez un taxon spécifique dans les "+this.props.label;
		return (
			<div className="search">
				<SearchInput placeholder={placeholder} _onKeyUp={this._handleKeyUp.bind(this)} />
				<SearchResult results={this.props.results} />
			</div>
		);
	}
}

Search.contextTypes = {
	executeAction : React.PropTypes.func,
	getStore      : React.PropTypes.func
}

Search = connectToStores(Search, [ SearchTaxonStore ], (stores, props) => {
	return {
		results: stores.SearchTaxonStore.getResults()
	}
});

export default Search;
