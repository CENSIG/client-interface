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
		this.current     = null;
		this.info        = Immutable.Map();
		this.geojson     = Immutable.Map();
		this.parents     = Immutable.List();
		this.firstChilds = Immutable.List();
	}

	_handleInfo(info) {
		this.info = info;
		this.emitChange();
	}

	_handleGeojson(geojson) {
		this.geojson = geojson;
		this.emitChange();
	}

	_handleParents(parents) {
		this.parents = parents;
		this.emitChange();
	}

	_handleChilds(childs) {
		this.firstChilds = childs;
		this.emitChange();
	}

	_handleCurrent(current) {
		this.current = current;
		this.emitChange();
	}

	_handleNotChilds() {
		this.firstChilds = Immutable.List();
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
			current			: this.current,
			info        : this.info,
			geojson     : this.geojson,
			parents     : this.parents,
			firstChilds : this.firstChilds
		}	
	}

	dehydrate() {
		return this.getState();
	}

	rehydrate(state) {
		this.current		 = state.current;
		this.info        = Immutable.fromJS(state.info);
		this.geojson     = Immutable.fromJS(state.geojson);
		this.parents     = Immutable.fromJS(state.parents);
		this.firstChilds = Immutable.fromJS(state.firstChilds);
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers  = {
	"TAXON_CURRENT": "_handleCurrent",
	"TAXON_INFORMATIONS": "_handleInfo",
	"TAXON_GEOJSON": "_handleGeojson",
	"TAXON_CHILDS": "_handleChilds",
	"TAXON_PARENTS": "_handleParents",
	"NOT_CHILDS": "_handleNotChilds"
}

export default TaxonStore;
