/**
 * 描述：
 * 2017/11/1
 * 作者：高佳
 */

import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';
import StyleVariable from '../../style/StyleVariable';
import Adapter from '../../common/function/AdapterUtil';
import BaseComponent from '../../common/BaseComponent';
import Images from '../../common/resource/Image';

export default class VideoDetail extends BaseComponent {
	constructor(props) {
		super(props);
	}

	render() {
		let arr = [
			<View tabLabel = "实时">
				<RealTime renderListView={this.renderListView} color={this.color}/>
			</View>
		, 	<View tabLabel = "回放">
				<PlayBack>

				</PlayBack>
			</View>
		];
		return(
			<View style={{flex:1}}>
				{
					this.renderScrollableTabView(arr)
				}
			</View>
		)
	}
}

class RealTime extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					coverImg: 'http://pic.qiantucdn.com/58pic/25/55/80/58390e0522a14_1024.jpg'
				},
				{
					coverImg: 'http://pic.qiantucdn.com/58pic/25/55/80/58390e0522a14_1024.jpg'
				},
				{
					coverImg: 'http://pic.qiantucdn.com/58pic/25/55/80/58390e0522a14_1024.jpg'
				}
			]
		};
		this.color = this.props.color;
		this.renderListView = this.props.renderListView;
	}

	componentDidMount(){
		this.listView && this.listView.startHeaderRefreshing();
	}

	render() {

		return(
			<View style={{backgroundColor: this.color.background}}>
				{
					this.renderListView({
						data: this.state.dataSource,
						renderItem: (rowData, row, rowID) => this._renderItem(rowData, row, rowID),
						onHeaderRefresh: () => this._onRequestListWithReload(true),
						onFooterRefresh: () => this._onRequestListWithReload(false)
					})
				}
			</View>
		)
	}

	_renderItem = (data) => {
		data = data.item;
		return(
			<View style={styles.itemContainer}>
				<TouchableHighlight
					underlayColor={'transparent'}
					onPress={data.onPress}
				>
					<View style={[Adapter.SwitchSize(343, null), styles.itemContent]}>
						<Image style={[Adapter.SwitchSize(343, 215), styles.imageStyle]}
							   resizeMode="stretch"
							   resizeMethod="resize"
							   source={data.coverImg ? {uri: data.coverImg} : Images.default_cover.source}/>
					</View>
				</TouchableHighlight>
			</View>
		)
	}

	_onRequestListWithReload = (isPullDownRefresh) => {
		if (isPullDownRefresh) {
			this.state.videoDataSource = [];
			this.state.pageIndex = 1;
		} else {
			this.state.pageIndex++;
		}
		// this._onFetchData();
	};
}

class PlayBack extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<View></View>
		)
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		marginVertical: 10,
		paddingLeft: 16,
		paddingRight: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemContent: {
		borderRadius: 10,
		backgroundColor: StyleVariable.color.container,
		overflow: 'hidden',
	},
	imageStyle: {
		overflow: 'hidden',
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	rowTextStyle: {
		color: StyleVariable.color.textTertiary,
		fontSize: StyleVariable.fontSize.small,
		marginRight: 6,
		marginLeft: 6,
		width: '80%'
	},
	bottomContainer: {
		height:Adapter.SwitchSize(null, 110).height,
		padding:10,
		flexDirection: 'row',
	},
	bottomItemContainer: {
		flex:0.5,
		justifyContent:'space-around'
	},
	itemStyle: {
		flex:0.5,
		justifyContent:'space-around'
	},
	itemContentStyle: {
		flexDirection:'row',
		alignItems: 'center'
	},
	image: {
		width:22,
		height:22
	},
});
