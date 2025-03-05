import activityService from '../services/activityServices.js';

const add = async(req, res) => {
    const data = req.body;
    const activity = await activityService.addActivity(data);
    
    if(activity) {
        res.status(201).json(activity)
    } else {
        //console.error(`no activity foun for ID: ${activityId}`)
        res.status(500).json({message: "errore server"});
    } 
};

export default add;