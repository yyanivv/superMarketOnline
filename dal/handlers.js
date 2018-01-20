const successHandler = (req, data, next) => {
    req.data = data;
    return next();
}

const errorHandler = (err, res, cb) => {
    if (err) {
        return res.status(400).json(err);
    }
    return cb();
}
const getResponseMiddleware = (req, res) => res.status(200).json(createSuccessResponse(req.data));

const putAndPatchResponseMiddleware = (req, res) => res.status(201).json(createSuccessResponse(req.data));

const createSuccessResponse = data => ({data, success: true})

const deleteResponseMiddleware = (req, res) => res.sendStatus(204);

const getSuperDetailsResponse = (req, res) => res.status(200).json({totalProducts: req.totalProducts, totalOrders: req.totalOrders});

module.exports = {
    successHandler,
    errorHandler,
    getResponseMiddleware,
    putAndPatchResponseMiddleware,
    createSuccessResponse,
    deleteResponseMiddleware,
    getSuperDetailsResponse
}