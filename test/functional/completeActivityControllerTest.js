import * as chai from 'chai';
import chaiHttp from 'chai-http';
import {request} from 'chai-http';
import app from '../../server.js';
import {expect} from 'chai';
import criptoUtils from '../../src/utils/criptoUtils.js';
import TestUtils from '../fixtures/Utils.js';
import { status } from '../../src/const/constant.js';

chai.use(chaiHttp);

describe('Complete Activity Controller Test', () => {
    afterEach(async () => {
        await TestUtils.restore();
    });    
describe('/PATCH/:id/complete success', () => {

    it('should return 200 and the completed activity', async () => {
        const user = await TestUtils.addTestUser();
        const accessToken = criptoUtils.generateToken(user, 10000);
        const addActivity = await TestUtils.addTestActivity(status.OPEN, user.id);
        
        const res = await request.execute(app).patch(`/${addActivity.id}/complete`)
        .set('Authorization', `Bearer ${accessToken}`).send();

        expect(res).to.have.status(200);
        expect(res.body.userId).to.equal(addActivity.userId);
        expect(res.body.id).to.equal(addActivity.id.toString());
        expect(res.body.name).to.equal(addActivity.name);
        expect(res.body.description).to.equal(addActivity.description);
        expect(res.body.dueDate).to.equal(addActivity.dueDate.toISOString());
        expect(res.body.status).to.equal(status.COMPLETED);

        const activityFromDb = await TestUtils.getTestActivityById(addActivity.id, user.id);
        expect(activityFromDb.status).to.equal(status.COMPLETED);
        expect(activityFromDb.name).to.equal(addActivity.name);
        expect(activityFromDb.description).to.equal(addActivity.description);
        expect(activityFromDb.dueDate.toISOString()).to.equal(addActivity.dueDate.toISOString());
        expect(activityFromDb.id.toString()).to.equal(addActivity.id.toString());
        expect(activityFromDb.userId).to.equal(user.id.toString());
    });
});
describe('/PATCH/:id/complete fail', () => {

    it('should return 401 with invalid token', async () => {
        const user = await TestUtils.addTestUser();
        const accessToken = 'Pippo';
        const addActivity = await TestUtils.addTestActivity(status.OPEN, user.id);
        const res = await request.execute(app).patch(`/${addActivity.id}/complete`)
        .set('Authorization', `Bearer ${accessToken}`).send();
        
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Authentication error');
    });

    it('should return 404 to activity not found', async () => {
        const user = await TestUtils.addTestUser();
        const accessToken = criptoUtils.generateToken(user, 10000);
        const idTestNotFOund = TestUtils.idTestActivity();

        const res = await request.execute(app)
        .patch(`/${(idTestNotFOund).toString()}/complete`)
        .set('Authorization', `Bearer ${accessToken}`).send();

        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Activity not found');
    });

    // it.only('should return 404 to status !open/completed', async () => {
    //     const user = await TestUtils.addTestUser();
    //     const accessToken = criptoUtils.generateToken(user, 10000);
    //     const addActivity = await TestUtils.addTestActivity(status.DELETED, user._id);
    //     console.log(addActivity.toJSON());
    //     const res = await request.execute(app)
    //     .patch(`/${addActivity.id}/complete`)
    //     .set('Authorization', `Bearer ${accessToken}`).send();
    //     console.log(res.body);
    //     expect(res).to.have.status(404);
    // });

    it('should return 404 to user not owner of activity', async () => {
        const user = await TestUtils.addTestUser();
        const accessToken = criptoUtils.generateToken(user, 10000);
        const fakeId = TestUtils.idTestActivity().toString();
        const res = await request.execute(app).patch(`/${fakeId}/complete`)
        .set('Authorization', `Bearer ${accessToken}`).send();
        
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Activity not found');
    })

    it('should return 400 to invalid activityId', async () => {
        const user = await TestUtils.addTestUser();
        const accessToken = criptoUtils.generateToken({_id: user.id}, 10000);
        const addActivity = await TestUtils.addTestActivity(status.OPEN, user.id);
        const res = await request.execute(app).patch(`/123/complete`)
        .set('Authorization', `Bearer ${accessToken}`).send(addActivity);
        
        expect(res).to.have.status(400);
    });

});

})
