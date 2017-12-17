/**
 * 描述：
 * 2017/9/12
 * 作者： gaojia
 */

import React from 'react';
import Utils from '../../utils/Index';
import Config from '../../config/Index';
import { Actions } from 'react-native-router-flux';

let _jumpToPage = (name, param = {}) => {
    (Actions[name])(param);
};

let _jumpToLogin = () => _jumpToPage('login');

export default {
    jumpPop             : (param = {}) => {
        Actions.pop(param);
    },
    jumpToPage          : _jumpToPage,
    jumpToLogin         : () => {
        _jumpToLogin();
    },
    jumpToPageAndRefresh: (name, param = {}) => {
        param.type = 'popAndReplace';
        _jumpToPage(name, param);
    },
    refresh             : (param = {}) => {
        Actions.refresh(param);
    },
    jumpToUrl           : (param = {}) => {
        (Actions['webViewContainer'])(param);
    },
    loginOut            : (callback, jumpToLogin = false) => {
        Utils.multiRemoveStorageItem([Config.StorageConfig.UserInfo, Config.StorageConfig.SincereCustomer, Config.StorageConfig.BusinessUserInfo], () => {
            global.currentUserInfo = null;
            global.partnerUserInfo = null;
            global.userInfo = null;


            if (typeof callback === 'function') {
                callback && callback();
            }

            if (typeof callback === 'boolean' && callback || jumpToLogin) {
                _jumpToLogin();
            }
        });
    },
};
