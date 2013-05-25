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
	public String getAnleitungen() {
		System.out.println("Called getAnleitung");
		MogoBase mongo = new MogoBase();
		List<DBObject> result = null;
		try {
			result = mongo.getAllEntriesInCollection(COLLECTION_ANLEITUNGEN);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result.toString();
	}

	@GET
	@Path("/anleitungen/{id}")
	@Produces("application/json")
	public String getAnleitung(@PathParam("id") String id) {
		System.out.println("Called getAnleitung by Id " + id);
		MogoBase mongo = new MogoBase();
		DBObject result = null;
		try {
			result = mongo.getOneByIdInCollection(COLLECTION_ANLEITUNGEN, id);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result.toString();
	}

	@POST
	@PUT
	@Path("/anleitungen")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String createAnleitung(Object o) {
		System.out.println("createAnleitung called");
		return updateOrCreateAnleitung(o);
	}

	@POST
	@PUT
	@Path("/anleitungen/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String updateAnleitung(@PathParam("id") String id, Object o) {
		System.out.println("updateAnleitung called with " + id);
		return updateOrCreateAnleitung(o);

	}

	@DELETE
	@Path("/anleitungen/{id}")
	public boolean deleteAnleitung(@PathParam("id") String id) {

		String result = "Restful example : " + id;

		return false;

	}

	private String updateOrCreateAnleitung(Object o) {
		LinkedHashMap m = (LinkedHashMap) o;
		BasicDBObject b = new BasicDBObject();
		b.putAll(m);
		System.out.println("updateOrCreateAnleitung called with "
				+ b.toString());
		MogoBase mongo = new MogoBase();
		WriteResult result = null;
		try {
			result = mongo.insertOrUpdateDocumentInCollection(b,
					COLLECTION_ANLEITUNGEN);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return b.toString();
	}

}
