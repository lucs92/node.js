import activitySchema from '../schema/todoListSchema.js';
import Activity from '../models/Activity.js';   
import MongoInternalException from '../exceptions/MongoInternalException.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import { status } from '../const/constant.js';

class ActivityRepository {
    
async add (data) {
    const activity  = await activitySchema.create(data)  
    .catch(error => {
        throw new MongoInternalException(`Error on adding new activity`, `activityRepository.add`);
    });
        return new Activity(activity);
};

async getActivities (userId, skip, limit) {
    const activities = await activitySchema.find({userId}).skip(skip).limit(limit)
    .catch(error => {
        throw new MongoInternalException(`Error on getting activities`, `activityRepository.getActivities`);
    });
        if(activities.length === 0) {
        throw new NotFoundException(`Activities not found`, `activityRepository.getActivities`);
    };
        return activities.map((activities) => new Activity(activities));
};

async getActivitiesByCursor (userId, limit, cursor, direction) {
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
    .catch(error => {
        throw new MongoInternalException(`Error on getting acivities by cursor`,'activityRepository.getActivitiesByCursor');
    });
    if (!activitiesResult) {
        throw new NotFoundException('Activity not found', 'activityRepository.getActivityByCursor');
      }
        return activitiesResult;
  };

async getActivity (activityId, userId) {
    const activity = await activitySchema.findOne({_id: activityId, userId: userId })
    .catch(error => {
        throw new MongoInternalException(`Error on getting activity`, `activityRepository.getActivity`);
    });
    if(!activity) {
        throw new NotFoundException(`Activity not found`, `activityRepository.getActivity`);
    };
        return new Activity(activity);
};

async updateActivity (activityId, data, userId) {
    const activity = await activitySchema.findByIdAndUpdate(
        {_id: activityId, userId: userId}, data, {new: true})
    .catch(error => {
        throw new MongoInternalException(`Error on updating activity`, `activityRepository.updateActivity`)
    });
    if (!activity) {
        throw new NotFoundException('Activity not found', 'activityRepository.updateActivity');
      };
        return new Activity(activity);     
};

async completeActivity (activityId, userId) {
    const activity = await activitySchema.findByIdAndUpdate(
        {_id: activityId, userId: userId, status:{$in: [status.OPEN, status.COMPLETED]}}, 
        {$set: {status: status.COMPLETED}}, 
        {new: true})  
    .catch(error => {
            throw new MongoInternalException(`Error on completing activity`, `activityRepository.completeActivity`);
    });
    if (!activity) {
        throw new NotFoundException('Activity not found', 'activityRepository.completeActivity');
      };
        return new Activity(activity);          
};
}

export default new ActivityRepository();