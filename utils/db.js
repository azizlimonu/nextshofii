import mongoose from "mongoose";

// empty for store some info from db after created
const connection = {};

// how to connected to mongoDb
async function connectDb(){
  if (connection.isConnected) {
    console.log("Already connected.");
    return;
  }

  if(mongoose.connection.length > 0){
    connection.isConnected = mongoose.connections[0].readyState;
    // prevent multiple connect to db
    if (connection.isConnected === 1) {
      console.log("Use previous connection to database.");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
};

// how to disconnect to db after get what we need
// after production we prevent trafic to the db so after connect we disconnected
async function disconnectDb(){
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not diconnecting from the database.");
    }
  }
};


const db = {connectDb, disconnectDb};
export default db;

