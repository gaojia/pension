/**
 * 描述：
 * 2017/9/12
 * 作者： gaojia
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    PixelRatio,
    TouchableOpacity,
} from 'react-native';
import Router from './RouterUtil';
import Utils from '../../utils/Index';
import Styles from '../../style/Index';
import Config from '../../config/Index';
import Images from '../../common/resource/Image';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../../components/basic/NavigationBar';

function renderNavBar(param) {
    let hideBottomLine = !!param.hideBottomLine;
    param.tintColor = param.tintColor || '#fff';
    param.title = {
        title: param.title,
        tintColor: param.titleColor || Config.OtherConfig.navBarTextDefaultColor
    };
    param.leftButton = param.leftButton || renderLeftButton({});
    param.rightButton = param.rightButton || renderRightButton({});
    param.newMsg = param.newMsg || false;
    param.statusBar = param.statusBar ||
        {
            animated                       : true,
            hidden                         : false,
            backgroundColor                : 'white',
            translucent                    : false,
            barStyle                       : 'dark-content',
            networkActivityIndicatorVisible: true,
            showHideTransition             : 'slide',
        }
    //{barStyle: 'dark-content', backgroundColor: 'transparent', hidden: false};
    let bottomStyle = {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1/PixelRatio.get(),
    };
    return <NavigationBar ref='navBar' style={!hideBottomLine ? bottomStyle : null} {...param}/>
}

function renderLeftButton(param) {
    let nav_image = param.nav_back || Images.nav_back_default;
    return (
        <TouchableOpacity
            style={Styles.NavbarButtonStyle.navBarButton}
            onPress={param.onPress || setDefaultBack.bind(this,param.updateStatusBar)}
            disabled={param.disabled || false}>
            <View style={[{padding: 10}, Styles.NavbarButtonStyle.navBarButton, param.style]}>
                {
                    !param.hideArrow
                        ? <Image {...nav_image} style={{width: 20, height: 20,tintColor:param.navBackColor?param.navBackColor:'black'}}/>
                        : null
                }
                <Text
                    style={[Styles.NavbarButtonStyle.navBarButtonText, {color: param.tintColor || Config.OtherConfig.navBarTextDefaultColor}]}>{param.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

function renderRightButton(param) {
    let onPress = !param.disabled ? param.onPress : null;
    let iconStyle = {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    };
    return (
        <View style={[{padding: 10},Styles.NavbarButtonStyle.navBarButton, param.style,]}>
            {
                param.icons && param.icons.length > 0
                    ? param.icons.map((item) => {
                    let itemOnPress = !param.disabled ? item.onPress : null;
                    return (
                        <TouchableOpacity  onPress={itemOnPress || null}  key={Utils.GUID()} style={[iconStyle,item.style]}>
                            <Icon name={item.iconName}
                                  color={item.iconStyle || Config.OtherConfig.navBarTextDefaultColor}
                                  size={20}/>
                        </TouchableOpacity>
                    )
                })
                    : null
            }
            {
                param.images && param.images.length > 0
                    ? param.images.map((item) => {
                    let itemOnPress = !param.disabled ? item.onPress : null;
                    return (
                        <TouchableOpacity onPress={itemOnPress || null} key={Utils.GUID()} style={[iconStyle,item.style]}>
                            <Image style={[{width:16,height:16},item.imageStyle]} source={item.source}/>
                        </TouchableOpacity>
                    )
                })
                    : null
            }
            {
                <TouchableOpacity onPress={onPress || null}>
                    <Text style={[Styles.NavbarButtonStyle.navBarButtonText, {color: param.tintColor || Config.OtherConfig.navBarTextDefaultColor}]}>{param.title}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

setDefaultBack = (updateStatusBar) => {
    if(updateStatusBar)
        StatusBar.setBarStyle('dark-content',true);

    try {
        Router.jumpPop();
    } catch (ex){
        console.log(ex);
    }
};

export default {
    renderNavBar,
    renderLeftButton,
    renderRightButton
}