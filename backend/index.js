import express from "express";
import { connection } from "./dbconnection.js";
import router from "./route/route.js";
const app = express();
const PORT = 5000;
// Middleware and routes
app.use('/', router);
const db_URL = "mongodb://Tanu6595:tanu1234@cluster0-shard-00-00.rhw9n.mongodb.net:27017,cluster0-shard-00-01.rhw9n.mongodb.net:27017,cluster0-shard-00-02.rhw9n.mongodb.net:27017/?ssl=true&replicaSet=atlas-aqdvgx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
 // Connect to MongoDB
connection(db_URL);
// Define a route for the root path

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
