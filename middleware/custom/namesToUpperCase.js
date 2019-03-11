module.exports = (req, res, next) => {
  Object.keys(req.body).forEach(key => {
    if (key.endsWith("Name")) {
      req.body[key] = req.body[key].toUpperCase();
    }
  });

  next();
};
