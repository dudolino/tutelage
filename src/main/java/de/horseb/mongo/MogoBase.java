package de.horseb.mongo;

import java.net.UnknownHostException;
import java.util.LinkedHashMap;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

public class MogoBase {

	private MongoClient client;

	public WriteResult insertOrUpdateDocumentInCollection(
			BasicDBObject document, final String collectionName)
			throws UnknownHostException {
		try {
			parseAndReplaceId(document);
		} finally {
			cleanupConnection();
		}
		return getCollection(collectionName).save(document);

	}

	// TODO bessere Lösung finden
	private void parseAndReplaceId(BasicDBObject document) {
		if (document.get("_id") != null) {
			LinkedHashMap idMap = (LinkedHashMap) document.get("_id");
			System.out.println("update document with id"
					+ document.get("_id").toString());
			String idAttr = (String) idMap.get("$oid");
			document.remove("_id");
			document.remove("id");
			document.append("_id", new ObjectId(idAttr));

		} else {
			System.out.println("create new document");
			document.remove("id");
		}
	}

	public List<DBObject> getAllEntriesInCollection(final String collectionName)
			throws UnknownHostException {
		DBCursor result = null;
		try {
			result = getCollection(collectionName).find();
			return result.toArray();
		} finally {
			if (result != null) {
				result.close();
			}
			cleanupConnection();
		}

	}

	public DBObject getOneByIdInCollection(final String collectionName,
			String id) throws UnknownHostException {
		DBObject result;
		try {
			BasicDBObject query = new BasicDBObject("_id", new ObjectId(id));
			result = getCollection(collectionName).findOne(query);
		} finally {
			cleanupConnection();
		}
		return result;
	}

	private DBCollection getCollection(final String collectionName)
			throws UnknownHostException {
		DBCollection result = getConnection().getCollection(collectionName);
		return result;
	}

	private DB getConnection() throws UnknownHostException {
		client = new MongoClient("localhost", 27017);
		DB db = client.getDB("test");
		// boolean auth = db.authenticate("username", "password".toCharArray());
		return db;
	}

	private void cleanupConnection() {
		if (client != null) {
			client.close();
		}

	}

}
