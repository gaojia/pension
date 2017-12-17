/**
 *功能描述：活动单项样式
 * 2017/7/3
 * 作者：年小宁
 */
import React, {Component, PropTypes, PureComponent} from "react";
import {Text, View, StyleSheet, Image, Linking,TouchableHighlight} from "react-native";
import Images from "../../common/resource/Image";
import Adapter from "../../common/function/AdapterUtil";
import StyleVariable from "../../style/StyleVariable";

const propTypes = {
    shipName: PropTypes.string.isRequired,
	captainName: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};
const defaultProps = {
    SupportNo: 0,
};

export default class ActivityListItem extends PureComponent {
    static propTypes = propTypes;
    static defaultProps = defaultProps;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this.props.onPress}
                >
                    <View style={[Adapter.SwitchSize(343, null), styles.itemContent]}>
                        <Image style={[Adapter.SwitchSize(343, 150), styles.imageStyle]}
                               resizeMode="stretch"
                               resizeMethod="resize"
                               // defaultSource={{uri: 'default_16_9'}}
                               source={this.props.coverImg ? {uri: this.props.coverImg} : Images.default_cover.source}/>
                        <View style={styles.bottomContainer}>
							<View style={styles.bottomItemContainer}>
								<View style={styles.itemContentStyle}>
									<Image source={Images.ship_icon.source} style={styles.image}/>
									<Text allowFontScalling={false} numberOfLines={1}
										  style={styles.rowTextStyle}>{this.props.shipName}</Text>
								</View>
								<View style={styles.itemContentStyle}>
									<Image source={Images.telephone.source} style={styles.image}/>
									<Text allowFontScalling={false} numberOfLines={1} onPress={() => {Linking.openURL('tel:' + this.props.telephone)}}
										  style={[styles.rowTextStyle,{color:StyleVariable.color.primary,textDecorationLine:'underline'}]}>{this.props.telephone}</Text>
								</View>
							</View>
							<View style={styles.bottomItemContainer}>
								<View style={styles.itemContentStyle}>
									<Image source={Images.ship_plate.source} style={styles.image}/>
									<Text allowFontScalling={false} numberOfLines={1}
										  style={styles.rowTextStyle}>{this.props.captainName}</Text>
								</View>
								<View style={styles.itemContentStyle}>
									<Image source={Images.location.source} style={styles.image}/>
									<Text allowFontScalling={false} numberOfLines={1}
										  style={styles.rowTextStyle}>{this.props.address}</Text>
								</View>
							</View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>

        );
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
