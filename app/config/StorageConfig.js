/**
 *
 * 2017/4/27 0027
 * 作者：高佳
 */
import React, { Component } from 'react'
import {
    AsyncStorage
} from 'react-native'
var StorageConfig = {
    //用户信息
    UserInfo: 'cache_user_info',
    //请求票据
    OAuthToken: 'cache_oauth_token',
    //城市地区
    AreaList: 'cache_area',
};
module.exports = StorageConfig;
