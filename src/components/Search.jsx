import React						 from "react";
import SearchTaxonAction from "../actions/SearchTaxonAction";
import SearchTaxonStore	 from "../stores/SearchTaxonStore";
import AtlasStore				 from "../stores/AtlasStore";
import {connectToStores} from "fluxible/addons";
import {NavLink}				 from "fluxible-router";

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
				<li>
					<em>{data.get("nameRef")}</em>
				</li>
				<ItemContentName isref={data.get("isref")}>
					{data.get("name")}
				</ItemContentName>
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

	shouldComponentUpdate(nextProps) {
		return nextProps.content.get("cdnom") !== this.props.content.get("cdnom");
	}

	render() {
		return (
			<li>
				<NavLink routeName="taxon" navParams={
					{ name: this.context.atlasUriName, cdnom: this.props.content.get("cdref") }
				}>
					<SearchResultItemContent>
						{this.props.content}
					</SearchResultItemContent>
				</NavLink>
			</li>
		);
	}
}

SearchResultItem.contextTypes = {
	atlasUriName: React.PropTypes.string
}

class HeaderSearchResult extends React.Component
{
	constructor(props) {
		super(props);	
	}

	shouldComponentUpdate(nextProps) {
		return false;	
	}

	render() {
		return (
			<li className="search-result-header">
				<ul className="search-result-item-content">
					<li>Taxon référent</li>
					<li>Nom</li>
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
		if (results.size != 0) {
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

	shouldComponentUpdate(nextProps) {
		return nextProps.placeholder !== this.props.placeholder;	
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

	shouldComponentUpdate(nextProps) {
		if (nextProps.results.size === 0) {
			return true;	
		}
		return nextProps.results !== this.props.results;	
	}

	_handleKeyUp(e) {
		var q = e.target.value;
		if (q.length > 3) {
			var cdnom = this.props.parentsCdnom; 
			this.context.executeAction(SearchTaxonAction.getSearchChild, {
				cdnom: cdnom,
				options: { q: q }
			});
		}

		if (q.length == 0 && this.props.results.size > 0) {
			this.context.executeAction(SearchTaxonAction.resetSearch);
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
