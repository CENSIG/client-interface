import Api				from "../utils/Api";

const api = new Api("taxon");

/**
 * Actions for atlas (get informations and geojson)
 * @author Jean BOUDET
 */
class AtlasAction
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
		context.dispatch("LOADED", false);
		return Promise.all([
			AtlasAction.get(cdnom, "informations"),
			AtlasAction.get(cdnom, "geojson")
		]).then(function(data) {
			context.dispatch("ATLAS_DATA", data);
			context.dispatch("LOADED", true);
		});
	}
}

export default AtlasAction;
