import promise from "bluebird"; 
import Immutable from "immutable";

const resource = "taxon"; 

class ExploreAction
{
	static exploreSubTaxon(context, payload) {
		var api = payload.api;
		var event = (payload.event === "sub") ? "EXPLORE_SUB" : "EXPLORE_SUP";
		return promise.resolve(0).then(() => {
			context.dispatch(event, payload);
			return api.get(resource, payload.cdnom, "first_child_obs");
		}).then(data => {
			context.dispatch("EXPLORE_CHILDS", Immutable.fromJS(data));
		}).catch(err => {
			context.dispatch("NOT_CHILDS");
		});
	}
}

export default ExploreAction;
