const getprevCar = async (req, resp, RentCar, PostCar) => {

    var prevCars;
    if(req.body.rentee) 
    prevCars= await RentCar.find({ status: false }).sort({ 'date_posted': 'desc' });
    
    if(req.body.renter)
    prevCars= await PostCar.find({ status: false }).sort({ 'date_posted': 'desc' });

    if(req.body.id)
    prevCars= await PostCar.findOne({ _id:req.body.id});

    return resp.json(prevCars);

}
module.exports = {
    getprevCar: getprevCar
};