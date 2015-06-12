import React from "react";
import Ariane from "./Ariane";
import {NavLink} from "fluxible-router";

if (process.env.BROWSER) {
	require('../assets/css/base/exploreSubTaxon.css');
}

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

class ButtonExploreSubTaxonView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<span onClick={this.context.subTaxonViewCallback}>Explorer les fils</span>
		);
	}
}

ButtonExploreSubTaxonView.contextTypes = {
	subTaxonViewCallback: React.PropTypes.func
}

class ExploreSubTaxonView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_getFirstChilds() {
		var childs = this.context.firstChilds.map(child => {
			var navParams = {
				name: this.context.atlasUriName,
				cdnom: child.get("cdnom")
			};
			return (
				<li className="flex fjb explore-results">
					<NavLink routeName="taxon" navParams={navParams}>
						{child.get("name")}
					</NavLink>
					<ButtonExploreSubTaxonView />
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

class ExploreSubTaxon extends React.Component
{
	constructor(props) {
		super(props);	
		this.state = {
			displaying: false,
			isIn: false
		}
	}

	getChildContext() {
		return {
			firstChilds: this.props.firstChilds,
			parents: this.props.parents,
			subTaxonViewCallback: this._handleSubTaxonViewClick.bind(this)
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

	_handleSubTaxonViewClick(e) {
		console.log(e.target.parentNode.children[0].textContent);
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
					hasFirstChilds={this.props.hasFirstChilds} 
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
	subTaxonViewCallback: React.PropTypes.func
}

export default ExploreSubTaxon;
