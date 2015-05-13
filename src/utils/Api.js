import request from "superagent";

const IP   = (process.env.BROWSER) ? "127.0.0.1" : process.env.API_PORT_9000_TCP_ADDR;
const PORT = process.env.API_PORT_9000_TCP_PORT || 9000;
const HOST = `http://${IP}:${PORT}/apiv1/`;

/**
 * A class for manage request with API
 * @author Jean BOUDET
 */
class Api
{
	/**
	 * @param uri The name of resource
	 */
	constructor(uri) {
		this.uri = HOST+uri;	
	}

	/**
	 * Create a GET request
	 *
	 * @param  id			 Identifiant for the resource
	 * @param  option  Specific output for the resource
	 * @return promise
	 */
	get(id, option=null) {
		var url =	(option) ? `${this.uri}/${id}/${option}` : `${this.uri}/${id}`;
		return new Promise(function(resolve, reject) {
			request
				.get(url)
				.end(function(err, res) {
					if (err && err.status === 404) {
						reject();
					} else {
						resolve(res.body);
					}
				});
		}.bind(this));
	}
}

export default Api;
