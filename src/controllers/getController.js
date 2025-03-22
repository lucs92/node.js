import activityService from '../services/activityServices.js';

const get = async (req, res) => {
    const activityId = req.params.id;
    const userId = req.userId;
    try {
        const activity = await activityService.getActivity(activityId, userId);
        res.status(200).json(activity);
    } catch (error) {
        res.status(error.status || 500).json({message: error.message})
    }
};

 export default get;