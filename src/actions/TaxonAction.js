import Api from "../utils/Api";
import BaseAction from "./BaseAction";

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

		return Promise.all([
			TaxonAction.get(api, cdnom, "informations"),
			TaxonAction.get(api, cdnom, "geojson"),
			TaxonAction.get(api, cdnom, "parents", { limit: limit })
		]).then(function(data) {
			context.dispatch("ESPECE_DATA", data)
			context.dispatch("LOADED", true);
		});
	}
}

export default TaxonAction;
