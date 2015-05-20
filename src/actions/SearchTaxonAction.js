import Api from "../utils/Api";

var api = new Api("taxon");

/**
 * An action for taxon search
 * @author Jean BOUDET
 */
class SearchTaxonAction
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
	 * Research taxon. The payload contains data
	 * @param content the context
	 * @param payload data
	 */
	static getSearchChild(context, payload) {
		SearchTaxonAction.get(payload.id, "childs", payload.options)
			.then(function(data) {
				context.dispatch("RECEIVE_RESULTS", data);
			});
		context.dispatch("REQUEST_SEARCH_PENDING", api.getRequestPending());
	}

	/**
	 * Reset the search
	 * @param context the context
	 * @param payload data
	 */
	static resetSearch(context, payload) {
		context.dispatch("RESET_SEARCH", payload);
	}
}

export default SearchTaxonAction;
