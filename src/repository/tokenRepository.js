import registrationTokenSchema from '../schema/registrationTokenSchema.js';
import MongoInternalException from '../exceptions/MongoInternalException.js';

const add = async(userId, token) => {
    const result = await registrationTokenSchema.findOneAndUpdate(
        {userId: userId}, 
        {registrationToken: token}, 
        {upsert: true}
    ).catch((error) => {
        console.log(error);
        return null;
    });
        return result;
}

const get = async(token) => {
    const result = await registrationTokenSchema.findOne({registrationToken: token}).catch((error) => {
        throw new MongoInternalException(error, "tokenRepository.get");
    })
        return result;
}   

export default { add, get };