const postCar = async (req, resp, PostCar) => {

    try {
        const car = new PostCar({
            rentee_email: req.body.rentee_email, vehicle_type: req.body.vehicle_type, vehicle_name: req.body.vehicle_name, vehicle_number: req.body.vehicle_number,
            description: req.body.description, from_date: req.body.from_date, to_date: req.body.to_date, car_rc: req.body.car_rc, expected_charge: req.body.expected_charge,
            vehicle_picture: req.body.vehicle_picture, status: true
        })
        car.save();
        resp.json("Car Sucessfully Created");
    }
    catch {
        resp.json("Error while Creating Car");
    }

}
module.exports = {
    postCar: postCar
};