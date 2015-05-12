import Api				from "../utils/Api";
import TaxonStore from "../stores/TaxonStore";

var api = new Api("taxon");

function getInfo(cdnom, context) {
	return new Promise(function(resolve, reject) {
		if (context.getStore(TaxonStore).getState().info.id !== cdnom) {
			api.get(cdnom, "informations")
				.then(function(data) {
					resolve(data);
				}, function() {
					reject();
				})
		}
	});
}

function getGeoJson(cdnom, context) {
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

export function getAll(context, payload) {
	var cdnom = payload.get("cdnom");

	if (context.getStore(TaxonStore).getState().info.id !== cdnom) {
		context.dispatch("LOADED", false);
	} 

	return Promise.all([
		getInfo(cdnom, context),
		getGeoJson(cdnom, context),
	]).then(function(data) {
		context.dispatch("RECEIVE_ALL_DATA", data)
		context.dispatch("LOADED", true);
	});
}
