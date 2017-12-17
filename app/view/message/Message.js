/**
 * Created by gaojie on 2017/10/30.
 * 消息列表
 * 待完善：
 * 		item的内容缺少正则判断，将电话加蓝
 * 		刷新+加载更多
 */

import React,{PureComponent} from 'react';
import {
	View,
	Text,
	SectionList,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import BaseComponent from "../../common/BaseComponent";
import StyleVariable from '../../style/StyleVariable'

let sectionData = [ // 不同section渲染相同类型的子组件
	{
		data: [{
				title:'台风预警',
				content:'2017年第21号台风（超强，台风季），兰恩，10月22日08时位于北纬27.8,东京133.7,最大风速52m/s，中心气压935hpa'
			},{
				title:'船舶预警',
				content:'TJ_01传播进入红色警戒区域，请给予通知追逐；联系电话：010123456，船长：Jack',
			}],
		time: '2017-08-09'
	},
	{
		data: [{
			title:'台风预警',
			content:'2017年第21号台风（超强，台风季），兰恩，10月22日08时位于北纬27.8,东京133.7,最大风速52m/s，中心气压935hpa'
		},{
			title:'船舶预警',
			content:'TJ_01传播进入红色警戒区域，请给予通知追逐；联系电话：010123456，船长：Jack',
		}],
		time: '2017-07-10'
	},
]

export default class Message extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			sectionSource:sectionData,
		}

	}
	render(){
		return(
			<View style={styles.container}>
				<StatusBar
					hidden={false}
					animated={false}
				/>
				<SectionList
					ListHeaderComponent={this._renderForBanner}
					keyExtractor={this._extraUniqueKey}
					renderItem={this._renderListItem}
					renderSectionHeader={this._renderSectionHeader}
					sections={this.state.sectionSource}
				/>
			</View>
		)
	}
	_renderListItem = (item,index) =>{
		return(
			<ListItem
				key={index}
				onPressItem={()=>this._onPressItem(item)}
				item={item}
			/>
		)
	}
	//key的方法
	_extraUniqueKey(item, index) {
		return "index" + index + item;
	}
	_renderSectionHeader = (data) =>{
		let section = data.section;
		return(
			<Header data={section} />
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
	}
}

class Header extends PureComponent {
	render(){
		let data = this.props.data;
		return(
			<View style={styles.headerContainer}>
				<Text style={{color:StyleVariable.color.textTertiary}}>
					{data.time}
				</Text>
			</View>
		)
	}
}
class ListItem extends PureComponent {

	render (){
		let item = this.props.item.item;
		return(
			<TouchableOpacity key={item.id}
							  style={styles.itemContainer}
							  onPress = {this.props.onPressItem}
			>
				<View style={styles.itemSubContainer}>
					<Text style={styles.itemTitle}>
						{item.title}
					</Text>
					<Text style={styles.itemContent}>
						{item.content}
					</Text>
				</View>

			</TouchableOpacity>
		)
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:StyleVariable.color.background
	},
	itemContainer:{
		flex:1,
		paddingLeft:20,
		paddingRight:20,
		paddingBottom:20,
	},
	itemSubContainer:{
		flex:1,
		padding:20,
		backgroundColor:'white',
		borderRadius:5,
	},
	itemTitle:{
		flex:1,
		marginBottom:10,
		fontSize:StyleVariable.fontSize.big,
		color:StyleVariable.color.textPrimary,
		textAlign:'center'
	},
	itemContent:{
		fontSize:StyleVariable.fontSize.normal,
		color:StyleVariable.color.textTertiary,
	},
	headerContainer:{
		height:40,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:StyleVariable.color.background
	}

})
