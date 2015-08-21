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
		this.headers = null;
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
			let url = this.buildUrl(resource, id, object, options);
			this.requestPending = request.get(url).set(this.headers);
			this.requestPending.end((err, res) => {
					if (err) {
						reject({
							status: err.status,
							message: res.body.error
						});
					} else {
						resolve(res.body);
					}
				});
		});
	}

	post(resource, body, id=null, object=null, options=null) {
		return new promise((resolve, reject) => {
			let url = this.buildUrl(resource, id, object, options);
			this.requestPending = request.post(url).send(body);
			this.requestPending.end((err, res) => {
				if (err) {
					reject(err);	
				}	else {
					resolve(res.body);	
				}
			});
		});
	}

	buildUrl(resource, id, object, options) {
		let url = `${this.baseUri}/${resource}`;
		url += (id) ? `/${id}` : "";
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

	setHeaders(headers) {
		this.headers = headers;	
	}
}

export default Api;
