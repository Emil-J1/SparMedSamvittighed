const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const uri = "mongodb+srv://samvittighed:test@cluster0.a3tipib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected!");
    // Perform database operations here using the `client` object
    
    // Example: Closing the connection
    await client.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();