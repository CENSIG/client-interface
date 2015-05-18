import BaseStore from "fluxible/addons/BaseStore";

/**
 * A store for Taxon
 * @author Jean BOUDET
 */
class TaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info    = {};
		this.geojson = {};
		this.parents = [];
	}

	_handleInfo(taxon) {
		this.info = taxon;	
		this.emitChange();
	}

	_handleGeoJson(taxon) {
		this.geojson = taxon.geojson;	
		this.emitChange();
	}

	_handleParents(parents) {
		this.parents = parents;
		this.emitChange();
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
			info    : this.info,
			geojson : this.geojson,
			parents : this.parents
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.info    = state.info;
		this.geojson = state.geojson;
		this.parents = state.parents;
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers  = {
	"RECEIVE_INFO"     : "_handleInfo",
	"RECEIVE_GEOJSON"  : "_handleGeoJson",
	"RECEIVE_PARENTS"  : "_handleParents",
	"RECEIVE_ALL_DATA" : "_handleAllData"
}

export default TaxonStore;
