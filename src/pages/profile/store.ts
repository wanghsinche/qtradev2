import { useEffect, useState, useCallback } from 'react';
import { createModel } from 'hox';
import axios from 'axios';
interface IUser {
  login: string;
  email: string;
  avatar_url: string;
}
function profile() {
  const [user, setUser] = useState<IUser>();
  const [jwt, setJWT] = useState('');
  const [loading, setLoading] = useState<Boolean>();
  useEffect(() => {
    setLoading(true);
    axios
      .get(APIS.user)
      .then((res) => {
        setUser(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getJWT = useCallback(() => {
    setLoading(true);
    axios
      .get(APIS.getJWT)
      .then((res) => {
        setJWT(res.data.data.token);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    user,
    loading,
    jwt,
    getJWT,
  };
}

export default createModel(profile);

const redirect = new URL('http://localhost:9000/api/github_oauth');
redirect.host = location.host;
redirect.port = location.port;
redirect.protocol = location.protocol;
console.log('redirect', redirect.href);
export const oauth = `https://github.com/login/oauth/authorize?client_id=de186334e70d8c6a85a6&redirect_uri=${redirect.href}`;

export enum APIS {
  user = '/api/user',
  graphQL = '/proxy/graphql',
  logout = '/api/logout',
  getJWT = '/api/get_jwt',
}
