import activityService from '../services/activityServices.js';
import userNormalizer from '../normalizer/userNormalizer.js';

const getMany = async (req, res) => {
     const activities = await activityService.getActivities();
     const normalizer = userNormalizer.get(activities);
     if(activities) {
        res.status(200).json(normalizer);
    } else {
        res.status(404).json({message: 'no activity found'});
    } 
 };

 export default getMany;