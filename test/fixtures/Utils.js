import { status } from '../../src/const/constant.js';
import activitySchema from '../../src/schema/todoListSchema.js'
import userschema from '../../src/schema/userSchema.js';
import mongoose from 'mongoose';
import Activity from '../../src/models/Activity.js';
import User from '../../src/models/User.js'

class TestUtils {

static async addTestActivity (status, userId) {
    const activity = await activitySchema.create({
        name: 'Test name',
        description: 'Test description',
        userId,
        status,
    });
    return new Activity(activity);
};

static async addTestActivities (userId, numActivity) {
    const activities = {}; 
    for(let i= 0; i < numActivity; i++){
       const activity = await activitySchema.create({
            name: `Test name${i}`,
            description: `Test description${i}`,
            userId,
            status: status.OPEN,
        });
        activities.push(activity);
    }
    return new Activity (activities);
};

static async getTestActivityById (acivityId, userId) {
    const activity = await activitySchema.findOne({_id: acivityId, userId: userId});
    return new Activity(activity);
};

static async getTestManyActivityById (userId) {
    const activities = await activitySchema.find({status: { $ne: 'Deleted' }, userId: userId});
    return activities.map((activities) => new Activity(activities));
};

static async addTestUser () {
    const user = await userschema.create({
        email: 'Testemail@exemp.it',
        password: 'testpassword',
    });
    return new User(user);
};
static async completeTestActivity (activityId, userId) {
    const activity = await activitySchema.findOneAndUpdate({_id: activityId, userId: userId}, {status: status.COMPLETED}, {new: true});
    return new Activity (activity);
};

static idTestActivity () {
    return new mongoose.Types.ObjectId().toString();
};

static async restore() {
    await activitySchema.deleteMany();
    await userschema.deleteMany();
};

}

export default TestUtils;