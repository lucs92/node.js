import addValidator from '../validators/addValidator.js';
import updateValidator from '../validators/updateValidator.js';
import addController from '../controllers/addController.js';
import getController from '../controllers/getController.js';
import updateController from '../controllers/updateController.js';
import deleteSoftController from '../controllers/deleteSoftController.js';
import deleteValidator from '../validators/deleteValidator.js';
import { getMany, getActivitiesByCursor } from '../controllers/getManyController.js';
import getValidator from '../validators/getValidator.js';
import registerUserValidator from '../validators/registerUserValidator.js';
import registerController from '../controllers/registerController.js';
import activateValidator from '../validators/activateValidator.js';
import activateController from '../controllers/activateController.js';
import loginValidator from '../validators/loginUserValidator.js'
import loginController from '../controllers/loginController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import cursorValidator from '../validators/cursorValidator.js';
import completeController from '../controllers/completeController.js';
import completeValidator from '../validators/completeValidator.js';

const setup = (app) => {

    app.get("/:id/activities", authMiddleware, getMany); 
    app.get('/:id',authMiddleware, getValidator, getController);
    app.get('/:id/cursor/activities', authMiddleware, cursorValidator, getActivitiesByCursor);
    app.get('/user/activate/:token', activateValidator, activateController);

    app.post("/",authMiddleware, addValidator, addController);
    app.post("/user",registerUserValidator , registerController);
    app.post("/user/login", loginValidator, loginController);

    app.patch("/:id/complete",authMiddleware, completeValidator, completeController );
    app.patch("/:id/update",authMiddleware, updateValidator, updateController);

    app.delete("/soft/:id",authMiddleware, deleteValidator , deleteSoftController);

    app.use((error, req, res, next) => {
        if (error && error.error && error.error.isJoi) {
            res.status(400).json({
                type: error.type,
                message: error.error.toString()
            });
        } else {
            next(error);
        }
    });
};

export default setup;