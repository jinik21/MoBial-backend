const newQR = async (req, resp, QRcode) => {

    try {
        const qr = new QRcode({
        name: req.body.name,location:req.body.location,reward:req.body.reward
        })
        qr.save();
        resp.json("QR Code Sucessfully Created");
    }
    catch {
        resp.json("Error while Creating Qrcode");
    }

}
module.exports = {
    newQR: newQR
};