import request from "superagent";
import promise from "bluebird"; 

/**
 * A class for manage request with API
 * @author Jean BOUDET
 */
class Api
{
	/**
	 * @param params object with (ip, port, name)
	 */
	constructor(params) {
		this.baseUri        = `http://${params.ip}:${params.port}/${params.name}`;
		this.requestPending = null;
	}

	/**
	 * Create a GET request
	 *
	 * @param  id			 Identifiant for the resource
	 * @param  option  Specific output for the resource
	 * @return promise
	 */
	get(resource, id, object=null, options=null) {
		return new promise((resolve, reject) => {
			var url = this.buildUrl(resource, id, object, options);
			this.requestPending = request.get(url);
			this.requestPending.end((err, res) => {
				if (err) {
					reject(res.body.error);
				} else {
					resolve(res.body);
				}
			});
		});
	}

	buildUrl(resource, id, object, options) {
		var url = `${this.baseUri}/${resource}/${id}`;
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
