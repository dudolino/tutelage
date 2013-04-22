package de.horseb.mongo;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;

public class MogoBase {

	public void insertOrUpdateDocumentInCollection(BasicDBObject document,final String collectionName) throws UnknownHostException{
		getCollection(collectionName).save(document);
	}
	
	public DBCursor getAllEntriesInCollection(final String collectionName) throws UnknownHostException{
		DBCursor result = getCollection(collectionName).find();
		return result;
	}
	
	private DBCollection getCollection(final String collectionName) throws UnknownHostException{
		DBCollection result = getConnection().getCollection(collectionName);
		return result;
	}
	
	private DB getConnection() throws UnknownHostException{
		MongoClient client = new MongoClient( "localhost" , 28017 );
		DB db = client.getDB("database name");
		// boolean auth = db.authenticate("username", "password".toCharArray());
		return db;	
	}
}
