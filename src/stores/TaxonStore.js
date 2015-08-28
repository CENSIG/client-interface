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
		this.parents = Immutable.List();
		this.photos = Immutable.List();
		this.grille10 = Immutable.Map();
		this.firstChilds = Immutable.List();
		this.info = Immutable.Map();
		this.phenologie = Immutable.List();
		this.monographies = Immutable.List();
		this.alphabetObservateurs = Immutable.List();
		this.alphabetCommunes = Immutable.List();
	}

	_handleParents(parents) {
		this.parents = parents;	
		this.emitChange();
	}

	_handlePhotos(photos) {
		this.photos = photos;	
		this.emitChange();
	}

	_handleNotPhotos() {
		this.photos = Immutable.List();	
		this.emitChange();
	}

	_handleGrille10(grille10) {
		this.grille10 = grille10;	
		this.emitChange();
	}

	_handleNotGrille10() {
		this.grille10 = Immutable.Map();	
		this.emitChange();
	}

	_handleFirstChilds(firstChilds) {
		this.firstChilds = firstChilds;	
		this.emitChange();
	}

	_handleNotFirstChilds() {
		this.firstChilds = Immutable.List();	
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

	_handleNotMonographies() {
		this.monographies = Immutable.List();	
		this.emitChange();
	}

	_handleAlphabetObservateurs(alphabet) {
		this.alphabetObservateurs = alphabet;	
		this.emitChange();
	}

	_handleNotAlphabetObservateurs() {
		this.alphabetObservateurs = Immutable.List();	
		this.emitChange();
	}

	_handleAlphabetCommunes(alphabet) {
		this.alphabetCommunes = alphabet;	
		this.emitChange();
	}

	_handleNotAlphabetCommunes() {
		this.alphabetCommunes = Immutable.List();	
		this.emitChange();
	}
	getState() {
		return {
			alphabetObservateurs: this.alphabetObservateurs,
			alphabetCommunes: this.alphabetCommunes,
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
		this.alphabetObservateurs = Immutable.fromJS(state.alphabetObservateurs);
		this.alphabetCommunes = Immutable.fromJS(state.alphabetCommunes);
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
TaxonStore.handlers[Event.ALPHABET_OBS] = "_handleAlphabetObservateurs";
TaxonStore.handlers[Event.NOT_ALPHABET_OBS] = "_handleNotAlphabetObservateurs";
TaxonStore.handlers[Event.ALPHABET_COMMUNES] = "_handleAlphabetCommunes";
TaxonStore.handlers[Event.NOT_ALPHABET_COMMUNES] = "_handleNotAlphabetCommunes";
TaxonStore.handlers[Event.NOT_PHOTO] = "_handleNotPhotos";
TaxonStore.handlers[Event.NOT_GRILLE_10] = "_handleNotGrille10";
TaxonStore.handlers[Event.NOT_FIRST_CHILDS] = "_handleNotFirstChilds";
TaxonStore.handlers[Event.NOT_MONOGRAPHIES] = "_handleNotMonographies";

export default TaxonStore;
