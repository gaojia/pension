/**
 * Created by 高洁 on 2017/4/18.
 * 合作者：GJS
 */

import HTTPRequest, {toQueryString, _fetch, _Promise } from '../basic/HttpUtil'

const defaultTimeout = 1000 * 30 * 1; // 默认1分钟超时

let requestAction = Object.assign({}, {
    /** 应用层
     * 满足项目请求的主要配置 http 请求
     * url: String 接口地址
     * params: Object/String 参数
     * failCallback: Function(response || error) 失败时的回调函数 如果不需要特殊处理，可以设为null，则会统一处理
     * succCallback: Function(response) 成功时的回调函数
     */
    sendPostRequest(url, params, userToken, succCallback, failCallback) {
        let header = {'Authorization': userToken ? 'Bearer ' + userToken : ''};
        this.sendPostRequestWith({timeout: defaultTimeout, headers: header}, url, params, succCallback,failCallback);
    },
    sendGetRequest(url, params, userToken, succCallback, failCallback) {
        let header = {'Authorization': userToken ? 'Bearer ' + userToken : ''};
        this.sendGetRequestWith({timeout: defaultTimeout, headers: header}, url, params, succCallback,failCallback);
    },
    sendPostRequestOnForm(url, params, userToken, succCallback, failCallback) {
        let header = {'Authorization': userToken ? 'Bearer ' + userToken : ''};
        this.sendPostRequestOnFormWith({timeout: defaultTimeout, headers: header}, url, params, succCallback,failCallback );
    },

    /** 中间层
     * 可自定义其他特别配置
     * http 请求 可配置请求头
     * options: Object 可选配置项
     * url: String 接口地址
     * params: Object/String 参数
     * failCallback: Function(response || error) 失败时的回调函数 如果不需要特殊处理，可以设为null，则会统一处理
     * succCallback: Function(response) 成功时的回调函数
     */
    sendPostRequestWith(options, url, params, succCallback, failCallback) {
        this.sendPostRequestWithOptions(options, url, params, (isSuccess, response)=>{
            isSuccess ? succCallback && succCallback(response) : failCallback && failCallback(response);
        });
    },
    sendGetRequestWith(options, url, params, succCallback, failCallback) {
        this.sendGetRequestWithOptions(options, url, params, (isSuccess, response) => {
            isSuccess ? succCallback && succCallback(response) : failCallback && failCallback(response);
        });
    },
    sendPostRequestOnFormWith(options, url, params, succCallback, failCallback) {
        this.sendPostRequestOnFormWithOptions(options, url, params, (isSuccess, response) => {
            isSuccess ? succCallback && succCallback(response) : failCallback && failCallback(response);
        });
    },

    /** 基础层
     * http 请求
     * options: Object 可选配置项
     * url: String 接口地址
     * params: Object/String 参数
     * callback: Function(bool, object) 回调函数
     */
    async sendPostRequestWithOptions(options, url, params, callback) {

        let bodys = '';
        if (typeof params == 'object') {
            bodys = JSON.stringify(params);
        } else if (typeof params == 'string') {
            bodys = params;
        }

        let propsParams = {
            url: url,
            body: bodys,
        };
        try {
            let responseObj = await HTTPRequest.sendPostJSON(propsParams, options);
            if (responseObj && (responseObj.code == 200 || responseObj.code == 204)) {
                callback && callback(true, responseObj);
            } else {
                callback && callback(false, responseObj);
            }
        } catch (error) {
            callback && callback(false, error);
        }
    },
    async sendGetRequestWithOptions(options, url, params, callback) {
        let bodys = '';
        if (typeof params == 'object') {
            bodys = JSON.stringify(params);
        } else if (typeof params == 'string') {
            bodys = params;
        }
        let propsParams = {
            url: url,
            body: bodys,
        };
        try {
            let responseObj = await HTTPRequest.sendGetJSON(propsParams, options);
            if (responseObj && responseObj.code == 200 || responseObj.code == 204) {
                callback && callback(true, responseObj);
            } else {
                callback && callback(false, responseObj);
            }
        } catch (error) {
            callback && callback(false,error);
        }
    },
    async sendPostRequestOnFormWithOptions(options, url, params, callback) {
        let bodys = '';
        if (typeof params == 'object') {
            bodys = JSON.stringify(params);
        } else if (typeof params == 'string') {
            bodys = params;
        }
        let propsParams = {
            url: url,
            body: bodys,
        };
        try {
            let responseObj = await HTTPRequest.sendPostForm(propsParams, options);
            if (responseObj && responseObj.code == 200 || responseObj.code == 204) {
                callback && callback(true, responseObj);
            } else {
                callback && callback(false, responseObj);
            }
        } catch (error) {
            callback && callback(false,error);
        }
    },


    /**
     * 统一业务处理
     */
    /*response处理*/
    onSendErrorResponse (errorObj) {
        let errCode = responseObj.code ? responseObj.code : '';
        let errMsg = responseObj.message ? responseObj.message : '发生未知错误';
    },
    /**
     * 刷新 Token
     */
    onRefreshTokenRequest(url,params,userToken,succCallback, failCallback){
        //此处缺少的是刷新 token 的接口
        // let url = '刷新 token 的接口';
        // let params = {};
        let header = {'Authorization': userToken ? 'Bearer ' + userToken : ''};
        this.sendPostRequestWithOptions({timeout: defaultTimeout, headers: header}, url, params, (isSuccess, response)=>{
            isSuccess ? succCallback && succCallback(response) : failCallback && failCallback(response);
        });
    },
});

module.exports = requestAction;