import * as chai from 'chai';
import chaiHttp from 'chai-http';
import {request} from 'chai-http';
import app from '../../server.js';
import {expect} from 'chai';
import criptoUtils from '../../src/utils/criptoUtils.js';
import TestUtils from '../fixtures/Utils.js';
import { status } from '../../src/const/constant.js';

chai.use(chaiHttp);
const route = "/:id/activities";
let user;
let accessToken;
let activity;
let activities;

describe.only('Get Many Controller Test', () => {
    beforeEach(async () => {
        user = await TestUtils.addTestUser();
        accessToken = criptoUtils.generateToken(user, 10000);
        activity = await TestUtils.addTestActivity(status.OPEN, user.id);
        activities = await TestUtils.addTestActivities(user.id, 10);
    });

    afterEach(async () => {
        await TestUtils.restore();
    });

describe('/GET/:id/activities success', () => {
    it('should return 200 and get the activities', async () => {
        const getActivities = await TestUtils.getTestManyActivityById(user.id);
        console.log(getActivities);
        const res = await request.execute(app).get(route.replace(":id", user.id))
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Content-Type', 'application/json').send();
        console.log(res.body);
        expect(res).to.have.status(200);
    });
});
});