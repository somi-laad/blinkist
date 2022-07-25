
exports.get404Error = (req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
};