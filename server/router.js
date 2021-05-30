const proxy = require('express-http-proxy');
const { authorize } = require('./authorize');
const { githubOauth, user, logout, getJWT } = require('./user');

const graphqlEndpoint = process.env.GRAPHQL || 'http://localhost:8000';

exports.router = (app) => {
  app.use(authorize(['/proxy/graphql']));
  app.use('/proxy/graphql', proxy(graphqlEndpoint));
  app.use('/proxy/jisilu', proxy('https://www.jisilu.cn'));
  app.use(
    '/proxy/money.finance.sina.com.cn',
    proxy('https://money.finance.sina.com.cn'),
  );
  app.use(
    '/proxy/raw.githubusercontent.com',
    proxy('https://raw.githubusercontent.com'),
  );

  app.use('/api/get_jwt', getJWT);
  app.use('/api/github_oauth', githubOauth);
  app.use('/api/user', user);
  app.use('/api/logout', logout);
};
