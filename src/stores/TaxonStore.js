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
		this.info           = Immutable.Map();
		this.geojson        = Immutable.Map();
		this.parents        = Immutable.List();
	}

	_handleAllData(data) {
		this.info    = Immutable.fromJS(data[0]);
		this.geojson = Immutable.fromJS(data[1]);
		this.parents = Immutable.fromJS(data[2]);
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

	getState() {
		return {
			info           : this.info,
			geojson        : this.geojson,
			parents        : this.parents
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.info           = Immutable.fromJS(state.info);
		this.geojson        = Immutable.fromJS(state.geojson);
		this.parents        = Immutable.fromJS(state.parents);
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers  = {
	"ESPECE_DATA" : "_handleAllData"
}

export default TaxonStore;
