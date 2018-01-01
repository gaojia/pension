/**
 *功能描述：空白页
 * 2017/5/12
 * 作者：年小宁
 */
import React from "react";
import PropTypes from 'prop-types';
import {View, Image, StyleSheet, Text} from "react-native";
import Images from "../../common/resource/Image";
import StyleVariable from "../../style/StyleVariable";
const propTypes = {
    words: PropTypes.string,
};
export default class EmptyPage extends React.Component {
    static propTypes = propTypes;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={[styles.imageMarginStyle, this.props.style]}>
                    <Image style={styles.imageSizeStyle} {...Images.empty_page}/>
                </View>
                <View style={styles.marginTop16}>
                    <Text style={styles.textStyle}>{this.props.words}</Text>
                </View>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    imageSizeStyle: {
        width: 46,
        height: 46,
    },
    marginTop16: {
        marginTop: 16,
    },
    textStyle: {
        fontSize: StyleVariable.fontSize.normal,
        color: StyleVariable.color.textTertiary,
    },
    imageMarginStyle: {
        marginTop: 160,
    },
});
