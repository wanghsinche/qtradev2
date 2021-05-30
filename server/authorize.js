const { buildBody } = require('./helper');
const { verify } = require('./user');
const TOKENNAME = 'x-token';
const APPKEY = process.env.APPKEY || 'asdjfalfalfd';
module.exports.APPKEY = APPKEY;
module.exports.TOKENNAME = TOKENNAME;
module.exports.authorize = (requireList) =>
  function (req, res, next) {
    if (!requireList.some((el) => req.path.startsWith(el)) || verify(req)) {
      next();
      return;
    }
    res.json(buildBody(null, 403, Error('no authority')));
  };

exports.verify = function verify(req) {
  const token = req.get(TOKENNAME) || req.cookies[TOKENNAME]; // use github oauth
  try {
    const obj = jwt.verify(token, APPKEY);
    return obj;
  } catch (err) {
    console.error(err);
  }
};
