/**
 * Created by gaojie on 2017/10/30.
 * 视频列表
 * 待完善：
 *	刷新+加载更多
 */

import React,{PureComponent} from 'react';
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
import BaseComponent from "../../common/BaseComponent";
import BaseButton from "../../components/basic/BaseButton";
import StyleVariable from '../../style/StyleVariable'

let testData = [
	{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04-1',
		shipType:'抛沙船'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04--1',
		shipType:'抛沙船'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04--1',
		shipType:'抛沙船'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04--2',
		shipType:'抛沙船'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04',
		shipType:'抛沙船'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04',
		shipType:'抛沙船'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'TJ_04',
		shipType:'抛沙船'
	}
]
let k_ImgHeight = 120
export default class LearningFiles extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			fileList:testData,
		}

	}
	render(){

		return(
			<View style={{flex:1}}>

				<StatusBar
					hidden={false}
					animated={false}
				/>
				<FlatList
					numColumns = {2}
					data={this.state.fileList}
					extraData={this.state}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderListItem}
					getItemLayout={this._getItemLayout}
					// ItemSeparatorComponent={this._renderSeparator}
					ListEmptyComponent={this._renderEmptyComponent}

				/>
			</View>
		)
	}
	_keyExtractor = (item, index) => {
		return index+item;
	};
	_getItemLayout = (data,index)=>{
		let itemHeight = k_ImgHeight+60;
		return {
			length:itemHeight,
			offset:itemHeight*index,
			index
		}
	}
	_renderListItem = (item,index) =>{
		return(
			<ListItem
				// key={item.index}
				onPressItem={()=>this._onPressItem(item)}
				item={item}
			/>
		)
	}
	_renderEmptyComponent=()=>{
		return(
			<View style={{flex:1}} >
				<Text style={{height:40,textAlign:'center'}}>
					暂无数据
				</Text>
			</View>
		)
	}
	_renderSeparator = () =>{
		return(
			<View style={{height:1,backgroundColor:this.color.divider,marginLeft:10,marginRight:10}}/>
		)
	}
	_onPressItem = (item) =>{
		let data=item.item;
		//this.toast(data.title);
		this.router.jumpToPage('videoDetail')
	}
}

class ListItem extends PureComponent {

	render (){
		let item = this.props.item.item;
		return(
			<TouchableOpacity key={item.id} style={{flex:1,backgroundColor:'white'}}
							  onPress = {this.props.onPressItem}
			>
				<View style={styles.itemContainer}>
					<Image
						style={styles.itemImg}
						source={{uri:item.image}}
					/>
					<Text style={styles.itemTitle}>
						{item.title}
					</Text>
					<Text style={styles.itemType}>
						{item.shipType}
					</Text>
				</View>

			</TouchableOpacity>
		)
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
	},
	itemContainer:{
		flex:1,
		justifyContent:'center',
		padding:10,
		// backgroundColor:'green'
	},
	itemImg:{
		flex:1,
		height:k_ImgHeight,
		borderRadius:3
	},
	itemTitle:{
		flex:1,
		paddingTop:5,
		paddingBottom:5,
		fontSize:StyleVariable.fontSize.normal,
		color:StyleVariable.color.textPrimary,
		// backgroundColor:'blue'
	},
	itemType:{
		flex:1,
		fontSize:StyleVariable.fontSize.small,
		color:StyleVariable.color.textTertiary,
	},

})
