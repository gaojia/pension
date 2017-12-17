/**
 * 适配方法
 * 2017/7/3 0003
 * 作者：高佳
 */

import React, { Component } from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import OtherConfig from '../../config/OtherConfig';

/**
 * 375dp = 750px/2  667dp = 1334px/2
 * 设计是采用iPhone 7屏幕比例设计 --- 750px * 1334px
 * 2为像素密度
 */

const deviceWidth = Dimensions.get('window').width; //设备的宽度
const deviceHeight = Dimensions.get('window').height; //设备的高度
const designWidth = OtherConfig.designWidth; //设计设备宽度
const designHeight = OtherConfig.designHeight; //设计设备高度
const designPixelDensity = OtherConfig.designPixelDensity; //设计像素密度

let fontScale = PixelRatio.getFontScale(); // 返回字体大小缩放比
let pixelRatio = PixelRatio.get(); //当前设备的像素密度

//px转换成dp
let w2 = designWidth / designPixelDensity;
let h2 = designHeight / designPixelDensity;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2); //获取缩放比



const Adapter = {
    SwitchSize: (width: number, height: number) => {
        let size = {};
        if(width){
            size.width = Math.round((deviceWidth / w2) * width);
        }
        if(height){
            size.height = Math.round((deviceHeight / h2) * height);
        }
        return size;
    },
    SwitchFontSize(size: number) {
        return Math.round((size * scale) * pixelRatio / fontScale);
    },
    SwitchScaleSize(size: number) {
        return Math.round(size * scale);
    }
};

module.exports = Adapter;

