/**
 * Created by Lz on 2017/4/17.
 */

import React, { Component } from 'react';
import {
    StatusBar,
    Text,
    View,
    Platform,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import NavbarButton from './NavbarButton';
import OtherConfig from '../../config/OtherConfig';

const ButtonShape = {
    title: PropTypes.string.isRequired,
    style: View.propTypes.style,
    handler: PropTypes.func,
    disabled: PropTypes.bool,
};

const TitleShape = {
    title: PropTypes.string.isRequired,
    tintColor: PropTypes.string,
};

const StatusBarShape = {
    style: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    tintColor: PropTypes.string,
    hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
    showAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
};

function getButtonElement(data, style, newMsg) {

    return (
        <View style={styles.navBarButtonContainer}>
            {(!data || data.props) ? data : (
                <NavbarButton
                    title={data.title}
                    style={[data.style, style]}
                    tintColor={data.tintColor}
                    handler={data.handler}
                    accessible={data.accessible}
                    accessibilityLabel={data.accessibilityLabel}
                />
            )}
            {
                // badgeNum && badgeNum > 0
                //     ? <Badge minWidth={2}
                //              minHeight={2}
                //              extraPaddingHorizontal={2}
                //              textStyle={styles.badgeText}
                //              style={ badgeNum > 0 && badgeNum < 10 ? styles.badge1 : styles.badge2 }>
                //         {
                //             badgeNum <= 99
                //                 ? badgeNum
                //                 : '99+'
                //         }
                //       </Badge>
                //     : null
            }
            {
                newMsg 
                    ? <View style={styles.point}></View>
                    : null
            }
        </View>
    );
}

function getTitleElement(data) {
    if (!data || data.props) {
        return <View style={styles.customTitle}>{data}</View>;
    }

    const colorStyle = data.tintColor ? { color: data.tintColor } : null;

    return (
        <View style={styles.navBarTitleContainer}>
            <Text numberOfLines={1} style={[styles.navBarTitleText, data.style, colorStyle]}>
                {data.title}
            </Text>
        </View>
    );
}

export default class NavigationBar extends Component {
    static propTypes = {
        style: View.propTypes.style,
        tintColor: PropTypes.string,
        statusBar: PropTypes.shape(StatusBarShape),
        leftButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
            PropTypes.oneOf([null]),
        ]),
        rightButton: PropTypes.oneOfType([
            PropTypes.shape(ButtonShape),
            PropTypes.element,
            PropTypes.oneOf([null]),
        ]),
        title: PropTypes.oneOfType([
            PropTypes.shape(TitleShape),
            PropTypes.element,
            PropTypes.oneOf([null]),
        ]),
        containerStyle: View.propTypes.style,
    };

    static defaultProps = {
        style: {},
        tintColor: '',
        leftButton: null,
        rightButton: null,
        title: null,
        statusBar: {
            style: 'default',
            hidden: false,
            hideAnimation: 'slide',
            showAnimation: 'slide',
        },
        containerStyle: {},
    };

    componentDidMount() {
        this.customizeStatusBar();
    }

    componentWillReceiveProps() {
        this.customizeStatusBar();
    }

    customizeStatusBar() {
        const { statusBar } = this.props;
        if (statusBar.barStyle) {
            StatusBar.setBarStyle(statusBar.barStyle,true);
        }

        StatusBar.setHidden(!!statusBar.hidden, 'slide');
        if (Platform.OS == 'ios') {
            const animation = statusBar.hidden ?
               statusBar.hideAnimation : statusBar.showAnimation;

            StatusBar.showHideTransition = animation;
            StatusBar.hidden = statusBar.hidden;
        } else {
            StatusBar.setTranslucent(true);
            if(statusBar.backgroundColor) {
                StatusBar.setBackgroundColor(statusBar.backgroundColor,true);
            }
        }
    }

    render() {
        const {
            containerStyle,
            tintColor,
            title,
            leftButton,
            rightButton,
            style,
            newMsg,
        } = this.props;
        const customTintColor = tintColor ? { backgroundColor: tintColor } : null;

        const customStatusBarTintColor = this.props.statusBar.tintColor ?
            { backgroundColor: this.props.statusBar.tintColor } : null;


        //if (Platform.OS === 'ios') {
        let statusBar = !this.props.statusBar.hidden ?
                <View style={[styles.statusBar, customStatusBarTintColor]} /> : null;
        //}

        return (
            <View style={[styles.navBarContainer, containerStyle, customTintColor]}>
                {statusBar}
                <View style={[styles.navBar, style]}>
                    {getTitleElement(title)}
                    {getButtonElement(leftButton, { marginLeft: 8 })}
                    {getButtonElement(rightButton, { marginRight: 8 },newMsg)}
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        backgroundColor:'#333',
    },
    statusBar: {
        height: OtherConfig.statusBarHeight,
    },
    navBar: {
        height: OtherConfig.navBarHeight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    customTitle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 7,
        alignItems: 'center',
    },
    navBarButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    navBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarButtonText: {
        fontSize: 14,
        letterSpacing: 0.5,
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 45,
        right: 45,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleText: {
        fontSize: 17,
        letterSpacing: 0.5,
        color: '#333',
    },
    badge1: {
        top: 5,
        right: 5,
        position: 'absolute',
    },
    badge2: {
        top: 3,
        right: 3,
        position: 'absolute',
    },
    badgeText: {
        fontSize: 8
    },
    point: {
        top: 10,
        right: 16,
        width:4,
        height:4,
        borderWidth:4,
        borderRadius:4,
        borderColor:'red',
        position: 'absolute',
    },
});
