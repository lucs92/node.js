const http = require("http"); 
const express = require("express");
const app = express();
const dbFile = "activity.db";
const fs = require("fs");
const { get } = require("https");

const host = "localhost";
const port = 8000;

app.use(express.json());

const createId = () => {
    if (!fs.existsSync(dbFile)) {
        fs.openSync(dbFile, "w");
    }
    const content = fs.readFileSync(dbFile);
    const activities = content.toString().split("\n");
    const last = activities[activities.length - 2];
    if (last && last !== "" ){
       return JSON.parse(last).id + 1;
    }
    return 1; 
}

const addActivity = (req, res) => {
    console.log("Rec!", req.body)
    const data = req.body;
    data.status = 'open';
    data.createdAt = new Date().getTime();
    data.updatedAt = data.createdAt;
    data.id = createId();
    fs.appendFileSync(dbFile, JSON.stringify(data)+"\n");
    return res.status(201).json(data);
}

const getActivities = (req, res) => {
    if (!fs.existsSync(dbFile)) {
        return res.json([]);
    }
    const content = fs.readFileSync(dbFile);
    const activities = content.toString().trim().split("\n").map(item => JSON.parse(item)); 
    return res.json(activities);
}

const getActivity = (req, res) => {
    if (!fs.existsSync(dbFile)) {
        return res.status(404).json({});
    }
    const content = fs.readFileSync(dbFile);
    const activities = content.toString().trim().split("\n").map(item => JSON.parse(item));
    const activity = activities.find(item => item.id == req.params.id);
    return activity ? res.json(activity) : res.status(404).json(); 
}

app.get("/", getActivities);
app.post("/",addActivity);
app.get('/:id', getActivity);
//const server = http.createServer(requestListener);
app.listen(port, host, () => {
    console.log(`Server partito su http://${host}:${port}`);
});