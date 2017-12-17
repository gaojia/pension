/**
 * 描述：
 * 2017/9/12
 * 作者： gaojia
 */

import Router from './RouterUtil';
import Utils from '../../utils/Index';
import Config from '../../config/Index';

//获取客户端用户信息
getUserInfo = (userCode) => {
    if (!global.currentUserInfo) {
        Router.jumpToLogin();
        return;
    }
    return new Promise((resolve, reject) => {
        // Utils.sendGetRequest(
        //     MyApi.getUserInfo, {
        //         code: userCode
        //     },
        //     global.currentUserInfo.access_token,
        //     (response) => {
        //         if (response && response.code === 200 && response.message) {
        //             resolve(JSON.parse(response.message).Data);
        //         } else {
        //             reject('获取用户信息失败');
        //         }
        //     },
        //     (error) => {
        //         reject('获取用户信息失败');
        //     }
        // );
    });
};


const UserInfo = {
    configure: {

    },
    saveLoginUserInfo: async (userInfo) => {
        global.currentUserInfo = {
            access_token: userInfo.access_token,
            expires_in: userInfo.expires_in,
            imConnectionId: userInfo.imConnectionId,
            refresh_token: userInfo.refresh_token,
            token_type: userInfo.token_type,
            im_id: userInfo.userId,
        };
        try {
            return true;
        } catch (err) {
            global.currentUserInfo = null;
            global.OAuthToken = null;
            global.userInfo = null;
            return false;
        }
    },
    updateCurrentUserInfo: (userInfo) => {
        global.currentUserInfo = userInfo;
        Utils.setStorageItem(Config.StorageConfig.UserInfo, JSON.stringify(global.currentUserInfo));
    },
}

export default {
    configure: UserInfo.configure,
    saveLoginUserInfo: UserInfo.saveLoginUserInfo,
};
