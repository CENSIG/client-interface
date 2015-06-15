import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

class ExploreSubTaxonStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.parents     = Immutable.List();
		this.firstChilds = Immutable.List();
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
		console.log(stop.cdnom);
		this.parents = parents.reverse().skipUntil(parent => {
			return parent.get("cdnom") === stop.cdnom;
		}).reverse();
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

ExploreSubTaxonStore.storeName = "ExploreSubTaxonStore";
ExploreSubTaxonStore.handlers  = {
	"TAXON_PARENTS"  : "_handleExploreParents",
	"ATLAS_PARENTS"  : "_handleExploreParents",
	"TAXON_CHILDS"   : "_handleExploreChilds",
	"ATLAS_CHILDS"   : "_handleExploreChilds",
	"EXPLORE_CHILDS" : "_handleExploreChilds",
	"EXPLORE_SUB"    : "_handleExploreSub",
	"EXPLORE_SUP"    : "_handleExploreSup"
};

export default ExploreSubTaxonStore;

