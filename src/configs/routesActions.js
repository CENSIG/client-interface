import Immutable from "immutable";
import Event from "../utils/Event";

/**
 * Return array of object with:
 *	- event: event for dispatch
 *	- req: request for send
 *	- baseData: data optional
 *	This array is use for taxon action reduce
 * @author Jean BOUDET
 */
export function taxonActionRequest(resource, payload) {
	let cdnom = payload.cdnom;
	let api = payload.api;

	return [
		{event: Event.PARENTS, req: api.get(resource, cdnom, "parents")},
		{event: Event.BROTHERS, baseData: Immutable.Map({cdnom: cdnom}), 
			req: api.get(resource, cdnom, "brothers")
		},
		{event: Event.FIRST_CHILDS, eventError: Event.NOT_FIRST_CHILDS,
			req: api.get(resource, cdnom, "first_child_obs")
		},
		{event: Event.PHENOLOGIE, req: api.get(resource, cdnom, "phenologie")},
		{event: Event.ALPHABET_OBS, eventError: Event.NOT_ALPHABET_OBS, req: api.get(resource, cdnom, "observateurs", {
			output: "alphabet"	
		})},
		{event: Event.MONOGRAPHIES, eventError: Event.NOT_MONOGRAPHIES,
			req: api.get(resource, cdnom, "monographies")},
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
	let cdnom = payload.cdnom;
	let api = payload.api;

	return [
		{event: Event.PHOTO, req: api.get(resource, cdnom, "photos")},
		{event: Event.FIRST_CHILDS, eventError: Event.NOT_FIRST_CHILDS,
			req: api.get(resource, cdnom, "first_child_obs")
		},
		{event: Event.PARENTS, req: api.get(resource, cdnom, "parents")},
		{event: Event.INFO, req: api.get(resource, cdnom, "informations")},
		{event: Event.PHENOLOGIE, req: api.get(resource, cdnom, "phenologie")},
		{event: Event.GRILLE_10, req: api.get(resource, cdnom, "geojson")}
	];
}
