const {buildBody} = require('./helper');
const TOKENNAME = 'x-token';
module.exports.TOKENNAME = TOKENNAME;
module.exports.authorize = (requireList)=>function (req, res, next) {
    const token = req.session.user && req.session.user.login; // use github oauth
    if (!(requireList.some(el=>req.path.startsWith(el))) || verify(token)) {
        next();
        return;
    } 
    res.json(buildBody(null, 403, Error('no authority')));
    
}
  
function verify(tk){
    return !!tk;
}

