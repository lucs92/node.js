import userNormalizer from '../normalizer/userNormalizer.js';
import activityService from '../services/activityServices.js';

const get = async (req, res) => {
    const activityId = req.params.id;
    try {
        const activity = await activityService.getActivity(activityId);
        const normalizer = userNormalizer.get(activity);
        res.status(200).json(normalizer);
    } catch (error) {
        res.status(error.status || 500).json({message: error.message})
    }
};

 export default get;