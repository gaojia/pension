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
    Animated,
	FlatList,
	StatusBar,
    Dimensions,
	StyleSheet,
    PixelRatio,
    ImageBackground,
	TouchableOpacity,
	InteractionManager,
} from 'react-native';
import BaseComponent from "../common/BaseComponent";
import OtherConfig from '../config/OtherConfig'
import PushNotification from 'react-native-push-notification';
import MenuBtn from './components/MenuBtn';
import StyleVariable from '../style/StyleVariable';
import Icon from 'react-native-vector-icons/Ionicons'
// import Speech from 'react-native-speech';
import Speech from 'native-speech';
import { Recognizer, Synthesizer, SpeechConstant } from "react-native-speech-iflytek";
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen'

let houseWarnDataSource = [{
    id: 1,
    type:2,
    content:'警报解除 2017-12-12 00:00:00',
},{
    id: 2,
    type:1,
    content:'警报呼叫 2017-12-12 00:00:00',
},{
    id: 3,
    type:2,
    content:'警报解除 2017-12-12 00:00:00',
},{
    id: 4,
    type:1,
    content:'警报呼叫 2017-12-12 00:00:00',
}];

export default class HomeScreen extends BaseComponent {
	constructor(props) {
		super(props);
		this.state= {
			showMore: false,
			showTypeList:false,
			warnSource: [
				{
					id: 1,
					content:'1号楼，3层，302室，有警报呼叫，请及时处理！',
				},
				{
                    id: 2,
                    content:'2号楼，2层，202室，有警报呼叫，请及时处理！',
				},
				{
                    id: 3,
                    content:'3号楼，1层，102室，有警报呼叫，请及时处理！',
				}
			],
            houseWarnRecordSource: [],
            rightDistance: new Animated.Value(-203),
			speakContentData: [],
            speakCurrentIndex: 0,
			speakCurrentContent: '',
		};
	}

	componentDidMount() {
        SplashScreen.hide();
        InteractionManager.runAfterInteractions(() => {
			this._getWarnMsg();
            Synthesizer.init('5a53520f');
            this.speakContentInterval = setInterval(() => {
                // Speech.isSpeaking().then((reading) => {
                // 	!reading && this._speakContent(this._getCurrentSpeakContent());
                // }).catch((ex) => {
                //    console.log(ex)
                // })
				this.onSpeak(this._getCurrentSpeakContent());
            }, 1000);

			this.watchWarnMsg = setInterval(() => {
				this._getWarnMsg();
			}, 1000);
		});

        console.log('getDeviceId:'+DeviceInfo.getDeviceId())
        console.log('getDeviceName:'+DeviceInfo.getDeviceName())
        console.log('getUniqueID:'+DeviceInfo.getUniqueID())
	}

	_getCurrentSpeakContent = () => {
        let cIndex = this.state.speakCurrentIndex;
        let cContentData = this.state.warnSource;
        if(cContentData.length !== 0){

            cIndex = cIndex >= cContentData.length ? 0 : cIndex;
            let index = cIndex % cContentData.length;

            this.state.speakCurrentIndex = ++cIndex;
            return cContentData[index].content;
        } else {
            return '';
        }
	};

    async onSpeak(content) {
        let isSpeaking = await Synthesizer.isSpeaking();
        !isSpeaking && content && Synthesizer.start(content);
    }

	componentWillMount() {
        clearInterval(this.speakContentInterval);
        clearInterval(this.deleteData);
        clearInterval(this.watchWarnMsg);
	}

	render() {
		return (
			<View style={{flex: 1}}>
				{/*<WebView*/}
					{/*ref={ webview => {*/}
						{/*this.webview = webview;*/}
					{/*}}*/}
					{/*source={{uri: 'http://salody.cc:3002/'}}*/}
					{/*style={{flex: 1}}*/}
					{/*bounces={false}*/}
				{/*/>*/}
				{/*<Image source={this.images.default_cover.source} style={{width:200,height:200}}/>*/}
				<ImageBackground source = {this.images.bgImage.source} resizeMode='stretch' style={{flex:1}}>
					<View style={styles.flatContainer}>
						{
                            this.state.warnSource.length > 0
								? <FlatList
									style={styles.flatList}
									data={this.state.warnSource}
									renderItem={this._renderItem}
									keyExtractor={(item, index) => item.id}
								 />
								: null
						}
					</View>
					<View style={styles.LTContainer}>
                        {this._renderImgBtn('taskList',this.images.list.source)}
					</View>
					<View style={styles.RTContainer}>
                        {this._renderImgBtn('message',this.images.message.source)}
                        {this._renderImgBtn('setting',this.images.setting.source)}
					</View>
					<Animated.View style={[styles.recorderContainer,{right: this.state.rightDistance}]}>
						{
							this.renderListView({
                                style:{flex:1,marginTop:20},
                                footerTextStyle: {fontSize:10},
                                data: this.state.houseWarnRecordSource,
                                renderItem: (rowData, row, rowID) => this._renderHouseItem(rowData, row, rowID),
                                onHeaderRefresh: () => this._onRequestListWithReload(true),
                                onFooterRefresh: () => this._onRequestListWithReload(false)
							})
						}
					</Animated.View>

				</ImageBackground>
			</View>
		)
	}

