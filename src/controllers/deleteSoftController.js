import activityService from '../services/activityServices.js';

const remove = async (req, res) => {
    const id = req.params.id;
    try{
        const activity = await activityService.deleteActivity(id);
        res.status(200).json(req.userId);
    } catch (error) {
        res.status(error.status).json({message: error.message})
    }
};

export default remove;