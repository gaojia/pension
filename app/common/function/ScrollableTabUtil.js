/**
 * 描述：
 * 2017/11/2
 * 作者：高佳
 */
import React from 'react';
import {
	PixelRatio
} from 'react-native';

import BaseStyle from '../../style/StyleVariable';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default {
	render:(children = [], param = {}) => {
		let tabBarStyle = {
			style: {
				backgroundColor: BaseStyle.color.container,
				borderBottomColor: BaseStyle.color.divider,
				borderBottomWidth: 1 / PixelRatio.get(),
			},
			textStyle: {textAlign: 'center'},
			tabStyle: {
				alignItems: 'center',
				justifyContent: 'center',
				marginLeft: 2,
				marginRight: 2,
			}
		}
		let tabBar = null;
		if(children.length <= 3){
			tabBarStyle.tabStyle.paddingBottom = 0;
			tabBar = <DefaultTabBar {...tabBarStyle}/>
		} else {
			tabBar = <ScrollableTabBar {...tabBarStyle}/>
		}
		return <ScrollableTabView
			{...param}
			renderTabBar={() => tabBar}
			tabBarInactiveTextColor={BaseStyle.color.textSecondary}
			tabBarUnderlineStyle={{backgroundColor: BaseStyle.color.primary, height: 2}}
			tabBarActiveTextColor={BaseStyle.color.primary}
		>{children}</ScrollableTabView>
	}
}
