/**
 * 描述：
 * 2017/11/7
 * 作者：高佳
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import { WebView } from 'react-native-webview-messaging/WebView';
import BaseComponent from '../../common/BaseComponent';

export default class Typhoon extends BaseComponent {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		this.webview.messagesChannel.on('text', text => console.log(text));
	}


	render(){
		return (
			<View style={{flex: 1}}>
				<WebView
					ref={ webview => {
						this.webview = webview;
					}}
					source={{uri: 'http://salody.cc:3003/'}}
					style={{flex: 1}}
					bounces={false}
				/>
			</View>
		)
	}
}
