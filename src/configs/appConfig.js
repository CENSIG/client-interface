import Api from "../utils/Api";

/**
 * Configuration for application
 * @author Jean BOUDET
 */
export default {
	"api": new Api({
		"ip"   : (process.env.BROWSER) ? "127.0.0.1" : process.env.API_PORT_9000_TCP_ADDR,
		"port" : 9000,
		"name" : "apiv1"
	}),

	"atlas": {
		"papillons": {
			"cdnom":"185214",
			"limit": "OR"
		}
	},

	"template": "base"
};
