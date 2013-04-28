package de.horseb.services;

import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

import de.horseb.mongo.MogoBase;

@Path("/rest")
public class AnleitungService {

	private static final String COLLECTION_ANLEITUNGEN = "anleitungen";

	@GET
	@Path("/anleitungen")
	@Produces("application/json")
	public List<DBObject> getAnleitungen() {
		MogoBase mongo = new MogoBase();
		List<DBObject> result = null;
		try {
			result = mongo.getAllEntriesInCollection(COLLECTION_ANLEITUNGEN);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	@GET
	@Path("/anleitungen/{id}")
	@Produces("application/json")
	public DBObject getAnleitung(@PathParam("param") String id) {
		System.out.println("Called getAnleitung by Id " + id);
		MogoBase mongo = new MogoBase();
		DBObject result = null;
		try {
			result = mongo.getOneByIdInCollection(COLLECTION_ANLEITUNGEN, id);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	@POST
	@PUT
	@Path("/anleitungen")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public BasicDBObject createAnleitung(Object o) {
		LinkedHashMap m = (LinkedHashMap) o;
		BasicDBObject b = new BasicDBObject();
		b.putAll(m);
		MogoBase mongo = new MogoBase();
		WriteResult result = null;
		try {
			result = mongo.insertOrUpdateDocumentInCollection(b,
					COLLECTION_ANLEITUNGEN);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return b;
	}

	@POST
	@PUT
	@Path("/anleitungen/{id}")
	@Consumes("application/json")
	public Response updateAnleitung(@PathParam("param") String id,
			DBObject object) {

		String result = "Restful example : " + id;

		return Response.status(200).entity(result).build();

	}

	@DELETE
	@Path("/anleitungen/{id}")
	public Response deleteAnleitung(@PathParam("param") String id) {

		String result = "Restful example : " + id;

		return Response.status(200).entity(result).build();

	}

}
