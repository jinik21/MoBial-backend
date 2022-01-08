const getprevCar = async (req, resp, RentCar, PostCar) => {

    var prevCars;
    if(req.body.rentee) 
    prevCars= await PostCar.find({ rentee_email: req.body.rentee_email}).sort({ 'date_posted': 'desc' });
    
    if(req.body.renter)
    prevCars= await RentCar.find({ renter_email: req.body.renter_email }).sort({ 'date_posted': 'desc' });

    if(req.body.id)
    prevCars= await PostCar.findOne({ _id:req.body.id});

    return resp.json(prevCars);

}
module.exports = {
    getprevCar: getprevCar
};