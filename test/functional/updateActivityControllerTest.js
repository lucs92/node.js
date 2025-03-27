import * as chai from 'chai';
import chaiHttp from 'chai-http';
import {request} from 'chai-http';
import app from '../../server.js';
import {expect} from 'chai';
import criptoUtils from '../../src/utils/criptoUtils.js';
import TestUtils from '../fixtures/Utils.js';
import { status } from '../../src/const/constant.js';

chai.use(chaiHttp);
const route = "/:id/update";
let user;
let accessToken;
let activity;

describe('Update Activity Controller Test', () => {
    beforeEach(async () => {
        user = await TestUtils.addTestUser();
        accessToken = criptoUtils.generateToken(user, 10000);
        activity = await TestUtils.addTestActivity(status.OPEN, user.id);
    });

    afterEach(async () => {
        await TestUtils.restore();
    });    

describe('/PATCH/:id/update success', () => {
    it('should return 200 and update activity', async () => {
        const updateActivity = {
            name: 'Update name test',
            description: 'Update description test'
        };

        const res = await request.execute(app).patch(route.replace(":id", activity.id))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send(updateActivity);

        expect(res).to.have.status(200);
        expect(res.body.userId).to.equal(activity.userId);
        expect(res.body.id).to.equal(activity.id.toString());
        expect(res.body.name).to.equal(updateActivity.name);
        expect(res.body.description).to.equal(updateActivity.description);
        expect(res.body.dueDate).to.equal(activity.dueDate.toISOString());

        const activityFromDb = await TestUtils.getTestActivityById(activity.id, user.id);
        expect(activityFromDb.name).to.equal(updateActivity.name);
        expect(activityFromDb.description).to.equal(updateActivity.description);
        expect(activityFromDb.dueDate.toISOString()).to.equal(activity.dueDate.toISOString());
        expect(activityFromDb.id.toString()).to.equal(activity.id.toString());
        expect(activityFromDb.userId).to.equal(user.id.toString());
    });

    it('should return 200 and update dueDate', async () => {
        const updateActivity = {
            dueDate: new Date().getTime(),
        };

        const res = await request.execute(app).patch(route.replace(":id", activity.id))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send(updateActivity);

        expect(res).to.have.status(200);
        expect(res.body.userId).to.equal(activity.userId);
        expect(res.body.id).to.equal(activity.id.toString());
        expect(res.body.dueDate).to.equal(new Date(updateActivity.dueDate).toISOString());

        const activityFromDb = await TestUtils.getTestActivityById(activity.id, user.id);
        expect(activityFromDb.dueDate.toISOString()).to.equal(new Date(updateActivity.dueDate).toISOString());
        expect(activityFromDb.id.toString()).to.equal(activity.id.toString());
        expect(activityFromDb.userId).to.equal(user.id.toString());
    });
});
describe('/PATCH/:id/update fail', () => {

    it('should return 401 with invalid token', async () => {
        const invalidAccessToken = 'Pippo';
        const res = await request.execute(app).patch(route.replace(":id", activity.id))
        .set('Authorization', `Bearer ${invalidAccessToken}`)
        .set('Content-Type', 'application/json').send();
        
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Authentication error');
    });

    it('should return 400 to invalid activityId', async () => {
        const invalidActivityId = "Invalid activity Id"
        const res = await request.execute(app).patch(route.replace(":id", invalidActivityId))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send();
        
        expect(res).to.have.status(400);
    });

    it('should return 400 to name < 3', async () => {
        const invalidActivityId = "Invalid activity Id"
        const res = await request.execute(app).patch(route.replace(":id", invalidActivityId))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send({name: 'cc'});
        
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('ValidationError: "name" length must be at least 3 characters long');
    });

    it('should return 400 to description < 3', async () => {
        const invalidActivityId = "Invalid activity Id"
        const res = await request.execute(app).patch(route.replace(":id", invalidActivityId))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send({description: 'cc'});
        
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('ValidationError: "description" length must be at least 3 characters long');
    });

    it('should return 400 to dueDate is in the past', async () => {
        const invalidActivityId = "Invalid activity Id"
        const res = await request.execute(app).patch(route.replace(":id", invalidActivityId))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send({dueDate: new Date("2021-02-02").getTime()});
        
        expect(res).to.have.status(400);
    });

    it('should return 404 to activity not found', async () => {
        const idTestNotFOund = TestUtils.idTestActivity();

        const res = await request.execute(app)
        .patch(route.replace(":id", idTestNotFOund.toString()))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send();

        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Activity not found');
    });

    it('should return 404 to user not owner', async () => {
        const fakeId = TestUtils.idTestActivity().toString();
        const res = await request.execute(app).patch(route.replace(":id", fakeId))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send();
        
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Activity not found');
    });

});
})