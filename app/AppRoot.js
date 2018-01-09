import React from 'react';
import {
    View,
    Image,
    Text,
    NetInfo,
    StyleSheet,
    Alert,
    BackAndroid,
} from 'react-native'
import AppRouterContainer from './AppRouterContainer'

import PushNotification from 'react-native-push-notification'

class AppRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this._check();
    }

    componentDidMount() {
        this.configErrorHandler();
        this.configLog();
        this._notificationConfig();
    }

    _check = async () => {
        await this._addNetInfoChangeEventListener();
        this.setState({isLoading: false});
    };

    _addNetInfoChangeEventListener = () => {
        let _this = this;
        return new Promise(function (resolve, reject) {
            NetInfo.isConnected.addEventListener(
                'change',
                _this._handleFirstConnectivityChange
            );
            resolve(true);
        })
    };

    _handleFirstConnectivityChange = (reach) => {
        // 移除网络监听
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleFirstConnectivityChange
        );
    };

    _onRequestWarnMsg = () => {

    };

    _notificationConfig = () => {
		PushNotification.configure({

			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function(token) {
				console.log( 'TOKEN:', token );
			},

			// (required) Called when a remote or local notification is opened or received
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );
			},

			// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
			senderID: "YOUR GCM SENDER ID",

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * (optional) default: true
			 * - Specified if permissions (ios) and token (android and ios) will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 */
			requestPermissions: true,
		});
	}

    //正式版禁用console.log
    configLog = () => {
        if (__DEV__ === false) {
            console = {};
            console.log = function () {
            };
            console.info = function () {
            };
            console.warn = function () {
            };
            console.error = function () {
            };
        }
    };

    //全局异常处理
    configErrorHandler = () => {
        if (!__DEV__) {
            ErrorUtils.setGlobalHandler((error, fatal) => {
                // TODO:记录异常
                // 关闭程序
                Alert.alert('提示', '程序出现致命异常！',
                    [
                        {
                            text: '关闭', onPress: () => {
                            BackAndroid.exitApp();
                        }
                        }
                    ], {cancelable: true});
            });
        }
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View />
            );
        }
        return (
            <AppRouterContainer />
        );
    }
}
let styles=StyleSheet.create({
    tabbarContainer: {
        flex: 1,
        backgroundColor: "#f6f6f6",
        height:60,
        borderTopWidth:StyleSheet.hairlineWidth,
        borderStyle:'solid',
        borderTopColor:'#ddd'
    }
});

export default AppRoot;
