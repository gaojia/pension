/**
 * 描述：
 * 2018/1/9
 * 作者：高佳
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    InteractionManager
} from 'react-native';
import BaseComponent from '../../common/BaseComponent';
import StyleVariable from '../../style/StyleVariable'
import RowSplitLine from '../../components/basic/RowSplitLine';
import SplashScreen from 'react-native-splash-screen';
const dismissKeyboard = require('dismissKeyboard')

export default class ServiceConfig extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            service: global.service
        }
    }

    componentDidMount(){
        SplashScreen.hide();
        InteractionManager.runAfterInteractions(() => {
            this.router.refresh({
                onRight: () => this._onValidRequest()
            })
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput ref={(com)=> {this.serviceText = com}}
                               onChangeText={this._onGetInputText}
                               defaultValue={global.service || ''}
                               underlineColorAndroid='transparent'
                               placeholder='请输入服务器地址,如：http://www.xxx.com'/>
                </View>
                <RowSplitLine/>
            </View>
        )
    }

    _onValidRequest = () => {

        if(!this.state.service){
            this.toast('服务器不可为空');
            return;
        }

        this.state.service = this.state.service.toLowerCase();

        if(this.state.service.indexOf('http://') < 0
            && this.state.service.indexOf('https://') < 0 ){
            this.state.service = `http://${this.state.service}`
        }
        dismissKeyboard();
        this.request.sendGet({
            url: this.state.service + '/api/pad-watch/test',
            success: (data) => {
                if(data.code === 200){
                    this._onSaveServiceToLocal()
                } else {
                    this.toast('请确认服务器是否配置正确')
                }
            },
            error: () => {
                this.toast('请确认服务器是否配置正确')
            }
        });
    };

    _onGetInputText = (txt) => {
        this.state.service = txt;
    };

    _onSaveServiceToLocal = () => {
        this.utils.setStorageItem('service',this.state.service, () => {
            if(global.service) {
                global.service = this.state.service;
                this.router.jumpPop();
            } else {
                global.service = this.state.service;
                this.router.jumpToPage('home')
            }
        });

    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleVariable.color.background,
    },
    content: {
        height: 70,
        padding: 10,
        backgroundColor:'#fff'
    }
});
