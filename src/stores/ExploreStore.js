import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import ParentsStore from "./ParentsStore";
import FirstChildsStore from "./FirstChildsStore";
import Event from "../utils/Event";

class ExploreStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.parents     = Immutable.List();
		this.firstChilds = Immutable.List();
	}

	_handleExploreParents(parents) {
		this.dispatcher.waitFor(ParentsStore, () => {
			this.parents = parents; 
			this.emitChange(); 
		});
	}

	_handleExploreChilds(firstChilds) {
		this.dispatcher.waitFor(FirstChildsStore, () => {
			this.firstChilds = firstChilds;
			this.emitChange();
		});
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

	getState() {
		return {
			parents  : this.parents,
			firstChilds : this.firstChilds
		}	
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.parents  = Immutable.fromJS(state.parents);
		this.firstChilds = Immutable.fromJS(state.firstChilds);
	}
	
}

ExploreStore.storeName = "ExploreStore";
ExploreStore.handlers  = {
	"EXPLORE_CHILDS" : "_handleExploreChilds",
	"EXPLORE_SUB"    : "_handleExploreSub",
	"EXPLORE_SUP"    : "_handleExploreSup",
	"NOT_CHILDS"		 : "_handleNotChilds"
};
ExploreStore.handlers[Event.PARENTS] = "_handleExploreParents";
ExploreStore.handlers[Event.FIRST_CHILDS] = "_handleExploreChilds";
ExploreStore.handlers[Event.NOT_FIRST_CHILDS] = "_handleNotChilds";

export default ExploreStore;

