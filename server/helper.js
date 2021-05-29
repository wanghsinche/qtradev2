module.exports.buildBody = (data, code, error)=>({
    code: code || 200,
    error: error && String(error),
    data
});

