package de.horseb.mongo;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

public class MogoBase {

	public WriteResult insertOrUpdateDocumentInCollection(
			BasicDBObject document, final String collectionName)
			throws UnknownHostException {
		return getCollection(collectionName).save(document);
	}

	public DBCursor getAllEntriesInCollection(final String collectionName)
			throws UnknownHostException {
		DBCursor result = getCollection(collectionName).find();
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
