import React from "react";
import Ariane from "./Ariane";
import {NavLink} from "fluxible-router";
import ExploreSubTaxonAction from "../actions/ExploreSubTaxonAction";
import ExploreSubTaxonStore from "../stores/ExploreSubTaxonStore";
import {connectToStores}  from "fluxible/addons";

if (process.env.BROWSER) {
	require('../assets/css/base/exploreSubTaxon.css');
}

/**
 * Button explore. Display list of taxon childs
 * @author Jean BOUDET
 */
class ButtonExploreSubTaxon extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render () {
		return (
			<span className="button-explore" onClick={this.props.callBackClick}>Explorer</span>	
		);
	}
}

/**
 * Button explore sub taxon.
 * @author Jean BOUDET
 */
class ButtonExploreSubTaxonView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<span data-cdnom={this.props.cdnom} 
				onClick={this.context.subTaxonViewCallback}>Explorer les fils</span>);
	}
}

ButtonExploreSubTaxonView.contextTypes = {
	subTaxonViewCallback: React.PropTypes.func
}

/**
 * List childs of specific taxon
 * @author Jean BOUDET
 */
class ExploreSubTaxonView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_getFirstChilds() {
		var childs = this.context.firstChilds.map((child, i) => {
			var navParams = {
				name: this.context.atlasUriName,
				cdnom: child.get("cdnom")
			};
			return (
				<li key={i} className="flex fjb explore-results">
					<NavLink routeName="taxon" navParams={navParams}>
						{child.get("name")}
					</NavLink>
					<ButtonExploreSubTaxonView cdnom={navParams.cdnom}/>
				</li>
			);
		});

		return childs.size !== 0 ? <ul>{childs}</ul> : <p>Il n'y a pas de fils observés</p>;
	}

	render () {
		var className = "card explore-sub-taxon-view";

		if (!this.props.displaying) {
			className += " hidden";
		} 
		return (
			<div className={className}>
				<Ariane	parents={this.context.parents} />
				{this._getFirstChilds()}
			</div>	
		)
	}
}

ExploreSubTaxonView.contextTypes = {
	firstChilds: React.PropTypes.object,
	parents: React.PropTypes.object,
	atlasUriName: React.PropTypes.string
}

/**
 * Component for display a explore button
 * for display childs of specific taxon
 * @author Jean BOUDET
 */
class ExploreSubTaxon extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			displaying: false,
			isIn: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.firstChilds !== this.props.firstChilds
			||
			nextProps.parents !== this.props.parents
			||
			nextState.displaying !== this.state.displaying
		);
	}

	getChildContext() {
		return {
			firstChilds: this.props.firstChilds,
			parents: this.props.parents,
			subTaxonViewCallback: this._handleSubTaxonViewClick.bind(this),
			arianeCallback: this._handleArianeCallback.bind(this)
		}	
	}

	componentDidMount() {
		var thisElt = React.findDOMNode(this.refs.explore);
		thisElt.addEventListener("mouseover", this._handleWindowOver.bind(this));	
		thisElt.addEventListener("mouseout", this._handleWindowOut.bind(this));	
		window.addEventListener("mouseup", this._handleWindowClick.bind(this));	
	}

	componentWillUnmount() {
		var thisElt = React.findDOMNode(this.refs.explore);
		thisElt.addEventListener("mouseover", this._handleWindowOver.bind(this));	
		thisElt.addEventListener("mouseout", this._handleWindowOut.bind(this));	
		window.removeEventListener("mouseup", this._handleWindowClick.bind(this));	
	}

	// When "Explorer les fils" is clicked
	_handleSubTaxonViewClick(e) {
		var target = e.target;
		var taxonSupString = target.parentNode.children[0].textContent;
		var cdnom = target.getAttribute("data-cdnom");
		this.context.executeAction(ExploreSubTaxonAction.exploreSubTaxon, {
			event: "sub",
			name: taxonSupString,
			cdnom: cdnom
		});
	}

	// When an taxon sup is clicked
	_handleArianeCallback(e) {
		var target = e.target;
		var taxonSupString = e.target.textContent;
		var cdnom = target.parentNode.getAttribute("data-cdnom") || target.getAttribute("data-cdnom");
		this.context.executeAction(ExploreSubTaxonAction.exploreSubTaxon, {
			event:"sup",
			name: taxonSupString,
			cdnom: cdnom
		});
	}

	_handleWindowOver(e) {
		this.setState({
			isIn: true	
		});
	}

	_handleWindowOut(e) {
		this.setState({
			isIn: false	
		});
	}

	_handleWindowClick(e) {
		var thisElt = React.findDOMNode(this.refs.explore);
		
		// click outside box
		if (thisElt !== null && !this.state.isIn) {
			this.setState({
				displaying: false	
			});
		}
	}

	// When button explore is clicked
	_handleClickButton(e) {
		this.setState({
			displaying: true
		});
	}

	render() {
		return (
			<div ref="explore" className="explore-sub-taxon" 
				onMouseDown={this._handleMouseDown}
				onMouseUp={this._handleMouseUp}
			>
				<ButtonExploreSubTaxon 
					callBackClick={this._handleClickButton.bind(this)}	
				/>
				<ExploreSubTaxonView 
					displaying={this.state.displaying} 
				/>
			</div>
		);
	}
}

ExploreSubTaxon.childContextTypes = {
	firstChilds: React.PropTypes.object,
	parents: React.PropTypes.object,
	subTaxonViewCallback: React.PropTypes.func,
	arianeCallback: React.PropTypes.func
}

ExploreSubTaxon.contextTypes = {
	executeAction: React.PropTypes.func	
}

ExploreSubTaxon = connectToStores(ExploreSubTaxon, [ ExploreSubTaxonStore ], (stores, props) => {
	return stores.ExploreSubTaxonStore.getState();
});

export default ExploreSubTaxon;
