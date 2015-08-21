/**
 * Action for app authentification
 * @author Jean BOUDET
 */
class AuthAction
{
	static token(context, payload) {
		context.dispatch("ACCESS_TOKEN", payload);
	}
}

export default AuthAction;
