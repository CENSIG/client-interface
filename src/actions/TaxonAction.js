import Api				from "../utils/Api";
import TaxonStore from "../stores/TaxonStore";

const api = new Api("taxon");

/**
 * Actions for taxon (get informations and geojson)
 * @author Jean BOUDET
 */
class TaxonAction
{
	static get(cdnom, context, option) {
		return new Promise(function(resolve, reject) {
			if (context.getStore(TaxonStore).getState().info.id !== cdnom) {
				api.get(cdnom, option)
					.then(function(data) {
						resolve(data);
					}, function() {
						reject();
					});
			}
		});
	}

	static getAll(context, payload) {
		var cdnom = payload.get("cdnom");

		if (context.getStore(TaxonStore).getState().info.id !== cdnom) {
			context.dispatch("LOADED", false);
		} 

		return Promise.all([
			TaxonAction.get(cdnom, context, "informations"),
			TaxonAction.get(cdnom, context, "geojson"),
			TaxonAction.get(cdnom, context, "parents")
		]).then(function(data) {
			context.dispatch("RECEIVE_ALL_DATA", data)
			context.dispatch("LOADED", true);
		});
	}
}

export default TaxonAction;
