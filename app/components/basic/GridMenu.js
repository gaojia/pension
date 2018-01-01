/**
 * Created by ZHOU on 2016/8/1.
 */
import React, {Component}from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import BaseComponent from '../../common/BaseComponent';

const propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.number.isRequired,
    onPress: PropTypes.func,
};

class GridMenu extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={ [styles.container, this.props.style] }
                              onPress={this.props.onPress}
                              activeOpacity={1}>
                <View>
                    <Image style={styles.image} source={this.props.image}/>
                </View>
                <View>
                    <Text style={styles.text}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 14,
        color: '#333',
        marginTop:10
    },
    image: {
        height: 30,
        width: 30,
    },
});

GridMenu.propTypes = propTypes;

GridMenu.defaultProps = {};

export default GridMenu;