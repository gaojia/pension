/**
 * @function: 主页面、地图页面
 * @desc:
 * @author: salody on 2017/10/20
 */

import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
	Modal,
	FlatList,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import BaseComponent from "../common/BaseComponent";
import { WebView } from 'react-native-webview-messaging/WebView';
import OtherConfig from '../config/OtherConfig'
import BaseButton from "../components/basic/BaseButton";
import JPushModule from 'jpush-react-native';
import PushNotification from 'react-native-push-notification'
export default class HomeScreen extends BaseComponent {
	constructor(props) {
		super(props);
		this.state= {
			showMore: false,
			showTypeList:false,
			shipTypeSource: [{
				name:'全部',
				selected:true,
			},{
				name:'运沙船',
				selected:false,
			},{
				name:'抛石船',
				selected:false,
			},{
				name:'其它',
				selected:false,
			}],
		};
		this.lastIndex = 0; //已选中的船只类型（0对应全部）
		this._onFlatItemAction = this._onFlatItemAction.bind(this);
	}

	componentDidMount() {
		JPushModule.notifyJSDidLoad(()=>{});
		this.webview.messagesChannel.on('text', text => console.log(text));
		this.webview.messagesChannel.on('json', json => console.log(json));
		this.webview.messagesChannel.on('custom-event-from-webview', eventData => console.log(eventData));
	}

	sendMessageToWebView = () => {
		// this.webview.sendJSON({
		//   payload: 'JSON from RN'
		// });
		///AlertIOS.alert('send ship');
		//this.webview.send('ship');

		// this.webview.emit('custom-event-from-rn', { payload: 'Custom event from RN' });

		this.router.jumpToPage('typhoon')
	};

