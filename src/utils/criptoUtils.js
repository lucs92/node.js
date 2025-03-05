import cryptoRandomString from 'crypto-random-string';
import crypto from 'crypto';

class CriptoUtils { 
    generateUniqueCode(length, type = 'base64') {
        return cryptoRandomString({length, type});
    }

    hashPassword(password) {
        const salt = this.generateUniqueCode(10);
        return {
            password: this.sha256(password, salt),
            salt: salt};
    }

    sha256(data, salt) {
        return crypto.createHmac('sha256', salt).update(data).digest('hex');
    }
};

export default new CriptoUtils();