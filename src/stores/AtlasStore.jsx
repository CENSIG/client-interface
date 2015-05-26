import BaseStore from "fluxible/addons/BaseStore";

/**
 * A store for Atlas
 * @author Jean BOUDET
 */
class AtlasStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.info    = {};
		this.geojson = {};
	}

	_handleData(data) {
		this.info = data[0];
		this.geojson = data[1];
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
		this.info    = state.info;
		this.geojson = state.geojson;
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers  = {
	"ATLAS_DATA" : "_handleData"
}

export default AtlasStore;
