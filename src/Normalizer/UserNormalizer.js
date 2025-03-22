class userNormalizer {
    #user;

    constructor(user) {
        this.#user = user;
    }

    getLogin() {
        return {
            email: this.#user.email,
            Id: this.#user.Id,
            accesstoken: this.#user.accessToken,
            refreshToken: this.#user.refreshToken,
        };
    }
}

export default userNormalizer;