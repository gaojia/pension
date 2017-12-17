/**
 * Created by lemon on 16/3/1.
 */
import React, { Component } from 'react'
import {
    AsyncStorage
} from 'react-native'
var StorageUtil = {
    getStorageItem: function (key, callback) {
        try {
            AsyncStorage.getItem(key, callback);
        }
        catch (error) {
            console.log('读取storage错误:' + error.message);
        }
    },
    setStorageItem: function (key, value, callback) {
        try {
            AsyncStorage.setItem(key, value, callback);
        }
        catch (error) {
            console.log('存储storage错误:' + error.message);
        }
    },
    removeStorageItem: function (key, callback) {
        AsyncStorage.removeItem(key, callback);
    },
    multiRemoveStorageItem: function (keys, callback) {
        AsyncStorage.multiRemove(keys, callback);
    },
};
module.exports = StorageUtil;