/**
 * Created by 高洁 on 2017/4/18.
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import StyleVariable from '../../style/StyleVariable';

const propTypes = {
    style: React.PropTypes.object,
    textStyle: React.PropTypes.object,
	imgStyle: React.PropTypes.object,
    onPress: React.PropTypes.func,
	text: React.PropTypes.string,
	imgSource:React.PropTypes.object,
	textPosition:React.PropTypes.string, //top,right,bottom,left
}

export default class BaseButton extends Component {
    constructor(props){
        super(props);
    }

    render(){
		if(this.props.imgSource){
			let  titleView;
			if(this.props.text) { //尚未完善，用到时再完善

				let containerStyle={};
				let textStyle = {}
				if (this.props.textPosition == 'right') {
					containerStyle={
						flexDirection:'row'
					}
					textStyle={

					}
					imgSource = {

					}
					return(
						<TouchableOpacity onPress={this.props.onPress}
										  style={[{flexDirection:"row"},{alignItems:'flex-start'}]}>
							<View style={[{flex:1,height:40,justifyContent:'center'},this.props.style]}>
								<View style={{flexDirection:'row'}}>
									<Image source={this.props.imgSource}
										   style={[{width:20,height:20},this.props.imgStyle]}
									/>
									<View style={{flex:1,justifyContent:'center'}}>
										<Text style={[{color: 'white', fontSize: 16},this.props.textStyle]}>
											{this.props.text}
										</Text>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					)
				}
				titleView = (
					<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
						<Text style={[{color: 'white', fontSize: 16}, this.props.textStyle]}>
							{this.props.text}
						</Text>
					</View>
				)
				return(
					<TouchableOpacity onPress={this.props.onPress} style={[this.props.style,{flexDirection:((this.props.text)?"row":"column")}]}>
						<View style={{justifyContent:'center',alignItems:'center'}}>
							<Image source={this.props.imgSource}
								   style={[{width:20,height:20},this.props.imgStyle]}
							/>
							{titleView}
						</View>

					</TouchableOpacity>
				)
			}else {
				return(
						<TouchableOpacity style={styles.imgBtn}
										  onPress={this.props.onPress}
						>
							<Image source={this.props.imgSource} >
							</Image>
						</TouchableOpacity>
					)
			}
		}else{
			return(
				<TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
					<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
						<Text style={[{color: 'white', fontSize: 16}, this.props.textStyle]}>
							{this.props.text}
						</Text>
					</View>
				</TouchableOpacity>
			)
		}
    }
}

const styles = StyleSheet.create({
    container: {
        height:40,
        marginLeft:20,
        marginRight:20,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:StyleVariable.color.primary,
    },
	imgBtn:{
		flex:1,
		backgroundColor:'white',
		padding:5,
		height:35,
		width:35,
		margin:5,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:2
	},
	imgStyle:{
		flex:1,
	}
})
