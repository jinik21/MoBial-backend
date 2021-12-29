const newItem = async (req, resp, Cduty) => {

    try {
        const item = new Cduty({
        name: req.body.name,duty:req.body.duty,description:req.body.description
        })
        item.save();
        resp.json("Item Sucessfully Created");
    }
    catch {
        resp.json("Error while Creating Item");
    }

}
module.exports = {
    newItem: newItem
};