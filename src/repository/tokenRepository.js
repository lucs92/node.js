import registrationTokenSchema from '../schema/registrationTokenSchema.js';
import MongoInternalException from '../exceptions/MongoInternalException.js';

const add = async(userId, token) => {
    const result = await registrationTokenSchema.findOneAndUpdate(
        {userId: userId}, 
        {registrationToken: token}, 
        {upsert: true}
    ).catch((err) => {
        console.log(err);
        return null;
    });
        return result;
}

const get = async(token) => {
    const result = await registrationTokenSchema.findOne({registrationToken: token}).catch((err) => {
        throw new MongoInternalException(err, "tokenRepository.get");
    })
        return result;
}   

export default { add, get };