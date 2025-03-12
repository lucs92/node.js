import userService from "../services/userService.js";
import userNormalizer from "../normalizer/userNormalizer.js"

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const loginResponse = await userService.login(email, password);
        const normalizer = userNormalizer.get(loginResponse.user);
        //console.log("normalizer:", normalizer);
        return res.status(200).json(normalizer);
    }catch(error) {
       res.status(error.status || 500).json({message: error.message});
    }
};

export default login;