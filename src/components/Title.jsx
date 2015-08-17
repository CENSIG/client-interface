import React from "react";
import {panelTitle} from "../configs/appConfig";

class Title extends React.Component
{
	constructor(props)
	{
		super(props);
		this.renderMap = {
			"firstChild": this._buildFirstChildTitle,
			"brothersNav": this._buildBrothersNavTitle
		}
	}

	_buildFirstChildTitle(rang, name)
	{
		rang = rang || "DFLT";
		let current  = panelTitle[rang].firstChildChart; 
		let adjectif = current.adjectif;
		let label    = current.label;
		return (
			<h3>Répartition des {adjectif} {label} de {name}</h3>
		);
	}

	_buildBrothersNavTitle(rang, name)
	{
		rang = rang || "DFLT";
		let current = panelTitle[rang].brothersNav;
		let adverbe = current.adverbe;
		let label   = current.label;
		return (
			<h3>Autre taxon {adverbe} même {label} que {name}</h3>
		);
	}

	render() {
		var {rang, name, type} = this.props;	
		return this.renderMap[type](rang, name);
	}
}

export default Title;
