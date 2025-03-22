import activityRepository from "../repository/activityRepository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

//scrive sul file una nuova activity
const addActivity = async (data) => { 
    return await activityRepository.add(data);
};

//restituisce tutte le activity
const getActivities = async (userId, skip, limit) => { 
    return await activityRepository.getActivities(userId, skip, limit);
};

const getActivitiesByCursor = async (userId, cursor, limit, direction) => {
    return await activityRepository.getActivitiesByCursor(userId, cursor, limit, direction);
  };

//restituisce un activity
const getActivity = async (activityId, userId) => {
   return await activityRepository.getActivity(activityId, userId);
};

//modifica un activity 
const updateActivity = async (activityId, data, userId) => {
    const activity = await activityRepository.updateActivity(activityId, data, userId);
    if(!activity) {
        throw new NotFoundException(`Activity with id ${activityId} not found`, `activityRepository.updateActivity`);
    }
    return activity;
};

//modifica lo status della activity in deleted, soft delete
const deleteActivity = async (activityId, userId) => {
    return await activityRepository.updateActivity(activityId, {status: 'deleted'}, userId);
};

export default { addActivity, getActivities, getActivity, updateActivity, deleteActivity, getActivitiesByCursor};