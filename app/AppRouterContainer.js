import React, { Component } from 'react';
import {
    Alert,
    PixelRatio,
    StyleSheet,
    View,
} from 'react-native';
import {Scene, Router, Actions, ActionConst, Stack, Drawer} from 'react-native-router-flux'
import Utils from './utils/Index';
import Pages from './view/Page';

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex           : 1,
        backgroundColor: 'white',
        shadowColor    : null,
        shadowOffset   : null,
        shadowOpacity  : null,
        shadowRadius   : null,
    };
    if (computedProps && computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

export default class AppRouterContainer extends Component {
    constructor (props) {
        super(props);
        console.log('store==>' + JSON.stringify(props));
    }


    render () {
        return (
			<Router getSceneStyle={getSceneStyle}  backAndroidHandler={this._onExitApp}>
				<Stack key="root">
                    {/*<Scene key="login" component={Login}   hideNavBar={true}/>*/}
                    <Scene key="home" component={Pages.homePages.home} initial  type="reset"  hideNavBar={true}/>
                    {/*<Scene key="typhoon" component={Typhoon} title="台风预警"/>*/}
                    {/*<Scene key="shipList" component={ShipList} title="船列表"/>*/}
                    {/*<Scene key="shipDetail" component={ShipDetail} hideNavBar={true}/>*/}
                    {/*<Scene key="learningFiles" component={LearningFiles} title="学习文档"/>*/}
                    <Scene key="message" drawer={true} component={Pages.messagePages.message} title="消息"/>
                    {/*<Scene key="video" component={Video} title="视频"/>*/}
                    {/*<Scene key="videoDetail" component={VideoDetail}  title="视频详情"/>*/}
                    {/*<Scene key="videoPlay" component={VideoPlay} hideNavBar />*/}
                    <Scene key="setting" component={Pages.settingPages.setting} title="设置" />
                    <Scene key="regionSet" component={Pages.settingPages.regionSet} title="区域设置" rightButtonTextStyle={{bottom:5}} rightTitle={'重置'} onRight={() => {}}/>
				</Stack>
			</Router>
        );
    }

    _onBackAndroid = () => {
        return true;
    };

    _onExitApp = () => {
        this._exit();
        return true;
    };

    // 退出程序
    _exit = () => {
        // 当前页面为root页面时的处理
        if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
            //最近2秒内按过back键，可以退出应用。
            Alert.alert('提示', '确认退出?',
                [{text: '取消', onPress: () => { }},
                    {text: '确定', onPress: () => { Utils.onBackPressed(); }},
                ]);
            return true;
        }
        this.lastBackPressed = Date.now();
        Utils.showMessage('再按一次退出应用');
        return true;
    };

}

let styles = StyleSheet.create({
    tabbarContainer: {
        flex           : 1,
        backgroundColor: 'white',
        height         : 50,
        borderTopWidth : 1 / PixelRatio.get(),
        borderStyle    : 'solid',
        borderTopColor : '#ddd',
    },
});
