import activityRepository from "../repository/activityRepository.js";

//scrive sul file una nuova activity
const addActivity = async (data) => { 
    return await activityRepository.add(data);
};

//restituisce tutte le activity
const getActivities = async () => { 
        return await activityRepository.getActivities();
};

//restituisce un activity
const getActivity = async (id) => {
   return await activityRepository.getActivity(id);
};

//modifica un activity 
const updateActivity = async (id, data) => {
    return await activityRepository.updateActivity(id, data);
};

//cancella un activity
// const deleteActivity = async (id) => {
//     return await activityRepository.deleteActivity(id);
// };

export default { addActivity, getActivities, getActivity, updateActivity, /*deleteActivity*/ };