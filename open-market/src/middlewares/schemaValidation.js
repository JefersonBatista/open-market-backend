export default function validateSchema(schema) {
  return (req, res, next) => {
    const object = req.body;

    const validation = schema.validate(object, { abortEarly: false });
    if (validation.error) {
      return res
        .status(400)
        .send(validation.error.details.map((detail) => detail.message));
    }

    next();
  };
}
