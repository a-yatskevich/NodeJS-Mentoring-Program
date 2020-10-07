export default function logger(req, res, next) {
    res.on('finish', () => {
        const { method, originalUrl, body } = req;
        const { statusCode } = res;
        console.log(`[${new Date().toISOString()}] info: METHOD: ${method}, STATUS: ${statusCode}, URL: ${originalUrl}, PARAMS: ${JSON.stringify(body)}`);
    });
    next();
}
