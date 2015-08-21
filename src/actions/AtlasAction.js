import Api				from "../utils/Api";
import {atlasActionRequest} from "../configs/routesActions";
import PageAction from "./PageAction";
import promise		from "bluebird"; 

const resource = "taxon";

/**
 * Actions for atlas (get informations and geojson)
 * @author Jean BOUDET
 */
class AtlasAction extends PageAction
{
	/**
	 * A promise for execute multiple GET request
	 * @param context The context
	 * @param payload data
	 */
	static getData(context, payload) {
		let cdnom = payload.cdnom;

		// Get api with headers for auth
		let api = AtlasAction.getApiWithHeaders(payload.auth);
		return AtlasAction.reduce(context, atlasActionRequest(resource, {
			cdnom: cdnom,
			api: api
		}));
	}
}

export default AtlasAction;
