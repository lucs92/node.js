import userService from "../services/userService.js";
import UserNormalizer from "../Normalizer/UserNormalizer.js"

const login = async (req, res) => {
    const {email, password} = req.body;
   
    try{
        const userLogin = await userService.login(email, password); 
        return res.status(200).json(new UserNormalizer(userLogin).getLogin());
    }catch(error) {
       res.status(error.status || 500).json({message: error.message});
    }
};

export default login;