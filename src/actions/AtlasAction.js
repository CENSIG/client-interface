import Api				from "../utils/Api";
import BaseAction from "./BaseAction";

const api = new Api("taxon");

/**
 * Actions for atlas (get informations and geojson)
 * @author Jean BOUDET
 */
class AtlasAction extends BaseAction
{
	/**
	 * A promise for execute multiple GET request
	 * @param context The context
	 * @param payload data
	 */
	static getData(context, payload) {
		var cdnom = payload.cdnom;
		context.dispatch("LOADED", false);
		return Promise.all([
			AtlasAction.get(api, cdnom, "informations"),
			AtlasAction.get(api, cdnom, "geojson"),
			AtlasAction.get(api, cdnom, "first_child_obs", {
				format: "chart"
			})
		]).then(function(data) {
			context.dispatch("ATLAS_DATA", data);
			context.dispatch("LOADED", true);
		});
	}
}

export default AtlasAction;
