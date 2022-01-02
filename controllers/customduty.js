const scannedCduty = async (req, resp, Cduty) => {

    try {
        return resp.json("QR Code Sucessfully Scanned");
    }
    catch {
        return resp.json("Error while Scanning QR Code");
    }

}
module.exports = {
    scannedCduty: scannedCduty
};