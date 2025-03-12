import activityService from '../services/activityServices.js';
import userNormalizer from '../normalizer/userNormalizer.js';

const update = async (req, res) => {
    const activityId = req.params.id;
    const data = {...req.body, userId:req.userId};
    try {
        const activity = await activityService.updateActivity(activityId, data);
        const normalizer = userNormalizer.get(activity);
        res.status(200).json(normalizer);
    } catch (error) {
        res.status(error.status).json({message: error.message});
    }
};

export default update;