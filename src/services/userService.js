import userRepository from '../repository/userRepository.js';
import criptoUtils from '../utils/criptoUtils.js';
import tokenRepository from '../repository/tokenRepository.js';
import EmailGatewayFactory from '../gatawey/EmailGatewayFactory.js';
import NotFoundException from '../exceptions/NotFoundException.js';
import UnauthorizedException from '../exceptions/UnauthorizedException.js';
import config from '../../config/config.js';
import { userStatus } from '../const/constant.js';

class UserService {
    constructor(){
        const emailGateway = EmailGatewayFactory.create(config.emailConfig.type);
        this.emailGateway = emailGateway;
    }
async register(data){
    const { password, salt } = criptoUtils.hashPassword(data.password);
    data.password = password;
    data.salt = salt;
    const user = await userRepository.add(data);
    const registrationToken = criptoUtils.generateUniqueCode(10);
    await tokenRepository.add(user._id, registrationToken);
    this.emailGateway.sendRegistrationEmail(user.email, registrationToken);
    return user;
};

async activate (token) {
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

async login (email, password) {
    const user = await userRepository.getByEmail(email);
  
    if (!user || user.status !== userStatus.ACTIVE || !criptoUtils.comparePassword(password, user)) {
        throw new UnauthorizedException('Unauthorized', 'userService.login');
    }
    const {accessToken, refreshToken, userId} = criptoUtils.generateTokens(user);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    return {user, accessToken, refreshToken};
}
}

export default new UserService();