const getUsers = async (req, resp,User) => {

    const usr = await User.find({}).sort({ 'name': 1 });

    return resp.json(usr);
    
}
module.exports = {
    getUsers: getUsers
};