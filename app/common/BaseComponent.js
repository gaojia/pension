/**
 * 基础组件
 * 2017/4/24 0024
 * 作者：高佳
 */
import React, { Component } from 'react';
import {
	Dimensions,
	Platform,
	PixelRatio,
} from 'react-native';
import Utils from '../utils/Index';
import Styles from '../style/Index';
import Config from '../config/Index';
import Strings from './strings/Index';
import BaseStrings from './strings/Basic';
import Apis from '../config/api/Pension';
import AppInfo from '../config/AppConfig';
import Router from './function/RouterUtil';
import Images from '../common/resource/Image';
import BaseStyle from '../style/StyleVariable';
import NetworkUtil from './function/NetworkUtil';
import Loading from '../components/basic/Loading';
import Waiting from '../components/basic/Waiting';
import UserInfoUtil from './function/UserInfoUtil';
import Adapter from '../common/function/AdapterUtil';
import EmptyPage from '../components/basic/EmptyPage';
import NavigatorBarUtil from './function/NavigatorBarUtil';
import ScrollableTabUtil from './function/ScrollableTabUtil';
import RefreshListView ,{ RefreshState }from '../components/basic/RefreshListView';

export default class BaseComponent extends Component {
	constructor (props) {
		super(props);
        this.apis = Apis;
		this.utils = Utils;
		this.appInfo = AppInfo;
		this.config = Config;
		this.color = BaseStyle.color;
		this.images = Images;
		this.RefreshState = RefreshState;
		this.isAndroid = Platform.OS === 'android';
		this.currentUserInfo = global.currentUserInfo;
		this.windowWidth = Dimensions.get('window').width;
		this.windowHeight = Dimensions.get('window').height;
		this.mac = '97563c37-ea21-11e7-a034-e006e6bd0c2b';
        this.roomId = '94c86967-dfce-11e7-bb83-e006e6bd0c2b';
        this.buildingId = '4b97f329-dfce-11e7-bb83-e006e6bd0c2b';
		this.strings = this.props.moduleName && Strings[`${this.props.moduleName.replace(/(\w)/, function (v) {
				return v.toUpperCase();
			})}`] || BaseStrings;
		let styleName = `${this.props.name}Style`.replace(/(\w)/, function (v) { return v.toUpperCase();});
		this.styles = this.props.name && Styles[styleName] || BaseStyle;
	}

	/*
	 * 以下为功能方法
	 * */

	//路由跳转
	router = {
		jumpPop             : (param = {}) => {
			Router.jumpPop(param);
		},
		jumpToPage          : (name, param = {}) => {
			Router.jumpToPage(name, param);
		},
		jumpToLogin         : (param) => {
			Router.jumpToLogin(param);
		},
		jumpToPageAndRefresh: (name, param = {}) => {
			Router.jumpToPageAndRefresh(name, param);
		},
		refresh             : (param = {}) => {
			Router.refresh(param);
		},
		jumpToUrl           : (param = {}) => {
			Router.jumpToUrl(param);
		},
	};

	//网络请求
	request = {
		sendGet       : (param) => {
			NetworkUtil.get(param);
		},
		sendPost      : (param) => {
			NetworkUtil.post(param);
		},
		sendPostOnForm: (param) => {
			NetworkUtil.postForm(param);
		},
		postForm      : (param) => {
			NetworkUtil.postForm(param);
		},
	};

	//保存用户信息
	setLoginUserInfo = async (userInfo) => {
		return await UserInfoUtil.saveLoginUserInfo(userInfo);
	};

	//获取用户信息
	getCurrentUserInfo = () => {
		return this.currentUserInfo;
	};

	updateCurrentUserInfo = (userInfo) => {
		UserInfoUtil.updateCurrentUserInfo(userInfo);
	};

	//转换相应尺寸大小
	switchSize = (width, height) => {
		//375dp = 750px/2  667dp = 1334px/2
		//设计是采用iPhone 7屏幕比例设计 --- 750px * 1334px
		//2为像素密度
		return Adapter.SwitchSize(width, height);
	};

	//注销登录
	loginOut = (callback) => {
		Router.loginOut(callback);
	};

	//提示弹框
	toast = (msg) => {
		this.utils.showMessage(msg);
	};

	//日志输出
	log = (msg) => {
		this.utils.logMessage(msg);
	};

	/*
	 * 以下为渲染方法
	 * */

	//渲染错误页面
	renderErrorPage = () => {
	};

	renderEmptyPage = (msg) => {
		return <EmptyPage words={msg} />;
	};

	renderLoading = () => {
		return <Loading ref={(component) => this.loading = component} />;
	};

	renderWaiting = () => {
		return <Waiting ref={(component) => this.waiting = component} />;
	};

	/*
	 * 以下为渲染方法
	 * */

	//渲染NavBar
	renderNavBar = (param = {}) => {
		return NavigatorBarUtil.renderNavBar(param);
	};

	//渲染NavBar左边按钮
	renderLeftButton = (param = {}) => {
		return NavigatorBarUtil.renderLeftButton(param);
	};

	//渲染NavBar右边按钮
	renderRightButton = (param = {}) => {
		return NavigatorBarUtil.renderRightButton(param);
	};

	//渲染ListView组件
	renderListView = (param = {}) => {
		if (!param.renderItem || !param.onHeaderRefresh || !param.onFooterRefresh) {
			this.toast('参数有误');
			return null;
		}
		//data 数据源
		//emptyMsg 数据为空提示
		//renderItem 渲染行
		//renderHeader 渲染头部
		//renderEmptyView 渲染空页面
		//renderErrorPage 渲染错误页面
		//onHeaderRefresh 下拉刷新事件
		//onFooterRefresh 上拉加载事件
		//contentContainerStyle 样式
		return <RefreshListView ref={(component) => this.listView = component} {...param}/>
	};

	renderScrollableTabView = (children = [], param = {}) => {
		return ScrollableTabUtil.render(children, param);
	}
}

