import { useEffect, useState } from "react";
import { createModel } from "hox";
import axios from 'axios';
interface IUser {
    login: string;
    email: string;
    avatar_url: string;
}
function profile() {
    const [user, setUser] = useState<IUser>();
    const [loading, setLoading] = useState<Boolean>();
    useEffect(()=>{
        setLoading(true);
        axios.get(APIS.user).then(res=>{
            setUser(res.data.data);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);
    return {
        user, loading
    }
}

export default createModel(profile);

const redirect = new URL('http://localhost:9000/api/github_oauth');
redirect.host = location.host;
export const oauth = `https://github.com/login/oauth/authorize?client_id=de186334e70d8c6a85a6&redirect_uri=${redirect.href}`;

export enum APIS {
    user = '/api/user',
    graphQL = '/proxy/graphql',
    logout = '/api/logout'
}