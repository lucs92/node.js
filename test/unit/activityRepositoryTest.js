import {expect} from 'chai';
import activityRepository from '../../src/repository/activityRepository.js';
import {status} from '../../src/const/constant.js';
import sinon from 'sinon';
import activitySchema from '../../src/schema/todoListSchema.js'
import mongoose from 'mongoose';
import Activity from '../../src/models/Activity.js';
import MongoInternalException from '../../src/exceptions/MongoInternalException.js';
import NotFoundException from '../../src/exceptions/NotFoundException.js';
let sandbox = sinon.createSandbox();

afterEach(() => {
    sandbox.restore();
});

describe('Activity Repository Test', () => {
    
describe('add activity', () => {
    it('should add activity', async ()=> {
        const activity = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.ACTIVE,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
        };
        const stub = sandbox.stub(activitySchema, 'create').resolves(activity);
        const addActivity = await activityRepository.add(activity);
        expect(addActivity).to.be.an.instanceOf(Activity);
        expect(stub.calledOnce).to.be.true;
    });

    it('should catch error MongoInternalException', async () => {
        const data = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.OPEN,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
            };
            const stub = sandbox.stub(activitySchema, 'create').rejects(new Error('Error Db'));
            try {
                await activityRepository.add(data);
            } catch (error) {
                expect(error).to.be.an.instanceOf(MongoInternalException);
                expect(error.message).to.equal('Error on adding new activity');
            }
            expect(stub.calledOnce).to.be.true;
    });
});

// describe('get activities', () => {
//     it('should get activities', async () => {
//         const activities = [{
//             name: 'Test name',
//             description: 'Test description',
//             dueDate: new Date(),
//             status: status.OPEN,
//             _id: new mongoose.Types.ObjectId(),
//             userId: new mongoose.Types.ObjectId()
//         },
//         {
//         name: 'Test name',
//         description: 'Test description1',
//         dueDate: new Date(),
//         status: status.OPEN,
//         _id: new mongoose.Types.ObjectId(),
//         userId: new mongoose.Types.ObjectId()
//         }];
//         const stub = sandbox.stub(activitySchema, 'find').resolves(activities);
//         const getActivities = await activityRepository.getActivities(activities[0].userId, 0, 10);
//         expect(getActivities).to.be.an.instanceOf(Array);
//         expect(stub.calledOnce).to.be.true;
//     }); 
// })
    
describe('get activity', () => {
    it ('should get activity by Id', async () => {
        const activity = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.OPEN,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
            };
        const stub = sandbox.stub(activitySchema, 'findOne').resolves(activity);
        const getActivity = await activityRepository.getActivity(activity._id, activity.userId);
        expect(getActivity).to.be.an.instanceOf(Activity);
        expect(stub.calledOnce).to.be.true;
    });

    it('should catch error MongoInternalException', async () => {
        const activity = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.OPEN,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
            };
            const stub = sandbox.stub(activitySchema, 'findOne').rejects(new Error('Error Db'));
            try {
                await activityRepository.getActivity(activity._id, activity.userId);
            } catch (error) {
                expect(error).to.be.an.instanceOf(MongoInternalException);
                expect(error.message).to.equal('Error on getting activity');
            }
            expect(stub.calledOnce).to.be.true;
    });

    it('should catch error NotFoundException', async () => {
        const activityId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId().toString();
        const stub = sandbox.stub(activitySchema, 'findOne').resolves(null);
        try {
            await activityRepository.getActivity(activityId, userId);
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundException);
            expect(error.message).to.equal('Activity not found');
        }
        expect(stub.calledOnce).to.be.true;
    });

});
    
describe('update activity', () => {
    it('should update activity', async () => {
        const activity = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.OPEN,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
            };
         const stub = sandbox.stub(activitySchema, 'findByIdAndUpdate').resolves(activity);
         const updateactivity = await activityRepository.updateActivity(activity._id, activity, activity.userId);
         expect(updateactivity).to.be.an.instanceOf(Activity);
         expect(stub.calledOnce).to.be.true;
     });

     it('should catch error MongoInternalException', async () => {
        const activity = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.OPEN,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
            };
            const stub = sandbox.stub(activitySchema, 'findByIdAndUpdate').rejects(new Error('Error Db'));
            try {
                await activityRepository.updateActivity(activity._id, activity, activity.userId);
            } catch (error) {
                expect(error).to.be.an.instanceOf(MongoInternalException);
                expect(error.message).to.equal('Error on updating activity');
            }
            expect(stub.calledOnce).to.be.true;
    });

    it('should catch error NotFoundException', async () => {
        const activity = {
            name: 'Test name',
            description: 'Test description',
            dueDate: new Date(),
            status: status.OPEN,
            _id: new mongoose.Types.ObjectId(),
            userId: new mongoose.Types.ObjectId()
            };
        const stub = sandbox.stub(activitySchema, 'findByIdAndUpdate').resolves(null);
        try {
            await activityRepository.updateActivity(activity._id,activity,activity.userId);
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundException);
            expect(error.message).to.equal('Activity not found');
        }
        expect(stub.calledOnce).to.be.true;
    });
});

describe('complete activity', () => {
    it('should set status Completed', async () => {
        const activityId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId().toString();
        const stub = sandbox.stub(activitySchema, 'findByIdAndUpdate').resolves({status: status.COMPLETED, _id: activityId});
        const activity = await activityRepository.completeActivity(activityId, userId);
        expect(activity.status).eq(status.COMPLETED);
        expect(stub.calledOnce).to.be.true;
    });

    it('should catch error MongoInternalException', async () => {
        const activityId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId().toString();
        const stub = sandbox.stub(activitySchema, 'findByIdAndUpdate').rejects(new Error('Db error'));
        
        try {
            await activityRepository.completeActivity(activityId, userId);
        } catch (error) {
            expect(error).to.be.instanceOf(MongoInternalException);
            expect(error.message).to.equal('Error on completing activity');
        }
        expect(stub.calledOnce).to.be.true;
    });

    it('should catch error NotFoundException', async () => {
        const activityId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId().toString();
        const stub = sandbox.stub(activitySchema, 'findByIdAndUpdate').resolves(null);
        try {
            await activityRepository.completeActivity(activityId, userId);
        } catch (error) {
            expect(error).to.be.an.instanceOf(NotFoundException);
            expect(error.message).to.equal('Activity not found');
        }
        expect(stub.calledOnce).to.be.true;
    });
});
    
});