import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

/**
 * A store for Atlas
 * @author Jean BOUDET
 */
class AtlasStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.uriName = null;
		this.info    = Immutable.Map();
		this.geojson = Immutable.Map();
	}

	_handleData(data) {
		this.info    = Immutable.fromJS(data[0]);
		this.geojson = Immutable.fromJS(data[1]);
		this.emitChange();
	}

	_handleUriName(uriName) {
		this.uriName = uriName.label;
		this.emitChange();
	}

	getUriName() {
		return this.uriName;	
	}

	getInfo() {
		return this.info;	
	}

	getGeoJson() {
		return this.geojson;	
	}

	getState() {
		return {
			uriName : this.uriName,	
			info    : this.info,
			geojson : this.geojson
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.uriName = state.uriName;
		this.info    = Immutable.fromJS(state.info);
		this.geojson = Immutable.fromJS(state.geojson);
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers  = {
	"ATLAS_DATA"        : "_handleData",
	"CHANGE_ATLAS_NAME" : "_handleUriName"
}

export default AtlasStore;
