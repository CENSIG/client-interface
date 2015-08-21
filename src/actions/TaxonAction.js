import Api from "../utils/Api";
import PageAction from "./PageAction";
import {taxonActionRequest} from "../configs/routesActions";

const resource = "taxon";

/**
 * Actions for taxon (get informations and geojson)
 * @author Jean BOUDET
 */
class TaxonAction extends PageAction
{
	/**
	 * A promise for execute multiple GET request
	 * @param context The context
	 * @param payload data
	 */
	static getData(context, payload) {
		let cdnom = payload.cdnom;
		let api = TaxonAction.getApiWithHeaders(payload.auth);
		return TaxonAction.reduce(context, taxonActionRequest(resource, {
			cdnom: cdnom,
			api: api
		}));
	}
}

export default TaxonAction;
