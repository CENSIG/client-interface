import BaseStore from "fluxible/addons/BaseStore";
import Immutable from "immutable";
import Event from "../utils/Event";

class PhotoStore extends BaseStore
{
	constructor(dispatcher) {
		super(dispatcher);
		this.photos = Immutable.List();
	}

	_handlePhoto(photos) {
		this.photos = photos;	
		this.emitChange();
	}

	_handleNotPhoto() {
		this.photos = Immutable.List();
		this.emitChange();
	}

	getState() {
		return {
			photos: this.photos
		};
	}

	dehydrate() {
		return this.getState();	
	}

	rehydrate(state) {
		this.photos = Immutable.fromJS(state.photos);
	}
}

PhotoStore.storeName = "PhotoStore";
PhotoStore.handlers = {};
PhotoStore.handlers[Event.PHOTO] = "_handlePhoto";
PhotoStore.handlers[Event.NOT_PHOTO] = "_handleNotPhoto";

export default PhotoStore;
