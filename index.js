
const wrappedFetch = function (defaultHeaders = {}) {
    return function (url, params = {}) {
        params.headers = Object.assign(
            {},
            params.headers,
            defaultHeaders
        );
        params.credentials = 'same-origin';

        if (params.body
            && typeof params.body !== 'string'
            && !(params.body instanceof FormData)) {

                let body = new FormData();
                Object.entries(params.body).forEach(([k, v]) => body.append(k, v));

                params.body = body;
        }

        return fetch(url, params);
    }
}

export default wrappedFetch;
