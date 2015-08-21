import {api} from "../../configs/appConfig";
import AuthAction from "../../actions/AuthAction";
import {Chance} from "chance"; 
import jws from "jws";
import apiLogin from "../../configs/apiLogin";

const LOGIN = apiLogin.login;
const PASSWORD = apiLogin.password;

/**
 * Send request to get authentification with token
 * @author Jean BOUDET
 */
export const authWithSignature = (req, res, next, context) => {
	let chance = new Chance();
	let token = jws.sign({
		header: { alg: 'HS256' },
		payload: chance.string({length: 5}),
		secret:	chance.string({length: 5}) 
	});
	api.post("login", {login: LOGIN, password: PASSWORD, token: token})
		.then((data) => {
			res.cookie("_id", data.id, {maxAge: 600000, httpOnly: true});
			context.getActionContext().executeAction(AuthAction.token, data);
			next();
		});
}

/**
 * Send request with client id for get token (if client id already exist)
 * @author Jean BOUDET
 */
export const authWithClientId = (req, res, next, context, clientId) => {
	api.post("loginWithId", {login: LOGIN, password: PASSWORD, clientId: clientId})
		.then((data) => {
			context.getActionContext().executeAction(AuthAction.token, {
				id: clientId,
				token: data.token
			});
			next();
		})
		.catch((err) => {
			if (err.status === 401) {

			}	else if (err.status === 404) {
				res.clearCookie("_id");
				authWithSignature(req, res, next, context);		
			}
		});
}
