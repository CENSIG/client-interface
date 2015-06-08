/**
 * A class for action. Contain the main method
 * for an action class
 * @author Jean BOUDET
 */
class BaseAction
{
	/**
	 * A promise for GET request
	 * @param cdnom		identifiant
	 * @param object	output
	 * @param options request parameters
	 * @return promise
	 */
	static get(api, cdnom, object, options=null) {
		return api.get(cdnom, object, options);
	}
}

export default BaseAction;
