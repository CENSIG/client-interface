import React from "react";
import Radium from "radium";
import {NavLink} from "fluxible-router";
import {Ariane} from "../../ariane";
import ButtonExploreSubTaxonView from "./ButtonExploreSubTaxonView";

import style from "../style";

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
				<li key={i}>
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
		var styleTaxonView = style.taxonView;

		if (!this.props.displaying) {
			styleTaxonView = style.taxonViewHidden;
		} 

		return (
			<div style={styleTaxonView}>
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

ExploreSubTaxonView = Radium(ExploreSubTaxonView);

export default ExploreSubTaxonView;
