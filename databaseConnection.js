// databaseConnection.js

const { MongoClient } = require("mongodb");

const is_render = process.env.IS_RENDER || false; 

const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.hwmliaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 

const localURI = "mongodb://127.0.0.1/?authSource=admin&retryWrites=true&w=majority"

async function getConnection() {
  try {
    const uri = is_render ? renderURI : localURI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    await client.connect();
    console.log("Connected to the database");
    
    const database = client.db(); // Get the default database from the MongoDB client
    return database;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
}

module.exports = {
  getConnection: getConnection
};
