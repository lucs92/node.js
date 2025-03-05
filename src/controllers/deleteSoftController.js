import activityService from '../services/activityServices.js';
import { status } from '../const/constant.js';

const remove = async (req, res) => {
    const id = req.params.id;
    const data = {status: status.DELETED};
    const activity = await activityService.updateActivity(id, data);
    
    if (activity) {
        res.status(200).json({message: 'Activity removed'});
    } else {
        res.status(404).json({message: 'Activity not found'});
    }
};

export default remove;