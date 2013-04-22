package de.horseb.services;

import java.net.UnknownHostException;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.mongodb.DBCursor;
import com.mongodb.DBObject;

import de.horseb.mongo.MogoBase;

@Path("/anleitung")
public class AnleitungService {

	@GET
	@Path("/getAll")
	@Produces("application/json")
	public List<DBObject> getAnleitungen() {
		MogoBase mongo = new MogoBase();
		DBCursor result = null;
		try {
			result = mongo.getAllEntriesInCollection("things");
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		StringBuffer sb = new StringBuffer();
		// while (result.hasNext()) {
		// sb.append(result.toString());
		// }
		return result.toArray();
	}

	@GET
	@Path("/{id}")
	public Response getAnleitung(@PathParam("param") String id) {

		String result = "Restful example : " + id;

		return Response.status(200).entity(result).build();

	}

}
