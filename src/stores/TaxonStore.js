import BaseStore from "fluxible/addons/BaseStore";

class TaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info    = {};
		this.geojson = {};
	}

	_handleInfo(taxon) {
		this.info = taxon.info;	
		this.emitChange();
	}

	_handleGeoJson(taxon) {
		this.geojson = taxon.geojson;	
		this.emitChange();
	}

	getState() {
		return {
			info: this.info,
			geojson: this.geojson
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.info    = state.info;
		this.geojson = state.geojson;
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers  = {
	"RECEIVE_INFO"    : "_handleInfo",
	"RECEIVE_GEOJSON" : "_handleGEOJSON"
}

export default TaxonStore;
