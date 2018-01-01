/**
 * Created by ZHOU on 2016/8/1.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const propTypes={
    title : PropTypes.string,
    height : PropTypes.number,//default:18
};

class BlockSplitBar extends React.Component {
    render(){
        return(
            <View style={[styles.container,{height:this.props.height,backgroundColor:this.props.backgroundColor}]}>
                <Text style={styles.text}> {this.props.title} </Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container:{
        backgroundColor:'#f8f8f8'
    },
    text:{
        fontSize:10,
        color:'#aaaaaa'
    },
});

BlockSplitBar.propTypes = propTypes;

BlockSplitBar.defaultProps = {
    title : '',
    height : 10,
    backgroundColor:'#f8f8f8'
};
export default BlockSplitBar;