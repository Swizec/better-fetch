'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var defaultHeaders = {};

var wrappedFetch = function wrappedFetch(url) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    params.headers = Object.assign({}, headerDict(params.headers), defaultHeaders);
    params.credentials = 'same-origin';

    if (params.body && typeof params.body !== 'string' && !(params.body instanceof FormData)) {
        (function () {

            var body = new FormData();
            Object.entries(params.body).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    k = _ref2[0],
                    v = _ref2[1];

                return body.append(k, v);
            });

            params.body = body;
        })();
    }

    return fetch(url, params);
};

var headerDict = function headerDict(headers) {
    var dict = {};

    if (headers instanceof Headers) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = headers.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2),
                    key = _step$value[0],
                    value = _step$value[1];

                dict[key] = value;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } else {
        dict = headers;
    }

    return dict;
};

wrappedFetch.setDefaultHeaders = function (headers) {
    defaultHeaders = headerDict(headers);
};

wrappedFetch.throwErrors = function (response) {
    if (!response.ok) {
        var err = new Error(response.statusText);
        err.response = response;
        throw err;
    }
    return response;
};

module.exports = wrappedFetch;