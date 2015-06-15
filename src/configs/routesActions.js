import Immutable from "immutable";

/**
 * Return array of object with:
 *	- event: event for dispatch
 *	- req: request for send
 *	- baseData: data optional
 *	This array is use for taxon action reduce
 * @author Jean BOUDET
 */
export function taxonActionRequest(api, payload) {
	var cdnom = payload.cdnom;
	var limit = payload.limit;

	return [
		{event: "TAXON_PARENTS", req: api.get(cdnom, "parents", { limit: limit })},
		{event: "BROTHERS_DATA", baseData: Immutable.Map({cdnom: cdnom}), 
			req: api.get(cdnom, "brothers")
		},
		{event: "TAXON_CHILDS", eventError: "NOT_CHILDS",
			req: api.get(cdnom, "first_child_obs")
		},
		{event: "TAXON_INFORMATIONS", req: api.get(cdnom, "informations")},
		{event: "TAXON_GEOJSON", req: api.get(cdnom, "geojson")}
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
export function atlasActionRequest(api, payload) {
	var cdnom = payload.cdnom;

	return [
		{event: "ATLAS_PARENTS", req: api.get(cdnom, "parents", { limit: "OR" })},
		{event: "ATLAS_CHILDS", eventError: "NOT_CHILDS",
			req: api.get(cdnom, "first_child_obs")
		},
		{event: "ATLAS_INFORMATIONS", req: api.get(cdnom, "informations")},
		{event: "ATLAS_GEOJSON", req: api.get(cdnom, "geojson")}
	];

}
