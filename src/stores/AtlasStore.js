import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

/**
 * A store for Atlas
 * @author Jean BOUDET
 */
class AtlasStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.current = Immutable.Map();
		this.info = Immutable.Map();
		this.grille10 = Immutable.Map();
		this.photos = Immutable.List();
		this.firstChilds = Immutable.List();
		this.parents = Immutable.List();
		this.phenologie = Immutable.List();
	}

	_handleInfo(info) {
		this.info = info;	
		this.emitChange();
	}

	_handleGrille10(grille10) {
		this.grille10 = grille10;	
		this.emitChange();
	}

	_handlePhotos(photos) {
		this.photos = photos;	
		this.emitChange();
	}

	_handleFirstChilds(firstChilds) {
		this.firstChilds = firstChilds;	
		this.emitChange();
	}

	_handleParents(parents) {
		this.parents = parents;	
		this.emitChange();
	}
	
	_handlePhenologie(phenologie) {
		this.phenologie = phenologie;	
		this.emitChange();
	}

	_handleCurrentAtlas(current) {
		this.current = Immutable.fromJS(current);
		this.emitChange();
	}

	getState() {
		return {
			current: this.current,
			info: this.info,
			photos: this.photos,
			phenologie: this.phenologie,
			grille10: this.grille10,
			parents: this.parents,
			firstChilds: this.firstChilds,
		}
	}
	
	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.current = Immutable.fromJS(state.current);
		this.info = Immutable.fromJS(state.info);
		this.grille10 = Immutable.fromJS(state.grille10);
		this.phenologie = Immutable.fromJS(state.phenologie);
		this.firstChilds = Immutable.fromJS(state.firstChilds);
		this.photos = Immutable.fromJS(state.photos);
		this.parents = Immutable.fromJS(state.parents);
	}
}

AtlasStore.storeName = "AtlasStore";
AtlasStore.handlers = {};
AtlasStore.handlers[Event.ATLAS] = "_handleCurrentAtlas";
AtlasStore.handlers[Event.GRILLE_10] = "_handleGrille10";
AtlasStore.handlers[Event.INFO] = "_handleInfo";
AtlasStore.handlers[Event.PARENTS] = "_handleParents";
AtlasStore.handlers[Event.FIRST_CHILDS] = "_handleFirstChilds";
AtlasStore.handlers[Event.PHENOLOGIE] = "_handlePhenologie";
AtlasStore.handlers[Event.PHOTO] = "_handlePhotos";

export default AtlasStore;
