import Api from "../utils/Api";

const api = new Api("taxon");

/**
 * Actions for taxon (get informations and geojson)
 * @author Jean BOUDET
 */
class TaxonAction
{
	/**
	 * A promise for GET request
	 * @param cdnom		identifiant
	 * @param object	output
	 * @param options request parameters
	 * @return promise
	 */
	static get(cdnom, object, options=null) {
		return new Promise(function(resolve, reject) {
			api.get(cdnom, object, options)
				.then(function(data) {
					resolve(data);
				}, function() {
					reject();
				});
		});
	}

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
			TaxonAction.get(cdnom, "informations"),
			TaxonAction.get(cdnom, "geojson"),
			TaxonAction.get(cdnom, "parents", { limit: limit })
		]).then(function(data) {
			context.dispatch("ESPECE_DATA", data)
			context.dispatch("LOADED", true);
		});
	}
}

export default TaxonAction;
