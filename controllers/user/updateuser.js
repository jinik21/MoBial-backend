const updateProfile = async (req, resp, User) => {

    const usr = await User.findOne({ 'email': req.body.email });
    try {
        if (req.body.name) {
            usr.update({ name: req.body.name }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Profile Updated Sucessfully added");
        }
        if (req.body.phone) {
            usr.update({ phone: req.body.phone }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Profile Updated Sucessfully added");
        }
        if (req.body.dob) {
            usr.update({ dob: req.body.dob }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Profile Updated Sucessfully added");
        }
        if (req.body.address) {
            usr.update({ address: req.body.address }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Profile Updated Sucessfully added");
        }
        if (req.body.pincode) {
            usr.update({ pincode: req.body.pincode }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Profile Updated Sucessfully added");
        }
        if (req.body.picture) {
            usr.update({ picture: req.body.picture }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Result :", result)
                }
            })
            usr.save()
            resp.json("Profile Updated Sucessfully added");
        }
        resp.json("Error while Updating Profile");
    }
    catch {
        resp.json("Error while Updating Profile");
    }

}
module.exports = {
    updateProfile: updateProfile
};