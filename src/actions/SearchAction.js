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
				if (err.status === 401) {
					context.dispatch(Event.UNAUTHORIZED);
				} else {
					context.dispatch(Event.NOT_SEARCH_CHILDS, payload.options.q)
				}
			}).finally(() => {
				context.dispatch(Event.END_REQUEST_PENDING);
			});
		context.dispatch(Event.REQUEST_SEARCH_PENDING, api.getRequestPending());
	}

	static getSearchObservateur(context, payload) {
		let {api, cdnom, options} = payload;
		context.dispatch(Event.START_REQUEST_OBSERVATEURS);
		api.get(resource, cdnom, "observateurs", options)
			.then((data) => {
				context.dispatch(Event.SEARCH_OBSERVATEURS, data);	
			}).catch(err => {
				if (err.status === 401) {
					context.dispatch(Event.UNAUTHORIZED);
				}	else {
					context.dispatch(Event.NOT_SEARCH_OBSERVATEURS);
				}
			}).finally(() => {
				//context.dispatch(Event.END_REQUEST_OBSERVATEURS)	
			});
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
