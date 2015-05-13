import Api				from "../utils/Api";
import TaxonStore from "../stores/TaxonStore";

const api = new Api("taxon");

/**
 * Actions for taxon (get informations and geojson)
 * @author Jean BOUDET
 */
class TaxonAction
{
	static getInfo(cdnom, context) {
		return new Promise(function(resolve, reject) {
			if (context.getStore(TaxonStore).getState().info.id !== cdnom) {
				api.get(cdnom, "informations")
					.then(function(data) {
						resolve(data);
					}, function() {
						reject();
					});
			}
		});
	}
	
	static getGeoJson(cdnom, context) {
		return new Promise(function(resolve, reject) {
			if (context.getStore(TaxonStore).getState().info.id !== cdnom) {
				api.get(cdnom, "geojson")
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
			TaxonAction.getInfo(cdnom, context),
			TaxonAction.getGeoJson(cdnom, context),
		]).then(function(data) {
			context.dispatch("RECEIVE_ALL_DATA", data)
			context.dispatch("LOADED", true);
		});
	}
}

export default TaxonAction;
