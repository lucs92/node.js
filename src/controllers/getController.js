import activityService from '../services/activityServices.js';

// const getActivity = (req, res) => {
//     if (!fs.existsSync(dbFile)) {
//         return res.status(404).json({});
//     }
//     const content = fs.readFileSync(dbFile);
//     const activities = content.toString().trim().split("\n").map(item => JSON.parse(item));
//     const activity = activities.find(item => item.id == req.params.id);
//     return activity ? res.json(activity) : res.status(404).json(); 
// }

const get = async (req, res) => {
    const activityId = req.params.id;
    const activity = await activityService.getActivity(activityId)
    if(activity) {
        res.status(200).json(activity)
    } else {
        //console.error(`no activity foun for ID: ${activityId}`)
        res.status(404).json({message: 'no activity found'})
    } 
};

 export default get;