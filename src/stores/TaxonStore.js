import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

/**
 * A store for Taxon
 * @author Jean BOUDET
 */
class TaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info     = Immutable.Map();
		this.geojson  = Immutable.Map();
		this.parents  = Immutable.List();
		this.brothers = Immutable.List();
	}

	_handleAllData(data) {
		this.info    = Immutable.fromJS(data[0]);
		this.geojson = Immutable.fromJS(data[1]);
		this.parents = Immutable.fromJS(data[2]);
		var brothers = Immutable.fromJS(data[3]);

		// Change reference if data value don't equals
		if (!Immutable.is(this.brothers, brothers)) {
			this.brothers = brothers;	
		}

		this.emitChange();
	}

	getInfo() {
		return this.info;	
	}

	getGeoJson() {
		return this.geojson;	
	}

	getParents() {
		return this.parents;	
	}

	getBrothers() {
		return this.brothers;	
	}

	getState() {
		return {
			info     : this.info,
			geojson  : this.geojson,
			parents  : this.parents,
			brothers : this.brothers
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.info     = Immutable.fromJS(state.info);
		this.geojson  = Immutable.fromJS(state.geojson);
		this.parents  = Immutable.fromJS(state.parents);
		this.brothers = Immutable.fromJS(state.brothers);
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers  = {
	"ESPECE_DATA" : "_handleAllData"
}

export default TaxonStore;
