import activitySchema from '../schema/todoListSchema.js';
import Activity from '../models/Activity.js';   
import MongoInternalException from '../exceptions/MongoInternalException.js';
import NotFoundException from '../exceptions/NotFoundException.js';

const add = async (data)=> {
    const activity  = await activitySchema.create(data)
    .catch(error => {
        throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.add`);
    });
       // return activity.toJSON({flattenObjectIds: true, });
       return new Activity(activity);
};

const getActivities = async (userId) => {
    const activities = await activitySchema.find({userId})
    .catch(error => {
        throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.getActivities`);
    });
        if(activities.length === 0) {
        throw new NotFoundException(`Activity with id ${id} not found`, `activityRepository.getActivities`);
    };
        return activities.map((activity) => new Activity(activity));
};

const getActivity = async (activityId, userId) => {
    const activity = await activitySchema.findOne({_id: activityId, userId: userId })
    .catch(error => {
        throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.getActivity`);
    });
    if(!activity) {
        throw new NotFoundException(`Activity with id ${activityId} not found`, `activityRepository.getActivity`);
    };
    return new Activity(activity);
};

const updateActivity = async (activityId, data, userId) => {
    const activity = await activitySchema.findByIdAndUpdate(
    {_id: activityId, userId: userId}, data, {upsert: false, new: true})
    .catch(error => {
        throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.updateActivity`);
    });
        return activity ? new Activity(activity) : null;
};

export default {add, getActivities, getActivity, updateActivity};