const getUsers = async (req, resp, User) => {

    const usr = await User.find({});

    return resp.json(usr);

}
module.exports = {
    getUsers: getUsers
};