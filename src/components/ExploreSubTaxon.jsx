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

class ExploreSubTaxonView extends React.Component
{
	constructor(props) {
		super(props);	
	}

	_getFirstChilds() {
		return this.context.firstChilds.map(child => {
			return (
				<li>
					<NavLink>{child.get("name")}</NavLink>
				</li>
			);
		});
	}

	render () {
		var className = "card explore-sub-taxon-view";

		if (!this.props.displaying) {
			className += " hidden";
		} 
		return (
			<div className={className}>
				<Ariane	parents={this.context.parents} />
				<ul>
					{this._getFirstChilds()}
				</ul>
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
			parents: this.props.parents
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
		if (this.props.firstChilds.size !== 0) {
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
		return false;
	}
}

ExploreSubTaxon.childContextTypes = {
	firstChilds: React.PropTypes.object,
	parents: React.PropTypes.object
}

export default ExploreSubTaxon;
