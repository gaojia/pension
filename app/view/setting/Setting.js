/**
 * Created by gaojie on 2017/10/30.
 */


import React from 'react';
import {
	View,
	Text,
	Image,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import BaseComponent from "../../common/BaseComponent";
import BaseButton from "../../components/basic/BaseButton";
import StyleVariable from '../../style/StyleVariable'

export default class Setting extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					hidden={false}
					animated={false}
				/>
				<View style={styles.headerContainer} >
					<Image style={styles.imgStyle}
						   source={require('../../images/logo_name.png')}
						   resizeMode='contain'
					/>
				</View>

				<View style={styles.subContainer}>
					<BaseButton
						style={styles.rowContainer}
						textStyle={{color:this.color.textPrimary,fontSize:StyleVariable.fontSize.someBig,paddingLeft:5}}
						text={this.strings.feedback}
						imgSource={require('../../images/suggest.png')}
						onPress = {()=>this.toast('意见反馈')}
						textPosition = 'right'
					/>
					<View style={{height:1,backgroundColor:this.color.divider}} />
					<BaseButton
						style={styles.rowContainer}
						textStyle={{color:this.color.textPrimary,fontSize:StyleVariable.fontSize.someBig,paddingLeft:5}}
						text={this.strings.aboutUs}
						imgSource={require('../../images/i.png')}
						onPress = {()=>this.toast('关于我们')}
						textPosition = 'right'
					/>
					<View style={{flex:1}} />
					<BaseButton
						style={[styles.logoutStyle]}
						textStyle={{color:'white',fontSize:StyleVariable.fontSize.someBig}}
						text={this.strings.logout}
						onPress = {()=>this._onLogout()}
					/>
					<View style={{alignItems:'center',marginBottom:20,marginTop:20}}>
						<Text style={{fontSize:StyleVariable.fontSize.small,color:StyleVariable.color.textTertiary}}>
							中交天津航道局有限公司
						</Text>
					</View>
				</View>
			</View>
		)
	}
	_onLogout = () =>{
		this.router.jumpToLogin();
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		// backgroundColor:StyleVariable.color.background,
	},
	headerContainer: {
		// backgroundColor:'blue',
		paddingTop:35,
		paddingLeft:40,
		paddingRight:40,
		paddingBottom:20,
		height:220,
		alignItems:'center',
		backgroundColor:StyleVariable.color.background,
	},
	imgStyle: {
		flex:1,
		// marginLeft:40,
		// marginRight:40,
		// height:180,

	},
	subContainer:{
		flex:1,
		justifyContent:'flex-start',
		padding:20,
		// backgroundColor:'red',
	},
	rowContainer:{
		height:40,
		// paddingLeft:20,
	},
	logoutStyle:{
		height:40,
		backgroundColor:StyleVariable.color.primary,
		borderRadius:3,
	}

})

