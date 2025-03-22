import activitySchema from '../schema/todoListSchema.js';
import Activity from '../models/Activity.js';   
import MongoInternalException from '../exceptions/MongoInternalException.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import { status } from '../const/constant.js';

const add = async (data)=> {
    const activity  = await activitySchema.create(data)
    .catch(error => {
        throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.add`);
    });
       return new Activity(activity);
};

const getActivities = async (userId, skip, limit) => {
    const activities = await activitySchema.find({userId}).skip(skip).limit(limit)
    .catch(error => {
        throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.getActivities`);
    });
        if(activities.length === 0) {
        throw new NotFoundException(`Activity with id ${userId} not found`, `activityRepository.getActivities`);
    };
    return activities.map((activities) => new Activity(activities));
};

const getActivitiesByCursor = async (userId, limit, cursor, direction) => {
    if (typeof cursor !== 'string' || cursor.length !== 24) {
      throw new Error('Cursor not valid.');
    }
    const parsedLimit = parseInt(limit, 10) || 10;
    const filter = { userId, status: { $ne: 'Deleted' } };
  
    let cursorQuery = {};
  
    if (cursor) {
      cursorQuery = {
         _id: direction === 'next' ? { $gt: cursor } : { $lt: cursor },
      };
    }
  
    const query = { ...filter, ...cursorQuery };
  
    const activitiesResult = await activitySchema.find(query).limit(parsedLimit)
      .catch((error) => {
        throw new MongoInternalException(`Error: ${error.message}`,'activityRepository.getActivitiesByCursor');
      });
        return activitiesResult;
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
        return new Activity(activity);
};

const completeActivity = async (activityId, userId) => {
    const activity = await activitySchema.findByIdAndUpdate(
        {_id: activityId, userId: userId, status:{$in: [status.OPEN, status.COMPLETED]}}, 
        {$set: {status: status.COMPLETED}}, 
        {upsert: false, new: true});
        // .catch(error => {
        //     throw new MongoInternalException(`Error: ${error.message}`, `activityRepository.completeActivity`);
        // });
            return new Activity(activity);
};

export default {add, getActivities, getActivity, updateActivity, getActivitiesByCursor, completeActivity};