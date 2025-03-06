import dotenv from 'dotenv';
dotenv.config();

const config = {
    dbFile : "activity.db",
    host : "localhost",
    port : 8000,

    db: {
        uri : process.env.DB_URI,
        //port: 27017,
        name: process.env.DB_NAME
    },
    emailConfig: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    },
};

export default config;