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
import RowSplitLine from '../../components/basic/RowSplitLine';

let sectionData = [ // 不同section渲染相同类型的子组件
	{
        data: [{
            type:2,
            title:'警报解除',
            content:'1号楼，3层，302室，警报呼叫解除',
        }],
        time: '2017-08-09 09:00:00',
	},
	{
        data: [{
            type: 1,
            title:'警报预警',
            content:'1号楼，3层，302室，进行警报呼叫'
        }],
        time: '2017-08-09 08:55:00',
	},
	{
        data: [{
            type: 2,
            title:'警报解除',
            content:'2号楼，3层，302室，进行警报呼叫'
        }],
        time: '2017-08-09 08:55:00',
    },
    {
        data: [{
            type: 1,
            title:'警报预警',
            content:'2号楼，3层，302室，进行警报呼叫'
        }],
        time: '2017-08-09 08:55:00',
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
				{/*<StatusBar*/}
					{/*hidden={false}*/}
					{/*animated={false}*/}
				{/*/>*/}
				<SectionList
					//ListHeaderComponent={this._renderForBanner}
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
			<View style={styles.itemContainer}>
				<View style={styles.itemSubContainer}>
					<Text style={[styles.itemTitle,{color: (item.type === 1 ? 'red': 'black')}]}>
						{item.title}
					</Text>
					<RowSplitLine/>
					<Text style={styles.itemContent}>
						{item.content}
					</Text>
				</View>
			</View>
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
		// padding:20,
		backgroundColor:'white',
		borderRadius:5,
	},
	itemTitle:{
		flex:1,
        padding:10,
		fontSize:StyleVariable.fontSize.big,
		color:StyleVariable.color.textPrimary,
		// textAlign:'center'
	},
	itemContent:{
        padding: 10,
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
