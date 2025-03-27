import activityRepository from "../repository/activityRepository.js";
import { status } from "../const/constant.js";

class ActivityServices{

//scrive sul file una nuova activity
async addActivity (data) { 
    return await activityRepository.add(data);
};

//restituisce tutte le activities di un utente
async getActivities (userId, skip, limit) { 
    return await activityRepository.getActivities(userId, skip, limit);
};

//restituisce tutte le activities con un cursore
async getActivitiesByCursor (userId, cursor, limit, direction) {
    return await activityRepository.getActivitiesByCursor(userId, cursor, limit, direction);
  };

//restituisce un activity in base all'id
async getActivity (activityId, userId) {
   return await activityRepository.getActivity(activityId, userId);
};

//modifica un activity 
async updateActivity (activityId, data, userId) {
    const activity = await activityRepository.updateActivity(activityId, data, userId);
    return activity;
};

//modifica lo status della activity in deleted(soft delete)
async deleteActivity (activityId, userId) {
    return await activityRepository.updateActivity(activityId, {status: status.DELETED}, userId);
};

//modifica lo status della activity in completed
async completeActivity (activityId, userId) {
    return await activityRepository.completeActivity(activityId, userId);
};
}

export default new ActivityServices();