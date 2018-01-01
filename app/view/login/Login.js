/**
 * Created by gaojie on 2017/10/29.
 */

/**
 * @function: login
 */

import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	StatusBar,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import BaseComponent from "../../common/BaseComponent";
import BaseButton from "../../components/basic/BaseButton";


export default class Login extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			account: '',
			password: '',
		}
	}

	render() {
		return (
			<View style={{flex:1}}>
				<Image source={require('../../images/login_backgroundPic.png')}
					   style={styles.container}
					   resizeMode = 'stretch'
				>
					<ScrollView style={{flex:1}}
								keyboardShouldPersistTaps = 'handled'
					>
						<View style={styles.logoContainer}>
							<Image
								source={require('../../images/pension_logo.png')}
							/>
						</View>
						<View style={styles.inputContainer} >
							<TextInput style={styles.textInput}
									   placeholder={this.strings.holderAccount}
									   value = {this.state.account}
									   maxLength={20}
									   onChangeText={(text) => this.setState({account:text})}
									   underlineColorAndroid="transparent"
							/>
							<View style={{backgroundColor:this.color.divider,height:1}}/>
							<TextInput style={styles.textInput}
									   placeholder={this.strings.holderPwd}
									   value = {this.state.password}
									   maxLength={20}
									   onChangeText={(text) => this.setState({password:text})}
									   underlineColorAndroid="transparent"
							/>
						</View>
						<BaseButton
							style={styles.loginBtn}
							fontStyle={{color:'white'}}
							text={this.strings.login}
							onPress = {()=>this._onLoginIn()}
						/>

						<View style={styles.subContainer}>
							<TouchableOpacity
								onPress={()=>{this._onForgetPwd()}}
								style={{backgroundColor:'transparent'}}
							>
								<Text style={{color:'white'}}>忘记密码</Text>
							</TouchableOpacity>
							<View style={{width:1,height:15,backgroundColor:'white',marginLeft:15,marginRight:15}} />
							<TouchableOpacity
								onPress={()=>{this._onRegister()}}
								style={{backgroundColor:'transparent'}}
							>
								<Text style={{color:'white'}}>立即注册</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Image>
			</View>
		)
	}

	_onLoginIn = () =>{
		this.router.jumpToPage('home');
	}
	_onForgetPwd = ()=>{

	}
	_onRegister = ()=>{

	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		// backgroundColor:'orange',
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
	},
	logoContainer:{
		justifyContent:'center',
		alignItems:'flex-end',
		flexDirection:'row',
		height:200,
	},
	inputContainer: {
		backgroundColor:'white',
		borderRadius:5,
		marginTop:40,
		marginLeft:20,
		marginRight:20,
		height:80,
		paddingLeft:20,
		paddingRight:20,
	},
	textInput: {
		flex:1,
		fontSize:14,
	},
	loginBtn:{
		marginTop:40,
		marginLeft:20,
		marginRight:20,
		alignItems:'center',
		justifyContent:'center',
		height:40,
		backgroundColor:'#1ab2ff'
	},

	subContainer:{
		flexDirection:'row',
		justifyContent:'center',
		margin:20,
		padding:10,
		// backgroundColor:'red',
	},
})

