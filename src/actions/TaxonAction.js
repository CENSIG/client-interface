import Api from "../utils/Api";
import BaseAction from "./BaseAction";
import {taxonActionRequest} from "../configs/routesActions";

const api = new Api("taxon");

/**
 * Actions for taxon (get informations and geojson)
 * @author Jean BOUDET
 */
class TaxonAction extends BaseAction
{
	/**
	 * A promise for execute multiple GET request
	 * @param context The context
	 * @param payload data
	 */
	static getData(context, payload) {
		context.dispatch("LOADED", false);
		return TaxonAction.reduce(context, taxonActionRequest(api, payload));
	}
}

export default TaxonAction;
