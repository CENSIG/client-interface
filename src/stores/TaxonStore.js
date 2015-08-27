import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

import Event from "../utils/Event";

/**
 * A store for Taxon
 * @author Jean BOUDET
 */
class TaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.current     = null;
		this.parents = Immutable.List();
		this.photos = Immutable.List();
		this.grille10 = Immutable.Map();
		this.firstChilds = Immutable.List();
		this.info = Immutable.Map();
		this.phenologie = Immutable.List();
		this.monographies = Immutable.List();
	}

	_handleParents(parents) {
		this.parents = parents;	
		this.emitChange();
	}

	_handlePhotos(photos) {
		this.photos = photos;	
		this.emitChange();
	}

	_handleGrille10(grille10) {
		this.grille10 = grille10;	
		this.emitChange();
	}

	_handleFirstChilds(firstChilds) {
		this.firstChilds = firstChilds;	
		this.emitChange();
	}

	_handleInfo(info) {
		this.info = info;
		this.emitChange();
	}

	_handlePhenologie(phenologie) {
		this.phenologie = phenologie;	
		this.emitChange();
	}

	_handleMonographies(monographies) {
		this.monographies = monographies;	
		this.emitChange();
	}

	_handleCurrent(current) {
		this.current = current;
		this.emitChange();
	}

	getState() {
		return {
			firstChilds: this.firstChilds,
			grille10: this.grille10,
			info: this.info,
			monographies: this.monographies,
			parents: this.parents,
			phenologie: this.phenologie,
			photos: this.photos
		};	
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.firstChilds = Immutable.fromJS(state.firstChilds);
		this.grille10 = Immutable.fromJS(state.grille10);
		this.info = Immutable.fromJS(state.info);
		this.monographies = Immutable.fromJS(state.monographies);
		this.parents = Immutable.fromJS(state.parents);
		this.phenologie = Immutable.fromJS(state.phenologie);
		this.photos = Immutable.fromJS(state.photos);
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers = {};
TaxonStore.handlers[Event.PARENTS] = "_handleParents";
TaxonStore.handlers[Event.PHOTO] = "_handlePhotos";
TaxonStore.handlers[Event.GRILLE_10] = "_handleGrille10";
TaxonStore.handlers[Event.FIRST_CHILDS] = "_handleFirstChilds";
TaxonStore.handlers[Event.INFO] = "_handleInfo";
TaxonStore.handlers[Event.PHENOLOGIE] = "_handlePhenologie";
TaxonStore.handlers[Event.MONOGRAPHIES] = "_handleMonographies";

export default TaxonStore;
