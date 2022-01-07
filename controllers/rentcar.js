const rentCar = async (req, resp, RentCar) => {

    try {
        const carReq = new RentCar({
            renter_email: req.body.renter_email, vehicle_id: req.body.vehicle_id, from_date: req.body.from_date,            
            to_date: req.body.to_date, status:"0", id_proof: req.body.id_proof
        })
        carReq.save();
        resp.json("Request Sucessfully Created");
    }
    catch {
        resp.json("Error while Creating Request");
    }

}
module.exports = {
    rentCar: rentCar
};