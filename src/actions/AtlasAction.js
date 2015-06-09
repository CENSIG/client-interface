import Api				from "../utils/Api";
import {atlasActionRequest} from "../configs/routesActions";
import BaseAction from "./BaseAction";
import promise		from "bluebird"; 

const api = new Api("taxon");

/**
 * Actions for atlas (get informations and geojson)
 * @author Jean BOUDET
 */
class AtlasAction extends BaseAction
{
	/**
	 * A promise for execute multiple GET request
	 * @param context The context
	 * @param payload data
	 */
	static getData(context, payload) {
		context.dispatch("LOADED", false);
		return AtlasAction.reduce(context, atlasActionRequest(api, payload));
	}
}

export default AtlasAction;
