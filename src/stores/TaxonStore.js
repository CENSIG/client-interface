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
	}

	_handleCurrent(current) {
		this.current = current;
		this.emitChange();
	}
}

TaxonStore.storeName = "TaxonStore";
TaxonStore.handlers = {};

export default TaxonStore;
