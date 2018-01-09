/**
 * Created by gaojie on 2017/10/30.
 * 消息列表
 * 待完善：
 * 		item的内容缺少正则判断，将电话加蓝
 * 		刷新+加载更多
 */

import React,{PureComponent, Component} from 'react';
import {
	View,
	Text,
	SectionList,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	InteractionManager,
} from 'react-native';

import BaseComponent from "../../common/BaseComponent";
import StyleVariable from '../../style/StyleVariable'
import RowSplitLine from '../../components/basic/RowSplitLine';

let sectionData = [];

export default class Message extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			sectionSource:sectionData,
		}

	}

	componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.listView && this.listView.startHeaderRefreshing();
		});
	}

	render(){
		return(
			<View style={styles.container}>
				{/*<StatusBar*/}
					{/*hidden={false}*/}
					{/*animated={false}*/}
				{/*/>*/}
				{/*<SectionList*/}
					{/*//ListHeaderComponent={this._renderForBanner}*/}
					{/*keyExtractor={(item, index) => {return "index" + index + item;}}*/}
					{/*renderItem={this._renderListItem}*/}
					{/*renderSectionHeader={this._renderSectionHeader}*/}
					{/*sections={this.state.sectionSource}*/}
				{/*/>*/}
				{
                    this.renderListView({
                        style:{flex:1},
                        footerTextStyle: {fontSize:10},
                        data: this.state.sectionSource,
                        renderItem: (rowData, row, rowID) => this._renderListItem(rowData, row, rowID),
                        onHeaderRefresh: () => this._onRequestListWithReload(true),
                        onFooterRefresh: () => this._onRequestListWithReload(false)
                    })
				}
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
	};

	_renderSectionHeader = (data) =>{
		let section = data.section;
		return(
			<Header data={section} />
		)
	};

	_onPressItem = (item) =>{
		let data=item.item;
		//this.toast(data.title);
	}

    _onRequestListWithReload = (isPullDownRefresh) => {
        if (isPullDownRefresh) {
            this.state.houseWarnRecordSource = [];
            this.state.pageIndex = 1;
        } else {
            this.state.pageIndex++;
        }
        this._getRoomWarnMsg();
	};

    _getRoomWarnMsg = () => {
        this.request.sendGet({
            url: global.service + this.apis.getAllMsgByMac+`?macId=${this.mac}`,
            success: (data) => {
                if(data.code === 200){
                    this.setState({
                        sectionSource: data.message.alertHistories
                    });
                    this.listView && this.listView.endRefreshing(this.RefreshState.NoMoreData);
                }
            },
            error: () => {

            }
        })
	}
}

class Header extends Component {
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
					<Text style={[styles.itemTitle,{color: (item.deviceType === 1 ? 'red': 'black')}]}>
						{item.deviceType === 1 ? '警报预警': '警报解除'}
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
		paddingTop:20,
		overflow:'hidden',
		paddingRight:20,
		paddingLeft:20,
	},
	itemSubContainer:{
		flex:1,
		// padding:20,
		backgroundColor:'white',
		borderRadius:10,
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
