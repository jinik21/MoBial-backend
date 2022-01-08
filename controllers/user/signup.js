const handlesignup = (req, resp, User) => {
    var pic = "https://mobial.blob.core.windows.net/mobialc/663328.png"
    User.register({ username: req.body.email, email: req.body.email, name: req.body.name, phone: req.body.phone, dob: req.body.dob, picture: pic }, req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                return resp.status(400).json("Incorrect form submission");
            }
            else {
                var authenticate = User.authenticate();
                authenticate(req.body.email, req.body.password, function (err, result) {
                    if (err) {
                        //console.log(err);
                        return resp.status(401).json("Incorrect form submission");
                    }
                    else {

                        return resp.status(200).json(result);
                    }
                });
            }
        }
    );
}


module.exports = {
    handlesignup: handlesignup
};
