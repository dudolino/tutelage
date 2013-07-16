package de.horseb.oauth;

import org.scribe.builder.ServiceBuilder;
import org.scribe.builder.api.FacebookApi;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Token;
import org.scribe.model.Verb;
import org.scribe.model.Verifier;
import org.scribe.oauth.OAuthService;

public class OAuthBase implements OauthConstants {

	private static final Token EMPTY_TOKEN = null;

	public String getFacebookUrl() {
		OAuthService service = getFacebookService();
		String authURL = service.getAuthorizationUrl(EMPTY_TOKEN);
		return authURL;
	}

	public Token getFacebookAccessToken(String code) {
		OAuthService service = getFacebookService();
		Verifier verifier = new Verifier(code);
		return service.getAccessToken(EMPTY_TOKEN, verifier);
	}

	public void getFacebookUser(Token accessToken) {
		OAuthRequest request = new OAuthRequest(Verb.GET, FACEBOOK_USER_URL);
		OAuthService service = getFacebookService();
		service.signRequest(accessToken, request);
		Response response = request.send();
		System.out.println(response.getCode());
		System.out.println(response.getBody());
	}

	public boolean isUserAuthenticated(Token accessToken) {
		OAuthRequest request = new OAuthRequest(Verb.GET, FACEBOOK_USER_URL);
		OAuthService service = getFacebookService();
		service.signRequest(accessToken, request);
		Response response = request.send();
		return response.isSuccessful();
	}

	private OAuthService getFacebookService() {
		OAuthService service = new ServiceBuilder().provider(FacebookApi.class)
				.apiKey(FACEBOOK_APP_KEY).apiSecret(FACEBOOK_SECRET_KEY)
				.callback(CALLBACK_URL_TEST).build();
		return service;
	}
}
