import Api from "../utils/Api";
import BaseAction from "./BaseAction";
import promise		from "bluebird"; 

const api = new Api("taxon");

/**
 * Actions for taxon (get informations and geojson)
 * @author Jean BOUDET
 */
class TaxonAction extends BaseAction
{
	/**
	 * A promise for execute multiple GET request
	 * @param context The context
	 * @param payload data
	 */
	static getData(context, payload) {
		var cdnom = payload.cdnom;
		var limit = payload.limit;
		context.dispatch("LOADED", false);

		return promise.all([
			api.get(cdnom, "informations"),
			api.get(cdnom, "geojson"),
			api.get(cdnom, "parents", { limit: limit }),
			api.get(cdnom, "brothers"),
			api.get(cdnom, "first_child_obs", {
				format: "chart"
			})
		]).then(function(data) {
			context.dispatch("BROTHERS_DATA", { brothers: data[3], cdnom: cdnom });
			context.dispatch("ESPECE_DATA", data);
			context.dispatch("LOADED", true);
		}).catch(err => {
			console.log(err);	
		});
	}
}

export default TaxonAction;
