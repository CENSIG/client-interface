import React							from "react";
import TaxonStore					from "../stores/TaxonStore";
import BrothersNavigationStore from "../stores/BrothersNavigationStore";
import {connectToStores}  from "fluxible/addons";
import Template					  from "../templates/Template";

/**
 * A component to display a taxon of atlas
 * @author Jean BOUDET
 */
class Taxon extends React.Component
{
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		if (this.props.taxon.current === null) {
			return true;	
		}
		return nextProps.taxon.current !== this.props.taxon.current;
	}

	render() {
		return <Template component="taxon" {...this.props} />; 
	}
}

Taxon = connectToStores(Taxon, [ TaxonStore, BrothersNavigationStore ], (stores, props) => {
	return {
		taxon       : stores.TaxonStore.getState(),
		brothersNav : stores.BrothersNavigationStore.getState()
	}
});

export default Taxon;
