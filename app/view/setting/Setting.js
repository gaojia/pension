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
    ScrollView,
} from 'react-native';
import BaseComponent from "../../common/BaseComponent";
import StyleVariable from '../../style/StyleVariable';
import BlockTitle from '../../components/basic/BlockTitle';
import RowSplitLine from '../../components/basic/RowSplitLine';

export default class Setting extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.headerContainer} >
						<Image style={styles.imgStyle}
							   source={require('../../images/pension_logo.png')}
							   resizeMode='contain'
						/>
					</View>
					<View style={styles.subContainer}>
						<BlockTitle
							title={this.strings.areaSetting}
							leftImage={this.images.areaSetting.source}
							onPress={() => {this.router.jumpToPage('regionSet')}}
							iconleftmarginLeft={16}
							haveMore={true}
							imgStyle={{width:15,height:15}}
						/>
						<RowSplitLine/>
						<BlockTitle
							title={this.strings.aboutUs}
							leftImage={this.images.aboutUs.source}
							onPress={() => {this.toast('养老')}}
							iconleftmarginLeft={16}
							haveMore={true}
							imgStyle={{width:15,height:15}}
						/>
					</View>
				</ScrollView>
				<View style={{alignItems:'center',marginBottom:20,marginTop:20}}>
					<Text style={{fontSize:StyleVariable.fontSize.small,color:StyleVariable.color.textTertiary}}>
						养老有限公司
					</Text>
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
		backgroundColor:StyleVariable.color.background,
	},
	headerContainer: {
		// backgroundColor:'blue',
		paddingTop:35,
		paddingLeft:40,
		paddingRight:40,
		paddingBottom:20,
		height:220,
		alignItems:'center',
	},
	imgStyle: {
		flex:1,
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

