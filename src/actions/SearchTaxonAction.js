import Api from "../utils/Api";

const api = new Api("taxon");

/**
 * An action for taxon search
 * @author Jean BOUDET
 */
class SearchTaxonAction 
{
	/**
	 * Research taxon. The payload contains data
	 * @param content the context
	 * @param payload data
	 */
	static getSearchChild(context, payload) {
		api.get(payload.cdnom, "childs", payload.options)
			.then(function(data) {
				context.dispatch("RECEIVE_RESULTS", data);
			}).catch(err => {
				context.dispatch("NOT_RESULTS", payload.options.q)
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
