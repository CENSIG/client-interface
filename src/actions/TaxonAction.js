import Api from "../utils/Api";
import BaseAction from "./BaseAction";
import {taxonActionRequest} from "../configs/routesActions";

const resource = "taxon";

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
		return TaxonAction.reduce(context, taxonActionRequest(resource, payload));
	}
}

export default TaxonAction;
