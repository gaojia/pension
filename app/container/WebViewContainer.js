/**
 * 描述：
 * 2017/10/26
 * 作者：高佳
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
	WebView,
} from 'react-native';

//本页所需参数
const propTypes = {
	showNavBar: PropTypes.bool,
	source: PropTypes.oneOfType([
		PropTypes.shape({
			/*
			 * The URI to load in the WebView. Can be a local or remote file.
			 */
			uri: PropTypes.string,
			/*
			 * The HTTP Method to use. Defaults to GET if not specified.
			 * NOTE: On Android, only GET and POST are supported.
			 */
			method: PropTypes.string,
			/*
			 * Additional HTTP headers to send with the request.
			 * NOTE: On Android, this can only be used with GET requests.
			 */
			headers: PropTypes.object,
			/*
			 * The HTTP body to send with the request. This must be a valid
			 * UTF-8 string, and will be sent exactly as specified, with no
			 * additional encoding (e.g. URL-escaping or base64) applied.
			 * NOTE: On Android, this can only be used with POST requests.
			 */
			body: PropTypes.string,
		}),
		PropTypes.shape({
			/*
			 * A static HTML page to display in the WebView.
			 */
			html: PropTypes.string,
			/*
			 * The base URL to be used for any relative links in the HTML.
			 */
			baseUrl: PropTypes.string,
		}),
		/*
		 * Used internally by packager.
		 */
		PropTypes.number,
	]),
	sendCookies: PropTypes.bool,
	onLoadStart: PropTypes.func,
	onLoad: PropTypes.func,
	onLoadEnd: PropTypes.func,
	onError: PropTypes.func,
	onProgress: PropTypes.func,
	javaScriptEnabled: PropTypes.bool,
	onMessage: PropTypes.func,
};

const defaultProps = {
	showNavBar: true,
	sendCookies: true,
	javaScriptEnabled: true,
};

export default class WebViewContainer extends Component {
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);
		this.previousUrl = this.props.source.uri;
	}

	patchPostMessageFunction = function() {
		let originalPostMessage = window.postMessage;

		let patchedPostMessage = function(message, targetOrigin, transfer) {
			originalPostMessage(message, targetOrigin, transfer);
		};

		patchedPostMessage.toString = function() {
			return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
		};

		window.postMessage = patchedPostMessage;
	};

	patchPostMessageJsCode = '(' + String(this.patchPostMessageFunction) + ')();'

	render() {
		return(
			<WebView
				{...this.props}
				ref = {(webView) => this.webView = webView}
				source = {this.props.source}
				injectedJavaScript = {this.patchPostMessageJsCode}
				sendCookies = {this.props.sendCookies}
				renderLoading = {this._renderLoading}
				onLoadStart = {this.props.onLoadStart || this._onLoadStart}
				onLoad = {this.props.onLoad || this._onLoad}
				onLoadEnd = {this.props.onLoadEnd || this._onLoadEnd}
				onError = {this.props.onError || this._onError}
				onProgress = {this.props.onProgress || this._onProgress}
				javaScriptEnabled = {this.props.javaScriptEnabled}
				onMessage = {this.props.onMessage || this._onMessage}
				onNavigationStateChange = {this._onNavigationStateChange}
			/>
		)
	}

	_onLoadStart = (event) => {
		// if(this.props.source.uri){
		// 	let url = event.nativeEvent.url;
        //
		// 	let preUrl = this.previousUrl && this.previousUrl.includes('#') ? this.previousUrl.split('#')[0]: this.previousUrl;
		// 	let curUrl = url.includes('#') ? url.split('#')[0] : url;
        //
		// 	preUrl !== curUrl
		// 		? this.loading.show()
		// 		: null;
        //
		// 	this.previousUrl = event.nativeEvent.url;
		// }
	};

	_onLoad = () => {

	};

	_onLoadEnd = () => {
		// this.loading.hide();
		this.setState({});
	};

	_onError = () => {
		// this.loading.hide();
		this.setState({});
	};

	_onProgress = () => {

	};

	_onMessage = () => {

	};

	_onNavigationStateChange = (navState) => {
		this.navigationState = {
			backButtonEnabled   : navState.canGoBack,
			forwardButtonEnabled: navState.canGoForward,
			url                 : navState.url,
			status              : navState.title,
			loading             : navState.loading,
			scalesPageToFit     : true,
		};
	};

	_goBack = () => {
		// let previousUrl = this.previousUrl.includes('#') ? this.previousUrl.split('#')[0]: this.previousUrl;
		// if(this.props.source.uri === previousUrl){
		// 	Router.jumpPop();
		// 	return;
		// }
        //
		// this.navigationState && this.navigationState.backButtonEnabled
		// 	? this.webView.goBack()
		// 	: Router.jumpPop();
	};

	_renderLoading = () => {
		//return <Loading ref={(component) => this.loading = component}/>
	}
}
