import promise from "bluebird"; 
import Immutable from "immutable";
import Event from "../utils/Event";

const resource = "taxon"; 

class ExploreAction
{
	static exploreSubTaxon(context, payload) {
		var api = payload.api;
		var event = (payload.event === "sub") ? Event.EXPLORE_SUB : Event.EXPLORE_SUP;
			context.dispatch(Event.START_REQUEST_EXPLORER);
			context.dispatch(event, payload);
		return api.get(resource, payload.cdnom, "first_child_obs")
		.then(data => {
			context.dispatch(Event.EXPLORE_CHILDS, Immutable.fromJS(data));
		}).catch(err => {
			if (err.status == 401) {
				context.dispatch(Event.UNAUTHORIZED);
			} else {
				context.dispatch(Event.NOT_CHILDS);
			}
		}).finally(() => {
			context.dispatch(Event.END_REQUEST_EXPLORER);
		})
	}
}

export default ExploreAction;
