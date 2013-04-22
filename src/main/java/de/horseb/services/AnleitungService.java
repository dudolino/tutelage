package de.horseb.services;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/anleitung")
public class AnleitungService {

	@GET
	@Path("/{id}")
	public Response printMessage(@PathParam("param") String id) {
 
		String result = "Restful example : " + id;
 
		return Response.status(200).entity(result).build();
 
	}
	
}
