import activitySchema from '../schema/todoListSchema.js';
import Activity from '../models/Activity.js';   

const add = async (data)=> {
       const activity  = await activitySchema.create(data).catch(error => {
        console.error(`Error: ${error.message}`);
       });
       // return activity.toJSON({flattenObjectIds: true, });
       return new Activity(activity);
};

const getActivities = async () => {
      const activities = await activitySchema.find().catch(error => {
        console.error(`Error: ${error.message}`);
        return null;
      });
        return activities.map((activity) => new Activity(activity));
};

const getActivity = async (id) => {
    const activity = await activitySchema.findById(id).catch(error => {
        console.error(`Error: ${error.message}`);
        return null;
    });
    return new Activity(activity);
};

const updateActivity = async (id, data) => {
    const activity = await activitySchema.findByIdAndUpdate(
        id, data, {upsert: false, new: true}).catch(error => {
        console.error(`Error: ${error.message}`);
        return null;
    });
    return new Activity(activity);
};

// const deleteActivity = async (id) => {
//     await activitySchema.findByIdAndDelete(
//         {_id: id}).catch(error => {
//             console.error(`Error: ${error.message}`);
//             return null;
//     });
// };

export default {add, getActivities, getActivity, updateActivity/*, deleteActivity*/};