	render() {
		return (
			<View style={{flex: 1}}>
				<WebView
					ref={ webview => {
						this.webview = webview;
					}}
					source={{uri: 'http://salody.cc:3002/'}}
					style={{flex: 1}}
					bounces={false}
				/>
				<View style={styles.LTContainer}>
					{this._renderImgBtn('video',require('../images/video.png'))}
					{this._renderImgBtn('list',require('../images/list.png'))}
					{this._renderImgBtn('detail',require('../images/ship_icon.png'))}
					{this._renderImgBtn('type',require('../images/ship_menu.png'))}
					{this._renderImgBtn('path',require('../images/path.png'))}
				</View>
				<View style={styles.RTContainer}>
					{this._renderImgBtn('message',require('../images/message.png'))}
				</View>
				<View style={styles.RBMenuContainer}>
					{this._renderRightMenu()}
				</View>
				<View style={styles.RBContainer}>
					{this._renderImgBtn('position',require('../images/position.png'))}
				</View>
				<View style={styles.LBContainer}>
					{this._renderImgBtn('dotMore',require('../images/dot_more.png'))}
				</View>
				{this._renderShipTypeList()}
			</View>
		)
	}
	_renderRightMenu = ()=>{
		if(this.state.showMore){
			return(
				<View style={styles.rightContainer} >
					{this._renderImgBtn('check',require('../images/check.png'))}
					{this._renderImgBtn('typhoon',require('../images/tyhoon.png'))}
					{this._renderImgBtn('files',require('../images/files.png'))}
					{this._renderImgBtn('setting',require('../images/set.png'))}
				</View>
			)
		}else{
			null;
		}
	}
	_renderShipTypeList = () =>{
		if (this.state.showTypeList){
			return(
				<Modal style={{flex:1}}
					   transparent={true}
						visible={this.state.showTypeList}
					   onRequestClose={()=>{this.toast('onRequestClose')}}
				>
					<TouchableOpacity style={{flex:1}}
									  onPress={()=>{this.setState({showTypeList:false})}}
					>
						<FlatList
							style={styles.flatList}
							data={this.state.shipTypeSource}
							extraData={this.state}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderListItem}
							ItemSeparatorComponent={this._renderSeparator}
						/>
					</TouchableOpacity>
				</Modal>
			)
		}else {
			null;
		}
	}
	_renderListItem = (item) =>{
		let data = item.item;
		return(
			<TouchableOpacity key={item.id} style={{height:30,justifyContent:'center',flexDirection:'row'}}
							  onPress = {()=>this._onFlatItemAction(item)}
			>
				<View style={{marginLeft:10,justifyContent:'center',width:10}}>
					<Image
						source={data.selected? require('../images/point_sel.png'):  require('../images/point_def.png')}
						style={styles.itemPoint}
					/>
				</View>
				<View style={{flex:1,justifyContent:'center'}}>
					<Text style={{}}>
						{data.name}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
	_renderSeparator = () =>{
		return(
			<View style={{height:1,backgroundColor:this.color.divider,marginLeft:10,marginRight:10}}/>
		)
	}
	_keyExtractor = (item, index) => item.id;
	_renderImgBtn =(btnType,source)=>{
		return(
			<BaseButton
				onPress={()=>this._onImgBtnAction(btnType)}
				imgSource={source}
			/>
		)
	}
	_onImgBtnAction = (btnType) =>{
		// this.toast(btnType);
		switch (btnType){
			case 'video':{
				//this.router.jumpToPage('video');
				// var currentDate = new Date();
				// JPushModule.sendLocalNotification({
				// 	id:5,
				// 	title:'haha',
				// 	content:'content',
				// 	extra:{key1:'value1',key2:'value2'},
				// 	fireTime: currentDate.getTime() + 3000,
				// 	badge: 8,
				// 	sound: 'fasdfa',
				// 	subtitle: "subtitle",
				// });
				this._notification();
			}
				break;
			case 'list':{
				this.router.jumpToPage('shipList');
			}
				break;
			case 'detail':{
				this.webview.send('showDetails');
			}
				break;
			case 'type':{
				this.setState({
					showTypeList:!this.state.showTypeList,
				})
			}
				break;
			case 'path':{
				this.webview.send('path');
			}
				break;
			case 'check':{

			}
				break;
			case 'typhoon':{
				this.router.jumpToPage('typhoon');
			}
				break;
			case 'files':{
				this.router.jumpToPage('learningFiles');
			}
				break;
			case 'setting':{
				this.router.jumpToPage('setting');
			}
				break;
			case 'dotMore':{
				this.setState({
					showMore:!this.state.showMore,
				})
			}
				break;
			case 'position':{
				this.webview.send('reset');
			}
				break;
			case 'message':{
				this.router.jumpToPage('message');
			}
				break;
			default:
				break;
		}
	}

	_notification = () => {
		PushNotification.localNotification({
			/* Android Only Properties */
			id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID

			/* iOS and Android properties */
			title: "台风提醒", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
			message: "台风距离工地还要64小时，请注意做好防范", // (required)
		});
	}

	_onFlatItemAction = (item) =>{
		let data = item.item;
		let index = item.index;
		let selected = !data.selected;
		if (data.name === '全部') {
			this.webview.send(data.name);
		} else {
			this.webview.send(data.name + selected);
		}

		//单选逻辑
		let shipSource = this.state.shipTypeSource;
		shipSource[this.lastIndex].selected = false;
		let oldItem = shipSource[index];
		oldItem.selected = !data.selected;
		shipSource[index]=oldItem;
		this.lastIndex = index;

		/* 多选逻辑
		//默认选中全部，全部包括所有类型，选中除"全部"外的类型时，"全部"为非选中状态
		let shipSource = this.state.shipTypeSource;
		if (index>0){
			shipSource[0].selected = false;

			let oldItem = shipSource[index];
			oldItem.selected = !data.selected;
			shipSource[index]=oldItem;
		}else {
			shipSource.forEach((item,index)=>{
				if (index>0){
					item.selected = false;
				}else {
					item.selected = true;
				}
			})
		}
		*/
		this.setState({
			showTypeList:false,
			shipTypeSource:shipSource,
		})
	}
}

var styles = StyleSheet.create({
	LTContainer:{
		position: 'absolute',
		left:OtherConfig.marginMid,
		top:60,
		width:50,
	},
	LBContainer:{
		position:'absolute',
		bottom:OtherConfig.marginHuge,
		right:OtherConfig.marginMid,
		width:50,
	},
	RTContainer:{
		position:'absolute',
		width:50,
		top:60,
		right:OtherConfig.marginMid
	},
	RBMenuContainer:{
		position:'absolute',
		width:50,
		bottom:(OtherConfig.marginHuge+50+OtherConfig.marginMid),
		right:OtherConfig.marginMid
	},
	RBContainer:{
		position:'absolute',
		bottom:OtherConfig.marginHuge,
		left:OtherConfig.marginMid,
		width:50,
	},
	flatList:{
		position:'absolute',
		top:60+50*3,
		left:OtherConfig.marginMid+50+OtherConfig.marginSmall,
		width:100,
		backgroundColor:'white'
	},
	itemPoint:{
		height:7,
		width:7,
	}

})
