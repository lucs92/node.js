import activityService from '../services/activityServices.js';

const add = async(req, res) => {
    const data = {...req.body, userId:req.userId};
    const activity = await activityService.addActivity(data);
    
    if(activity) {
        res.status(201).json(activity)
    } else {
        res.status(500).json({message: "Server error"});
    } 
};

export default add;