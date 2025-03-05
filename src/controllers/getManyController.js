import activityService from '../services/activityServices.js';

const getMany = async (req, res) => {
     const activities = await activityService.getActivities();
     if(activities) {
        res.status(200).json(activities)
    } else {
        //console.error(`no activity foun for ID: ${activityId}`)
        res.status(404).json({message: 'no activity found'})
    } 
 };

 export default getMany;