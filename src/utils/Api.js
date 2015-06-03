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
		this.uri            = HOST+uri;
		this.requestPending = null;
	}

	/**
	 * Create a GET request
	 *
	 * @param  id			 Identifiant for the resource
	 * @param  option  Specific output for the resource
	 * @return promise
	 */
	get(id, object=null, options=null) {
		var url = this.buildUrl(id, object, options);
		this.requestPending = request.get(url);
		return new Promise(function(resolve, reject) {
			this.requestPending.end(function(err, res) {
					if (err && err.status === 404) {
						reject();
					} else {
						resolve(res.body);
					}
				});
		}.bind(this));
	}

	buildUrl(id, object, options) {
		var url = `${this.uri}/${id}`;
		url += (object) ? `/${object}` : "";
		url += this.extractOption(options);
		return url;
	}

	extractOption(options) {
		if (!options) return "";
		var params = "?";
		var i = 1;
		for (var k in options) {
			params += k + "=" + options[k];
			(i < Object.keys(options).length) ? params += "&" : "";
			i++;
		}
		return params;
	}

	getRequestPending() {
		return this.requestPending;	
	}
}

export default Api;
