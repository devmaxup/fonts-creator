const { validationResult } = require('express-validator/check');

const toValidationErrors = errors => Object.keys(errors)
  .reduce((acc, key) => {
    const { path, kind, message } = errors[key];

    acc[path] = {
      key: kind,
      message,
    };
    return acc;
  }, {});

module.exports = getData => (req, res, next) => {
  // Request validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422)
      .json({
        errors: errors.mapped(),
      });
    return;
  }

  getData(req, (err, data) => {
    if (err) {
      // Exceptions
      if (!err.errors) {
        next(err);
        return;
      }

      // Mongoose validation errors
      res.status(422)
        .json({ errors: toValidationErrors(err.errors) });
      return;
    }

    res.json({ data });
  }, res, next);
};
