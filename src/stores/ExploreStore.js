import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class ExploreStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.parents     = Immutable.List();
		this.firstChilds = Immutable.List();
		this.pendingRequest = false;
	}

	_handleExploreParents(parents) {
		this.parents = parents; 
		this.emitChange(); 
	}

	_handleExploreChilds(firstChilds) {
		this.firstChilds = firstChilds;
		this.emitChange();
	}

	_handleExploreSub(add) {
		var parents = this.parents;
		this.parents = parents.push(Immutable.fromJS(add));
		this.emitChange();
	}

	_handleExploreSup(stop) {
		var parents = this.parents;
		this.parents = parents.reverse().skipUntil(parent => {
			return parent.get("cdnom") === stop.cdnom;
		}).reverse();
		this.emitChange();
	}

	_handleNotChilds() {
		this.firstChilds = Immutable.List();	
		this.emitChange();
	}

	_handleStart() {
		this.pendingRequest = true;	
		this.emitChange();
	}

	_handleEnd() {
		this.pendingRequest = false;	
		this.emitChange();
	}

	getState() {
		return {
			parents  : this.parents,
			firstChilds : this.firstChilds,
			pendingRequest: this.pendingRequest
		}	
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.parents  = Immutable.fromJS(state.parents);
		this.firstChilds = Immutable.fromJS(state.firstChilds);
		this.pendingRequest = state.pendingRequest;
	}
	
}

ExploreStore.storeName = "ExploreStore";
ExploreStore.handlers  = {};

ExploreStore.handlers[Event.PARENTS] = "_handleExploreParents";
ExploreStore.handlers[Event.FIRST_CHILDS] = "_handleExploreChilds";
ExploreStore.handlers[Event.NOT_FIRST_CHILDS] = "_handleNotChilds";
ExploreStore.handlers[Event.START_REQUEST_EXPLORER] = "_handleStart";
ExploreStore.handlers[Event.EXPLORE_CHILDS] = "_handleExploreChilds";
ExploreStore.handlers[Event.EXPLORE_SUB] = "_handleExploreSub";
ExploreStore.handlers[Event.EXPLORE_SUP] = "_handleExploreSup";
ExploreStore.handlers[Event.END_REQUEST_EXPLORER] = "_handleEnd";
ExploreStore.handlers[Event.NOT_CHILDS] = "_handleNotChilds";

export default ExploreStore;

