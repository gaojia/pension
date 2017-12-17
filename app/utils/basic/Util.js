/**
 * Created by lemon on 16/3/1.
 */
import React, {Component} from 'react'
import {
    ToastAndroid,
    Platform,
    Dimensions,
} from 'react-native';

var Util = {
    GUID() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        return guid;
    },
    Vailidate: {
        checkEmail(str){
            return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
        },
        checkMobileNumber(str){
            return /^(1)+\d{10}/.test(str);
        },
        checkIDCard(str){
            return /^(^\d{18}$|^\d{17}(\d|X|x))$/.test(str);
        },
        checkUrlHead(str){
            return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(str);
        },
        checkTelephoneNumber(str){
            return /^1[34578]\d{9}$/.test(str)
        },
        checkName(str){
            return /[\u4E00-\u9FA5]{2,10}/.test(str)
        },
        checkAge(str){
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(str)
        },
        checkLastFourID(str){
            return /^\d{4}$/.test(str)
        },
        checkBankCardNumber(str){
           return /^[0-9]*$/.test(str)
        },
    },
    DateTime: {
        getDateDiff(hisTime, nowTime){
            var now = nowTime ? nowTime : new Date().getTime(),
                diffValue = now - hisTime,
                result = '',
                minute = 1000 * 60,
                hour = minute * 60,
                day = hour * 24,
                halfamonth = day * 15,
                month = day * 30,
                year = month * 12,

                _year = diffValue / year,
                _month = diffValue / month,
                _week = diffValue / (7 * day),
                _day = diffValue / day,
                _hour = diffValue / hour,
                _min = diffValue / minute;

            if (_year >= 1) result = parseInt(_year) + "年前";
            else if (_month >= 1) result = parseInt(_month) + "个月前";
            else if (_week >= 1) result = parseInt(_week) + "周前";
            else if (_day >= 1) result = parseInt(_day) + "天前";
            //else if(_hour>=1) result=parseInt(_hour) +"个小时前";
            //else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result = "今天";
            return result;
        }
    },
    Window: {
        getWidth: Dimensions.get('window').width,
        getHeight: Dimensions.get('window').height,
    },
    FormatMoney: {
        formartmony(money){
            //判断是否存在金额
            if (money) {

                let newMoney = parseInt(money).toString();
                if (newMoney.length > 4) {
                    money = money * 10000 / 100000000;
                    let formatmoney = money + '亿';
                    return formatmoney
                } else {
                    let formatmoney = money + '万';
                    return formatmoney
                }
                //判断是否小数
                // let moneystring = money.toString();
                /*var result = moneystring.indexOf(".");
                 if (result != -1) {
                 //含小数点的金额
                 let newMoney = parseInt(money).toString();
                 if (newMoney.length > 4) {
                 money = money * 10000 / 100000000;
                 let formatmoney = money + '亿';
                 return formatmoney
                 } else {
                 let formatmoney = money + '万';
                 return formatmoney
                 }
                 } else {
                 //不含小数点的金额
                 if (moneystring.length > 4) {
                 money = money / 10000;
                 let formatmoney = money + '亿';
                 //	console.log('格式化的money'+formatmoney)
                 return formatmoney
                 } else {
                 let formatmoney = money + '万';
                 //console.log(formatmoney)
                 return formatmoney
                 }
                 }*/
            } else {
                money = 0;
                return money
            }
        }
    },
    //数字格式化:例:1,000,000
    ScoreDeal: {
        getStr(str){
            let newStr = "";
            let count = 0;
            if (str.indexOf(".") == -1) {
                for (let i = str.length - 1; i >= 0; i--) {
                    if (count % 3 == 0 && count != 0) {
                        newStr = str.charAt(i) + "," + newStr;
                    } else {
                        newStr = str.charAt(i) + newStr;
                    }
                    count++;
                }
            }
            return newStr;
        }
    },
};
module.exports = Util;
