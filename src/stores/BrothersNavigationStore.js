import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";

/**
 * A store for manage brothers navigation
 * @author Jean BOUDET
 */
class BrothersNavigationStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);	
		this.current = null;
		this.left    = null;
		this.right   = null;
	}

	/**
	 * Retrieve and store the index for navigation
	 * left and right
	 */
	_handleBrothers(data) {
		var brothers     = Immutable.fromJS(data.brothers);
		var cdnom        = data.cdnom;
		var currentIndex = brothers.findIndex(value => {
			return value.get("cdnom") === cdnom;
		});
		var last = brothers.size - 1;
		var left  = currentIndex - 1;
		var right = currentIndex + 1;

		if (currentIndex === 0) {
			left = last 
		} else if (currentIndex === last) {
			right = 0;
		}
		
		this.left    = left;
		this.right   = right;
		this.current = currentIndex;
		this.emitChange();
	}

	getState() {
		return {
			left    : this.left,
			right   : this.right,
			current : this.current
		};	
	}

	dehydrate() {
		return this.getState();			
	}

	rehydrate(state) {
		this.left    = state.left;
		this.right   = state.right;
		this.current = state.current;
	}
}

BrothersNavigationStore.storeName = "BrothersNavigationStore";
BrothersNavigationStore.handlers  = {
	"BROTHERS_DATA" : "_handleBrothers"
};

export default BrothersNavigationStore;
