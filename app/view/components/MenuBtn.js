/**
 * 描述：
 * 2017/12/20
 * 作者：高佳
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class MenuBtn extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container, this.props.container]}>
                    <Image source={this.props.imgSource}>
                    </Image>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        margin:5,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
});