	_getWarnMsg = () => {
		this.request.sendGet({
			url: global.service + this.apis.getAllWarnMsgByMac+`?macId=${this.mac}`,
			success: (data) => {
                if(data.code === 200){
                    let i = 0;
                    this.state.warnSource = [];
                    data.message.alertsInfo.map((item) => {
                        this.state.warnSource.push({
                            id: i,
                            content: item,
                            onPress: () => {this.toast('切换房间')}
                        });
                        i++;
                    });
                    this.setState({});
                } else {
                	this.toast(data.message)
				}
			},
			error: () => {

			}
		})
	};

	_getRoomWarnMsg = () => {
        this.request.sendGet({
            url: global.service + this.apis.getAllWarnMsgByRoomId+`?roomId=${this.roomId}`,
            success: (data) => {
            	if(data.code === 200){
                    this.setState({
                        houseWarnRecordSource:data.message.alertHistories
                    });
                    this.listView && this.listView.endRefreshing(this.RefreshState.NoMoreData);
				} else {
                    this.listView && this.listView.endRefreshing(this.RefreshState.Failure);
				}
            },
            error: () => {

            }
        })
	};

    _onRequestListWithReload = (isPullDownRefresh) => {
        if (isPullDownRefresh) {
            this.state.houseWarnRecordSource = [];
            this.state.pageIndex = 1;
        } else {
            this.state.pageIndex++;
        }
        this._getRoomWarnMsg();
    };

	_startAnimation = () => {
		if(this.state.rightDistance._value > 0){
            this.state.rightDistance.setValue(-203);
		} else {
            Animated.spring(                            // 随时间变化而执行的动画类型
                this.state.rightDistance,                      // 动画中的变量值
                {
                    toValue: 3,
                }
            ).start(() => {
                this.listView && this.listView.startHeaderRefreshing();
			});
		}
	};

	_speakContent = (content) => {
		if(content)
			this._startSpeak(content);
	};

	_startSpeak = (data) => {
		return Speech.speak(data);
	};

	_renderImgBtn = (btnType, source)=>{
		return(
			<MenuBtn
				onPress={()=>this._onImgBtnAction(btnType)}
				imgSource={source}
			/>
		)
	};

	_onImgBtnAction =  (btnType) =>{
		switch (btnType){
			case 'taskList':{
				this.utils.removeStorageItem('service',() => {
					this.toast('移除成功')
				})
                //this._startAnimation();
			}
				break;
			case 'setting':{
				this.router.jumpToPage('setting');
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

	_renderItem = (data) => {
		return (
			<TouchableOpacity onPress={data.item.onPress || null}>
				<View style={styles.warnMsgContainer}>
					<Icon size={20} name="md-warning" color="#ff9800"/>
					{/*<Image style={styles.warnIcon} {...this.images.i}/>*/}
					<Text allowFontScaling={false} style={styles.warnMsg}>{data.item.content}</Text>
				</View>
			</TouchableOpacity>
		)
	}

    _renderHouseItem = (data) => {
        return (
			<View style={styles.recorderItem}>
				<Text style={[styles.recorderText,{color:(data.item.deviceType === 1 ? 'red' : null)}]}>{data.item.content}</Text>
			</View>
        )
	}
}

const styles = StyleSheet.create({
	LTContainer:{
		position: 'absolute',
		left:OtherConfig.marginMid,
		top:OtherConfig.statusBarHeight,
		width:50,
	},

	RTContainer:{
		flexDirection:'row',
		position:'absolute',
        top:OtherConfig.statusBarHeight,
		right:OtherConfig.marginMid
	},
	flatContainer: {
        flex:1,
        top:OtherConfig.statusBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
	},
	flatList: {
		backgroundColor: 'transparent'
	},
	warnMsgContainer:{
		flex:1,
		height: 30,
		marginTop:10,
		padding: 5,
		flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:5,
	},
    warnIcon: {
		width: 20,
		height: 20,
	},
    warnMsg: {
		fontSize: 23,
		color: 'red',
		marginLeft: 5
	},
    itemSeparator: {
		height:10,
		backgroundColor: 'transparent'
	},
	recorderContainer: {
		top:3,
		right:3,
		width:200,
		borderWidth:1/PixelRatio.get(),
		borderRadius:3,
		borderColor:'#ccc',
        alignItems:'center',
        position:'absolute',
		backgroundColor:'#fff',
        height:Dimensions.get('window').height-6,
	},
	recorderItem: {
        alignItems:'center',
		width:180,
		borderWidth:1/PixelRatio.get(),
		borderRadius:2,
		borderColor:'#ccc',
		marginTop:10,
		padding:5
	},
	recorderText: {
        fontSize:10
	}
});
