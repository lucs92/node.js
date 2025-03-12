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
import activateValidator from '../validators/activateValidator.js';
import activateController from '../controllers/activateController.js';
import loginValidator from '../validators/loginUserValidator.js'
import loginController from '../controllers/loginController.js'
import authMiddlewere from '../middlewere/authMiddlewere.js';


const setup = (app) => {

    app.get("/", authMiddlewere, getManyController); 
    app.get('/:id',authMiddlewere, getValidator, getController);
    app.get('/user/activate/:token', activateValidator, activateController);

    app.post("/",authMiddlewere, addValidator, addController);
    app.post("/user/login", loginValidator, loginController);

    app.patch("/:id",authMiddlewere, updateValidator, updateController);

    app.delete("/soft/:id",authMiddlewere, deleteValidator , deleteSoftController);

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