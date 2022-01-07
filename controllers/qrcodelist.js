const getQRlist = async (req, resp, QRcode) => {

    const qrcodes = await QRcode.find({}).sort({ 'name': 'asc' });

    return resp.json(qrcodes);

}
module.exports = {
    getQRlist: getQRlist
};