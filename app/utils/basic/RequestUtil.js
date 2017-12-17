/**
 * Created by ZHOU on 2016/8/4.
 */
export const Request = (url, method, body) => {
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            headers: {
                //token: 'abc'
            },
            body
        })
        .then((response) => {
            if (response.ok) {
                isOk = true;
            } else {
                isOk = false;
            }
            return response.json();
        })
        .then((responseData) => {
            if (isOk) {
                resolve(responseData);
            } else {
                reject(responseData);
            }
        })
        .catch((error) => {
            reject(error);});
    });
};
