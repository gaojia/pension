/**
 * Created by ZHOU on 2016/8/1.
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, PixelRatio} from "react-native";
import StyleVariable from "../../style/StyleVariable";
const propTypes = {
    style: View.propTypes.style,
};
export default class RowSplitLine extends React.Component {
    static propTypes = propTypes;

    render() {
        return (
            <View style={[styles.container, this.props.style]}></View>
        );
    }
}
let styles = StyleSheet.create({
    container: {
        height: 1 / PixelRatio.get(),
        backgroundColor: StyleVariable.color.divider,
    },
});