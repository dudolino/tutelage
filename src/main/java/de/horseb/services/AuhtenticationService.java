package de.horseb.services;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import de.horseb.oauth.OAuthBase;

@Path("/rest")
public class AuhtenticationService {

	@GET
	@Path("/authUrl")
	@Produces(MediaType.TEXT_PLAIN)
	public String getAuthenticationUrl() {
		OAuthBase oauth = new OAuthBase();
		return oauth.getFacebookUrl();
	}

	@POST
	@Path("/auth")
	@Produces("application/json")
	public String getAccessToken(Object o) {
		System.out.println(o.toString());
		OAuthBase oauth = new OAuthBase();
		return oauth.getFacebookAccessToken((String) o).getToken();
	}
}
