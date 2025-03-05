import registrationTokenSchema from '../schema/registrationTokenSchema.js';

const add = async(userId, token) => {
    const result = await registrationTokenSchema.findOneAndUpdate(
        {userId: userId}, 
        {registrationToken: token}, 
        {upsert: true}).catch((err) => {
        console.log(err);
        return null;
    });
    return result;
}

export default { add };