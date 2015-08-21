import promise from "bluebird"; 
import Immutable from "immutable";
import {api} from "../configs/appConfig";

/**
 * Base class for action
 * @author Jean BOUDET
 */
class PageAction
{
	/**
	 * Return api instance with headers set
	 * @author Jean BOUDET
	 */
	static getApiWithHeaders(headers) {
		api.setHeaders({
			"X-Access-Token": headers.get("token"),
			"X-Client-Id": headers.get("id")
		});
		return api;
	}

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
					if (err.status === 401) {
						context.dispatch("UNAUTHORIZED");
					} else {
						context.dispatch(item.eventError);
					}
				});
			}, 0);
	}
}

export default PageAction;
