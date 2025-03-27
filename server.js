import config from './config/config.js';
import express, { json } from "express";
import setup from './src/routes/activityRoutes.js';
import connectDB from './src/gataway/db.js';

const app = express();
app.use(json());

try {
    await connectDB(config.db.url);
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

export default app;