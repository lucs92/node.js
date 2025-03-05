const dbName = "todolist";
const dbUser = "lucs92";
const dbPassword = "testPassword";

const config = {
    dbFile : "activity.db",
    host : "localhost",
    port : 8000,

    db: {
        uri : `mongodb+srv://${dbUser}:${dbPassword}@todolist.e8z0m.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`,
        //port: 27017,
        name: "todolist"
    }
};

export default config;