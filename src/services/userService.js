import userRepository from '../repository/userRepository.js';
import criptoUtils from '../utils/criptoUtils.js';
import tokenRepository from '../repository/tokenRepository.js';
import emailGateway from '../gatawey/emailGateway.js';

const register = async(data) => {
    const { password, salt } = criptoUtils.hashPassword(data.password);
    data.password = password;
    data.salt = salt;
    const user = await userRepository.add(data);
    const registrationToken = criptoUtils.generateUniqueCode(10);
    await tokenRepository.add(user._id, registrationToken);

    emailGateway.sendRegistrationEmail(user.email, registrationToken);

    return user;
};

export default { register };