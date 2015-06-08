import Api				from "../utils/Api";
import BaseAction from "./BaseAction";
import promise		from "bluebird"; 

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
		return promise.all([
			api.get(cdnom, "informations"),
			api.get(cdnom, "geojson"),
			api.get(cdnom, "first_child_obs", {
				format: "chart"
			})
		]).then(data => {
			context.dispatch("ATLAS_DATA", data);
			context.dispatch("LOADED", true);
		}).catch(err => {
			console.log(err);	
		});
	}
}

export default AtlasAction;
