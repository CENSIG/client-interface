import BaseStore from "fluxible/addons/BaseStore";

/**
 * A store for Taxon
 * @author Jean BOUDET
 */
class TaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info           = {};
		this.geojson        = {};
		this.parents        = [];
	}

	_handleAllData(data) {
		this.info    = data[0];
		this.geojson = data[1];
		this.parents = data[2];
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
		this.info           = state.info;
		this.geojson        = state.geojson;
		this.parents        = state.parents;
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers  = {
	"ESPECE_DATA" : "_handleAllData"
}

export default TaxonStore;
