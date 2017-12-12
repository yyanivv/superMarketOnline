const successHandler = (req, data, next) => {
    req.data = data;
    return next();
}

const errorHandler = (err, res, cb) => {
    if (err) {
        return res.json(err).status(400);
    }
    return cb();
}
const getResponseMiddleware = (req, res) => res.status(201).json(createSuccessResponse(req.data));

const putAndPatchResponseMiddleware = (req, res) => res.status(201).json(createSuccessResponse(req.data));

const createSuccessResponse = data => ({data, success: true})

const deleteResponseMiddleware = (req, res) => res.sendStatus(204);

module.exports = {
    successHandler,
    errorHandler,
    getResponseMiddleware,
    putAndPatchResponseMiddleware,
    createSuccessResponse,
    deleteResponseMiddleware
}