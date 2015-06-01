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
		this.info    = Immutable.Map();
		this.geojson = Immutable.Map();
	}

	_handleData(data) {
		this.info    = Immutable.fromJS(data[0]);
		this.geojson = Immutable.fromJS(data[1]);
		this.emitChange();
	}

	getInfo() {
		return this.info;	
	}

	getGeoJson() {
		return this.geojson;	
	}

	getState() {
		return {
			info    : this.info,
			geojson : this.geojson
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.info    = Immutable.fromJS(state.info);
		this.geojson = Immutable.fromJS(state.geojson);
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers  = {
	"ATLAS_DATA"        : "_handleData"
}

export default AtlasStore;
