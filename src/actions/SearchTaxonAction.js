import Api from "../utils/Api";
import BaseAction from "./BaseAction";

const api = new Api("taxon");

/**
 * An action for taxon search
 * @author Jean BOUDET
 */
class SearchTaxonAction extends BaseAction
{
	/**
	 * Research taxon. The payload contains data
	 * @param content the context
	 * @param payload data
	 */
	static getSearchChild(context, payload) {
		SearchTaxonAction.get(api, payload.cdnom, "childs", payload.options)
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
