export const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate({ ...req.body, ...req.params, ...req.query }, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => ({
                message: err.message,
                field: err.path[0]
            }));
            return res.status(400).json({ message: 'Validation error', errors });
        }
        next();
    };
};