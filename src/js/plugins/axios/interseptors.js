const lsTokenKey = 'my_app_token';

function setToken (req) {
    const isAuthUrl = req.url.includes('auth');

    if (!isAuthUrl) {
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token;
    }

    return req;
}

function setTokenOnLogin (res) {
    // console.log(res);
    const isLoginUrl = res.config.url.includes('login');

    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }

    return res;
}

function getClearResponse (res) {
    return res.data;
}

function onError (err) {
    console.dir(err);
    return Promise.reject(err);
}

export default function (axios) {

    axios.interceptors.request.use(setToken);

    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse, onError);

}