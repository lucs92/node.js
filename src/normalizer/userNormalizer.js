
class userNormalizer {
    get(user) {
        return {
            email: user.email,
            userId: user.userId,
            token: user.token,
            status: user.status,
        };
    }
}

export default new userNormalizer();