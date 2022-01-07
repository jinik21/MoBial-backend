const getCar = async (req, resp, PostCar) => {

    const activeCars = await PostCar.find({status:true}).sort({ 'vehicle_name': 'asc' });

    return resp.json(activeCars);

}
module.exports = {
    getCar: getCar
};