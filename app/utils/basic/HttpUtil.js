/**
 * Created by 高洁 on 2017/4/18.
 * 合作者：GJS
 */

/**
 * @param {Object} obj
 * @return {String}
 */
export function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
            var val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
}

// fetch(url, {
//     method: 'post',
//     body: toQueryString({
//         'firstParam': 'yourValue',
//         'secondParam':'yourOtherValue'
//     })
// })

// fetch with time out
export function _fetch(fetch_promise, timeout) {
    if (!timeout) {
        return fetch_promise;
    };
    var abort_fn = null;

    //这是一个可以被reject的promise
    var abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
            // reject('abort promise');
            reject({
                TypeError: 'HTTP Error 408 - Request Timeout',
                code: 408,
                message: 'time out',
            });
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function() {
        abort_fn();
    }, timeout);

    return abortable_promise;
}

//usage:
// _fetch(fetch('//a.com/b/c'), 2000)
//     .then(function(res) {
//         console.log(res)
//     }, function(err) {
//         console.log(err);
//     });


// Promise to execute the func
export function _Promise(func: Function) {
    if (typeof func === 'function') {
        return new Promise(function(resolve, reject) {
            // 做一些异步操作的事情，然后……
            // 执行 func
            try {
                let ret = func();
                resolve(ret);
            } catch (err) {
                reject(err);
            }
        });
    };
}

let HTTPRequest = {
    // sendPost Form
    async sendPostForm(postProps, options) {
        try {
            let params = {
                method: 'POST',
                headers: Object.assign({},
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                    options.headers || {},
                ),
                body: postProps.body
            };
            let response;
            if (options.timeout > 0) {
                response = await _fetch(fetch(postProps.url, params), options.timeout);
            } else {
                response = await fetch(postProps.url, params);
            }
            let responseText = await response.text();
            responseText = !responseText || responseText == 'null' ? null : responseText;
            return {message: responseText, code: response.status};
        }
        catch (error) {
            return new Promise(function(resolve, reject) {
                reject(error);
            });
        }
    },
    // sendPost JSON
    async sendPostJSON(postProps, options: {headers:{}, timeout: Number}) {
        try {
            let params = {
                method: 'POST',
                headers: Object.assign({},
                    {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                    options.headers || {},
                ),
                body: postProps.body
            };
            let response;
            if (options.timeout > 0) {
                response = await _fetch(fetch(postProps.url, params), options.timeout);
            } else {
                response = await fetch(postProps.url, params);
            }
            let responseText = await response.text();
            responseText = !responseText || responseText == 'null' ? null : JSON.parse(responseText);
            return {message: responseText, code: response.status};
        } catch (error) {
            return new Promise(function(resolve, reject) {
                reject(error);
            });
        }
    },
    // sendGet JSON
    async sendGetJSON(postProps, options) {
        try {
            let params = {
                headers: Object.assign({},
                    {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Accept': 'application/x-www-form-urlencoded',
                    },
                    options.headers || {},
                ),
            };
            let response;
            if (options.timeout > 0) {
                response = await _fetch(fetch(postProps.url, params), options.timeout);
            } else {
                response = await fetch(postProps.url, params);
            }
            let responseText = await response.text();
            responseText = !responseText || responseText == 'null' ? null : JSON.parse(responseText);
            return {message: responseText, code: response.status};
        }
        catch (error) {
            return new Promise(function(resolve, reject) {
                reject(error);
            });
        }
    },
};

module.exports = HTTPRequest;