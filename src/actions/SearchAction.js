import Event from "../utils/Event";

const resource = "taxon";

/**
 * An action for taxon search
 * @author Jean BOUDET
 */
class SearchAction 
{
	/**
	 * Research taxon. The payload contains data
	 * @param content the context
	 * @param payload data
	 */
	static getSearchChild(context, payload) {
		let api = payload.api;
		api.get(resource, payload.cdnom, "childs", payload.options)
			.then((data) => {
				context.dispatch(Event.SEARCH_CHILDS, data);
			}).catch(err => {
				context.dispatch(Event.NOT_SEARCH_CHILDS, payload.options.q)
			}).finally(() => {
				context.dispatch(Event.END_REQUEST_PENDING);
			});
		context.dispatch(Event.REQUEST_SEARCH_PENDING, api.getRequestPending());
	}

	/**
	 * Reset the search
	 * @param context the context
	 * @param payload data
	 */
	static resetSearch(context, payload) {
		context.dispatch(Event.RESET_SEARCH_CHILDS, payload);
	}
}

export default SearchAction;
