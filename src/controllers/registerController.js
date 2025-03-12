import userService from "../services/userService.js";

const register = async(req, res) => {
    const data = req.body;
    const user = await userService.register(data);
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(500).json({message: "Internal server error"});
    }
};

export default register;