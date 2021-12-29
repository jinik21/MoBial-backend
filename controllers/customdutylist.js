const getCdutylist = async (req, resp, Cduty) => {

    const cdutyItems = await Cduty.find({}).sort({ 'name': 'asc' });

    return resp.json(cdutyItems);
    
}
module.exports = {
    getCdutylist: getCdutylist
};