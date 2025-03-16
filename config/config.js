import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME ;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASS;

const config = {
    //dbFile : "activity.db",
    host : "localhost",
    port : 8000,
    db: {
        uri : `mongodb+srv://${dbUser}:${dbPassword}@todolist.e8z0m.mongodb.net/?retryWrites=true&w=majority&appName=${dbName}`,
        //port: 27017,
        //name: dbName
    },
    emailConfig: {
        type: "basic",
        basic: {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPassword
            }
        }
    },
    accessTokenExpiration: 3600,
    refreshTokenExpiration: 86400
};

export default config;