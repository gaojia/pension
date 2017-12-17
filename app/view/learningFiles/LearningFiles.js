/**
 * Created by gaojie on 2017/10/30.
 * 学习文档列表
 * 待完善：
 * 		刷新+加载更多
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
import Images from "../../common/resource/Image";
import StyleVariable from '../../style/StyleVariable'

let testData = [
	{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'2017年Q3企业社会责任报告书--中文',
		size:'2.3M'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'2017年Q3企业社会责任报告书--中文',
		size:'2.3M'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'2017年Q3企业社会责任报告书--中文',
		size:'2.3M'
	},{
		image:'http://f.hiphotos.baidu.com/image/pic/item/63d9f2d3572c11dfacc69315692762d0f703c2f4.jpg',
		title:'2017年Q3企业社会责任报告书--中文',
		size:'2.3M'
	}
]
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
					data={this.state.fileList}
					extraData={this.state}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderListItem}
					ItemSeparatorComponent={this._renderSeparator}
				/>
			</View>
		)
	}
	_keyExtractor = (item, index) => item.id;
	_renderListItem = (item,index) =>{
		return(
			<ListItem
				key={item.id}
				onPressItem={()=>this._onPressItem(item)}
				item={item}
			/>
		)
	}
	_renderSeparator = () =>{
		return(
			<View style={{height:1,backgroundColor:this.color.divider,marginLeft:10,marginRight:10}}/>
		)
	}
	_onPressItem = (item) =>{
		let data=item.item;
		this.toast(data.title);
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
					<View style={styles.itemSubContainer}>
						<Text style={styles.itemTitle}>
							{item.title}
						</Text>
						<View style={styles.itemThirdCon}>
							<Text style={styles.itemSize}>
								大小:{item.size}
							</Text>

							<TouchableOpacity onPress={this.props.downLoad} style={[styles.itemDownload]}>
								<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
									<View style={{justifyContent:'center',alignItems:'center'}}>
										<Image source={require('../../images/download.png')}
											   defaultSource = {Images.default_cover.source}
											   style={[{width:20,height:20},styles.itemDowImg]}
										/>
									</View>
									<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
										<Text style={[styles.itemFontStyle]}>
											下载文档
										</Text>
									</View>
								</View>

							</TouchableOpacity>
						</View>
					</View>
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
		padding:20,
		justifyContent:'center',
		flexDirection:'row',
		// backgroundColor:'green'
	},
	itemSubContainer:{
		flex:1,
		height:90,
		paddingLeft:15,
		flexDirection:'column',
	},
	itemImg:{
		width:120,
		height:90,
		borderRadius:3
	},
	itemTitle:{
		flex:1,
		marginBottom:10,
		fontSize:StyleVariable.fontSize.big,
		color:StyleVariable.color.textPrimary,
		// backgroundColor:'blue'
	},
	itemThirdCon:{
		flexDirection:'row',
		marginBottom:0,
	},
	itemSize:{
		flex:1,
		fontSize:StyleVariable.fontSize.normal,
		color:StyleVariable.color.textTertiary,
	},
	itemDownload:{
		flex:1,
	},
	itemFontStyle:{
		fontSize:StyleVariable.fontSize.normal,
		color:StyleVariable.color.primary,
		// textAlign:'right'
	},
	itemDowImg:{
		width:15,
		height:18,
	}



})
