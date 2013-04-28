package de.horseb.mongo;

import java.net.UnknownHostException;
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

	public WriteResult insertOrUpdateDocumentInCollection(
			BasicDBObject document, final String collectionName)
			throws UnknownHostException {
		return getCollection(collectionName).save(document);
	}

	public List<DBObject> getAllEntriesInCollection(final String collectionName)
			throws UnknownHostException {
		DBCursor result = null;
		try {
			result = getCollection(collectionName).find();
		} finally {
			if (result != null) {
				result.close();
			}
		}
		return result.toArray();

	}

	public DBObject getOneByIdInCollection(final String collectionName,
			String id) throws UnknownHostException {
		BasicDBObject query = new BasicDBObject("_id", new ObjectId(id));
		DBObject result = getCollection(collectionName).findOne(query);
		return result;
	}

	private DBCollection getCollection(final String collectionName)
			throws UnknownHostException {
		DBCollection result = getConnection().getCollection(collectionName);
		return result;
	}

	private DB getConnection() throws UnknownHostException {
		MongoClient client = new MongoClient("localhost", 27017);
		DB db = client.getDB("test");
		// boolean auth = db.authenticate("username", "password".toCharArray());
		return db;
	}

}
