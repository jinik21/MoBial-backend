const getCdutylist = async (req, resp, Cduty) => {

    const cdutyItems = await Cduty.find({});

    return resp.json(cdutyItems);
    
}
module.exports = {
    getCdutylist: getCdutylist
};