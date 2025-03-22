import activityService from '../services/activityServices.js';
import cursorNormalizer from '../Normalizer/cursorNormalizer.js';

const getMany = async (req, res) => {
    const userId = req.userId;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    
    try{
        const activities = await activityService.getActivities(userId, skip, limit);
        res.status(200).json(activities);
    } catch(error) {
        res.status(error.status || 500).json({message: error.message});
    }
 };

 const getActivitiesByCursor = async (req, res) => {
    try {
      const userId = req.userId;
      const { cursor, limit, direction } = req.pagination;
      const activitiesResult = await activityService.getActivitiesByCursor(userId, limit, cursor, direction);
  
      if (activitiesResult.length > 0) {
        const { activities, nextCursor, prevCursor } = cursorNormalizer(activitiesResult);
  
        return res.status(200).json({
          activities,
          nextCursor,
          prevCursor,
          direction,
        });
      } else {
        return res.status(404).json({ message: 'No activities found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export { getMany, getActivitiesByCursor };