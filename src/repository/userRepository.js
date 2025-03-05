import userSchema from '../schema/userSchema.js';

const add = async(data) => {
    return await userSchema.create(data).catch(error => {
        console.error(`Error: ${error.message}`);
        return null;
    });
};

export default { add };