import { userStatus } from '../const/constant.js';
import MongoInternalException from '../exceptions/MongoInternalException.js';
import userSchema from '../schema/userSchema.js';
import User from '../models/User.js'

const add = async(data) => {
    const user = await userSchema.create(data)
    .catch(error => {
        console.error("Error on adding new user", "userRepository.add");
        return null;
    });
        return new User(user);
};

const activate = async(id) => {
    const user = await userSchema.findOneAndUpdate({_id: id, status: userStatus.PENDING}, {status: userStatus.ACTIVE}, { new: true, upsert: false })
    .catch(error => {
        console.error("Error on activating user", "userRepository.activate");
        return null;
    });
        return new User(user);
};

const getByEmail = async(email) => {
    return await userSchema.findOne({email})
    .catch(error => {
       throw new MongoInternalException("Error getting user by email", "userRepository.getByEmail");
    }); 
};

export default { add, activate, getByEmail };