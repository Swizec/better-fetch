
let defaultHeaders = {};

const wrappedFetch = function (url, params = {}) {
    this.defaultHeaders = {};

    params.headers = Object.assign(
        {},
        headerDict(params.headers),
        defaultHeaders
    );
    params.credentials = params.credentials || 'same-origin';

    if (params.body
        && typeof params.body !== 'string'
        && !(params.body instanceof FormData)) {

            let body = new FormData();
            Object.entries(params.body).forEach(([k, v]) => body.append(k, v));

            params.body = body;
    }

    return fetch(url, params);
}

const headerDict = function (headers) {
    let dict = {};

    if (headers instanceof Headers) {
        for (let [key, value] of headers.entries()) {
            dict[key] = value;
        }
    }else{
        dict = headers;
    }

    return dict;
}

wrappedFetch.setDefaultHeaders = function (headers) {
    defaultHeaders = headerDict(headers);
}

module.exports = wrappedFetch;
