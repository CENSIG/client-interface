import promise from "bluebird"; 
import Immutable from "immutable";

/**
 * Base class for action
 * @author Jean BOUDET
 */
class BaseAction
{
	/**
	 * Reduce array of promise
	 * @author Jean BOUDET
	 */
	static reduce(context, arrayRequestAction) {
		return promise.all(arrayRequestAction)
			.call("reduce", (total, item) => {
				return item.req.then(data => {
					var res      = Immutable.fromJS(data);
					var baseData = item.baseData;

					if (baseData) {
						var newRes = baseData.set("res", res);		
						context.dispatch(item.event, newRes);
					} else {
						context.dispatch(item.event, res);
					}
				}).catch(err => {
					context.dispatch(item.eventError);
				});
			}, 0);
	}
}

export default BaseAction;
