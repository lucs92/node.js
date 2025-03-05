import config from './config/config.js';
import express, { json } from "express";
const app = express();
import setup from './src/routes/activityRoutes.js';
import connectDB from './src/gatawey/db.js';

app.use(json());

try {
    await connectDB(config.db.uri);
    setup(app);
    //const server = http.createServer(requestListener);
    app.listen(config.port, config.host, () => {
        console.log(`Server partito su http://${config.host}:${config.port}`);
    }); 
}
catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
}
