import userRepository from '../repository/userRepository.js';
import criptoUtils from '../utils/criptoUtils.js';
import tokenRepository from '../repository/tokenRepository.js';
import emailGateway from '../gatawey/emailGateway.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';

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

const activate = async(token) => {
    const tokenData = await tokenRepository.get(token);
    if (!tokenData) {
        throw new NotFoundException('Token not found', "userService.activate");
    }
    const user = await userRepository.activate(tokenData.userId);
    if (!user) {
        throw new NotFoundException('Activation failed', "userService.activate");
    }
    return user;
};

const login = async(email, password) => {
    const user = await userRepository.getByEmail(email);
    if (!user || user.status !== "active" || !criptoUtils.comparePassword(password, user)) {
        throw new UnauthorizedException('Unauthorized', "userService.login");
    }
    const {accessToken, refreshToken} = criptoUtils.generateTokens(user);
    return {user, accessToken, refreshToken};
}

export default { register, activate, login };