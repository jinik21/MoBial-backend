const scannedQRcode = async (req, resp, User, QRcode) => {

    try {
        const usr = await User.findOne({ 'email': req.body.email });
        const QR_code = await QRcode.findOne({ '_id': req.body.id });
        if(QR_code){
            // var rs={
            //     QR_code:QR_code,
            //     date:Date.now()
            // }

        usr.updateOne({ 
            $addToSet: {
                qrcodes: QR_code
            }
        },function (err, result) {
            if (err){
                console.log(err)
                return resp.json("Error while Scanning QR Code 1");
            }else{
                // console.log("Result :", result) 
                // usr.save()
            }})
        }
        else{
            return resp.json("Invalid QR code Scanned");
        }
        return resp.json("QR Code Sucessfully Scanned");
    }
    catch {
        return resp.json("Error while Scanning QR Code");
    }

}
module.exports = {
    scannedQRcode: scannedQRcode
};