const { buildBody } = require('./helper');
const { default: axios } = require('axios');
const jwt = require('jsonwebtoken');
const { TOKENNAME, APPKEY, verify } = require('./authorize');

const domain = process.env.DOMAIN || 'http://localhost:8011';

exports.githubOauth = (req, res) => {
  const { code, state } = req.query;
  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.set('client_id', 'de186334e70d8c6a85a6');
  url.searchParams.set('redirect_uri', domain + '/api/github_oauth');
  url.searchParams.set(
    'client_secret',
    'bcb560fe14be7a676ce5f60380813dcb2002f962',
  );
  url.searchParams.set('code', code);
  axios
    .post(url.href, null, {
      headers: {
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      const { access_token } = resp.data;
      return axios.get('https://api.github.com/user', {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((resp) => {
      /**
       * {"login":"wanghsinche","id":14119632,"node_id":"MDQ6VXNlcjE0MTE5NjMy","avatar_url":"https://avatars.githubusercontent.com/u/14119632?v=4","gravatar_id":"","url":"https://api.github.com/users/wanghsinche","html_url":"https://github.com/wanghsinche","followers_url":"https://api.github.com/users/wanghsinche/followers","following_url":"https://api.github.com/users/wanghsinche/following{/other_user}","gists_url":"https://api.github.com/users/wanghsinche/gists{/gist_id}","starred_url":"https://api.github.com/users/wanghsinche/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/wanghsinche/subscriptions","organizations_url":"https://api.github.com/users/wanghsinche/orgs","repos_url":"https://api.github.com/users/wanghsinche/repos","events_url":"https://api.github.com/users/wanghsinche/events{/privacy}","received_events_url":"https://api.github.com/users/wanghsinche/received_events","type":"User","site_admin":false,"name":null,"company":"Zhejiang University","blog":"https://github.com/wanghsinche/essay","location":null,"email":"wanghsinche@zju.edu.cn","hireable":true,"bio":null,"twitter_username":null,"public_repos":25,"public_gists":3,"followers":18,"following":24,"created_at":"2015-09-04T02:34:02Z","updated_at":"2021-05-29T14:39:20Z"}
       */
      const { login, avatar_url, email } = resp.data;
      const tok = jwt.sign({ login, avatar_url, email }, APPKEY);

      res.cookie(TOKENNAME, tok).redirect(`/?${TOKENNAME}=${tok}`);
    })
    .catch((err) => {
      res.json(buildBody(err.response && err.response.data, 403, err));
    });
};

exports.user = (req, res) => {
  const user = verify(req);
  res.json(buildBody(user), 200);
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.getJWT = function getJWT(req, res) {
  let token = req.get(TOKENNAME) || req.cookies[TOKENNAME]; // use github oauth
  const user = verify(req);
  if (user) {
    token = jwt.sign({ login, avatar_url, email }, TOKENNAME);
    res.json(buildBody({ token }, 200));
  } else {
    res.json(buildBody(user, 403, new Error('unauthorized')));
  }
};
