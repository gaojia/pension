/**
 * Created by gaojie on 2017/11/1.
 */

import React from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Dimensions,
} from 'react-native';
import BaseComponent from "../../common/BaseComponent";

export default class ShipDetail extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<ScrollView  style={styles.container}>
				<ImageBackground
					style={styles.headerImg}
					resizeMode='cover'
					source={{uri:'http://pic.qiantucdn.com/58pic/25/55/80/58390e0522a14_1024.jpg'}}
				>
					<TouchableOpacity style={{margin:20,justifyContent:'center'}}
									  onPress = {() => this.router.jumpPop()}
					>
						<Image
							style={{height:44,width:34,resizeMode:'center'}}
							source={require('../../images/back_black.png')}></Image>
					</TouchableOpacity>
				</ImageBackground>
				<View style={styles.detailContainer}>
					{this._renderHeaderItem('基本信息')}
					{this._renderRowItem('船   名','TJ_401')}
					{this._renderRowItem('船长姓名','JACK')}
					{this._renderRowItem('联系电话','15020002333')}
					{this._renderRowItem('单    位','天津航道局')}
					{this._renderHeaderItem('船舶情况')}
					{this._renderRowItem('吨    位','1000吨')}
					{this._renderRowItem('空 气 舱','无')}
					{this._renderRowItem('层    数','4层')}
					{this._renderRowItem('基本尺寸','600 * 800')}
					{this._renderRowItem('最大吃水','5000')}
					{this._renderRowItem('最大航速','200')}
					{this._renderRowItem('油仓数量','100')}
					{this._renderRowItem('位    置','E132 N255')}
					{this._renderRowItem('主机功率','100')}
					{this._renderRowItem('水 密 性','9000')}
					{this._renderRowItem('层    数','4层')}
				</View>
			</ScrollView>
		)
	}
	_renderHeaderItem = (headerText) =>{
		return(
			<View style={{height:40,flexDirection:'row'}}>
				<View
					style={{width:2,height:15,marginRight:5,backgroundColor:this.color.primary}}
				/>
				<Text style={{color:this.color.textPrimary,fontSize:16}}>
					{headerText}
				</Text>
			</View>
		)
	}
	_renderRowItem = (key,value)=>{
		let color = (key=='联系电话'?{color:'blue'}:{color:this.color.textPrimary})
		return (
			<View style={{flex:1,flexDirection:'row',height:40,justifyContent:'center',paddingLeft:10}}>
				<Text style={{width:80,color:this.color.textSecondary}}>
					{key}
				</Text>
				<Text style={[{flex:1},color]}>
					{value}
				</Text>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		// backgroundColor:'orange',
	},
	headerImg: {
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').width*3/5,
	},
	detailContainer: {
		backgroundColor:'white',
		flex:1,
		paddingTop:20,
		paddingLeft:20,
		paddingRight:20,
	},
})

