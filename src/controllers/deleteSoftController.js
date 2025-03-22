import activityService from '../services/activityServices.js';

const remove = async (req, res) => {
    const activityId = req.params.id;
    const userId = req.userId;

    try{
        const activity = await activityService.deleteActivity(activityId, userId);
        res.status(200).json({message: "Activity deleted"});
    } catch (error) {
        res.status(error.status).json({message: error.message})
    }
};

export default remove;