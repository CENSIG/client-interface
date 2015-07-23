import Immutable from "immutable";
import Event from "../utils/Event";
import {api} from "../configs/appConfig";

/**
 * Return array of object with:
 *	- event: event for dispatch
 *	- req: request for send
 *	- baseData: data optional
 *	This array is use for taxon action reduce
 * @author Jean BOUDET
 */
export function taxonActionRequest(resource, payload) {
	var cdnom = payload.cdnom;
	var limit = payload.limit;

	return [
		{event: Event.PARENTS, req: api.get(resource, cdnom, "parents", { limit: limit })},
		{event: Event.BROTHERS, baseData: Immutable.Map({cdnom: cdnom}), 
			req: api.get(resource, cdnom, "brothers")
		},
		{event: Event.FIRST_CHILDS, eventError: Event.NOT_FIRST_CHILDS,
			req: api.get(resource, cdnom, "first_child_obs")
		},
		{event: Event.INFO, req: api.get(resource, cdnom, "informations")},
		{event: Event.PHOTO, eventError: Event.NOT_PHOTO, req: api.get(resource, cdnom, "photos")},
		{event: Event.GRILLE_10, eventError: Event.NOT_GRILLE_10, req: api.get(resource, cdnom, "geojson")}
	];
}

/**
 * Return array of object with:
 *	- event: event for dispatch
 *	- req: request for send
 *	- baseData: data optional
 *	This array is use for atlas action reduce
 * @author Jean BOUDET
 */
export function atlasActionRequest(resource, payload) {
	var cdnom = payload.cdnom;

	return [
		{event: Event.PARENTS, req: api.get(resource, cdnom, "parents", { limit: "OR" })},
		{event: Event.FIRST_CHILDS, eventError: Event.NOT_FIRST_CHILDS,
			req: api.get(resource, cdnom, "first_child_obs")
		},
		{event: Event.PHOTO, req: api.get(resource, cdnom, "photos")},
		{event: Event.INFO, req: api.get(resource, cdnom, "informations")},
		{event: Event.GRILLE_10, req: api.get(resource, cdnom, "geojson")}
	];
}
