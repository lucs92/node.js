import activityRepository from "../repository/activityRepository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

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
    const activity = await activityRepository.updateActivity(id, data);
    if(!activity) {
        throw new NotFoundException(`Activity with id ${id} not found`, `activityRepository.updateActivity`);
    }
    return activity;
};

//cancella un activity
// const deleteActivity = async (id) => {
//     return await activityRepository.deleteActivity(id);
// };

const deleteActivity = async (id) => {
    return await activityRepository.updateActivity(id, {status: 'DELETED'});
};

export default { addActivity, getActivities, getActivity, updateActivity, deleteActivity };