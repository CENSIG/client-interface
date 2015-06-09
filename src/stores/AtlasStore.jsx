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
		this.current     = null;
		this.info        = Immutable.Map();
		this.geojson     = Immutable.Map();
		this.firstChilds = Immutable.List();
	}

	_handleCurrent(current) {
		this.current = current;
		this.emitChange();
	}

	_handleChilds(childs) {
		this.firstChilds = childs;
		this.emitChange();
	}

	_handleInfo(info) {
		this.info = info;	
		this.emitChange();
	}

	_handleGeojson(geojson) {
		this.geojson = geojson;
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
			current     : this.current,
			info        : this.info,
			geojson     : this.geojson,
			firstChilds : this.firstChilds
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.current     = state.current;
		this.info        = Immutable.fromJS(state.info);
		this.geojson     = Immutable.fromJS(state.geojson);
		this.firstChilds = Immutable.fromJS(state.firstChilds);
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers  = {
	"ATLAS_CURRENT": "_handleCurrent",
	"ATLAS_CHILDS": "_handleChilds",
	"ATLAS_INFORMATIONS": "_handleInfo",
	"ATLAS_GEOJSON": "_handleGeojson"
}

export default AtlasStore;
