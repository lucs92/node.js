import addValidator from '../validators/addValidator.js';
import updateValidator from '../validators/updateValidator.js';
import addController from '../controllers/addController.js';
import getManyController from '../controllers/getManyController.js';
import getController from '../controllers/getController.js';
import updateController from '../controllers/updateController.js';
// import deleteController from '../controllers/deleteController.js';
import deleteSoftController from '../controllers/deleteSoftController.js';
import deleteValidator from '../validators/deleteValidator.js';
import getValidator from '../validators/getValidator.js';
import registerUserValidator from '../validators/registerUserValidator.js';
import registerController from '../controllers/registerController.js';

const setup = (app) => {

    app.get("/", getManyController); 
    app.get('/:id', getValidator, getController);
    app.post("/", addValidator, addController);
    app.patch("/:id", updateValidator, updateController);
    // app.delete("/:id", deleteValidator, deleteController);
    app.delete("/soft/:id", deleteValidator , deleteSoftController);
    app.post("/user",registerUserValidator , registerController);

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