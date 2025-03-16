import activityService from '../services/activityServices.js';

const getMany = async (req, res) => {
    const userId = req.userId;
    try{
        const activities = await activityService.getActivities(userId);
        res.status(200).json(activities);
    } catch(error) {
        res.status(error.status).json({message: error.message});
    }
 };

 export default getMany;