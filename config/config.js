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
    },
    emailConfig: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "lucasannagst@gmail.com",
            pass: "testPassword"
        }
    },
};

export default config;