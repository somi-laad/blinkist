
exports.get404Error = (req, res, next) => {
    res.status(404).send();
};