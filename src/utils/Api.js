import request from "superagent";

const IP   = (process.env.BROWSER) ? "127.0.0.1" : process.env.API_PORT_9000_TCP_ADDR;
const PORT = process.env.API_PORT_9000_TCP_PORT || 9000;
const HOST = `http://${IP}:${PORT}/apiv1/`;

class Api
{
	constructor(uri) {
		this.uri = HOST+uri;	
	}

	get(resource, options) {
		var url =	`${this.uri}/${resource}/${options}`;
		return new Promise(function(resolve, reject) {
			request
				.get(url)
				.end(function(err, res) {
					if (err && err.status === 404) {
						reject();
					} else {
						resolve(res.body);
					}
				})
		}.bind(this));
	}
}

export default Api;
