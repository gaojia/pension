/**
 * 描述：
 * 2017/9/11
 * 作者： gaojia
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    NetInfo,
} from 'react-native';
import Router from './RouterUtil';
import Utils from '../../utils/Index';
import Config from '../../config/Index';
import String from '../strings/Index';
// import {UserLogin} from 'react-native-yuanxinkit';

function postForm(param) {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if(isConnected){
            param.userToken = global.currentUserInfo && global.currentUserInfo.access_token || "";
            Utils.sendPostRequestOnForm(param.url, param.body, param.userToken, param.success, (response) => {
                if (response.code == 401) {
                    refreshToken().then(() => {
                        this.postForm(param);
                    }).catch((errMsg) => {
                        err(errMsg);
                    });
                } else {
                    errorCodeHandle(response, param.error);
                }
            })
        } else {
            Utils.showMessage('无网络请求');
            param.error('无网络请求');
        }
    });
}

function post(param) {
    NetInfo.isConnected.fetch().done((isConnected) => {
        if(isConnected){
            param.userToken = global.currentUserInfo && global.currentUserInfo.access_token || "";
            Utils.sendPostRequest(param.url, param.body, param.userToken, param.success, (response) => {
                if (response.code == 401) {
                    refreshToken().then(() => {
                        this.post(param);
                    }).catch((errMsg) => {
                        err(errMsg);
                    });
                } else {
                    errorCodeHandle(response, param.error);
                }
            })
        } else {
            Utils.showMessage('无网络请求');
            param.error('无网络请求');
        }
    });
}

function get(param) {
    NetInfo.isConnected.fetch().done((isConnected) => {
        // if(isConnected){
            param.userToken = global.currentUserInfo && global.currentUserInfo.access_token || "";
            Utils.sendGetRequest(param.url, param.body, param.userToken, param.success, (response) => {
                if (response.code == 401) {
                    //refresh token
                    refreshToken().then(() => {
                        this.get(param);
                    }).catch((errMsg) => {
                        err(errMsg);
                    });
                } else {
                    errorCodeHandle(response, param.error);
                }
            })
        // } else {
        //     Utils.showMessage('无网络请求');
        //     param.error('无网络请求');
        // }
    });
}

function refreshToken() {
    // return new Promise(function (resolve, reject) {
    //     UserLogin.RefreshToken().then(function (data) {
    //         global.OAuthToken = data;//更新商家端的token
    //         global.currentUserInfo.access_token = data.access_token;
    //         global.currentUserInfo.expires_in = data.expires_in;
    //         global.currentUserInfo.refresh_token = data.refresh_token;
    //         global.currentUserInfo.im_id = data.userId;
    //         Utils.setStorageItem(Config.StorageConfig.UserInfo, JSON.stringify(global.currentUserInfo));
    //
    //         resolve();
    //     }).catch(function (err) {
    //         reject(err);
    //     });
    // });
}

//请求错误处理
let errorCodeHandle = (response, error) => {
    if (response.code === 404) {
        Utils.showMessage('地址无效');
    } else if(response.code === 408) {
        Utils.showMessage('超时');
    }

    error && error(response);
};

let err = (errMsg) => {
    Utils.showMessage('令牌失效');
    Router.loginOut(true);
}

export default {
    get, post, postForm, refreshToken,
};
