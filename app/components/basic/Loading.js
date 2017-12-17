/**
 *
 * 2017/5/12 0012
 * 作者：高佳
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Modal,
    ScrollView,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,

} from 'react-native';

export default class Loading extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    render() {
        return (
            <ScrollView refreshControl={
                   <RefreshControl
                     refreshing={this.state.visible}
                     tintColor='black'
                   />
                 }>
            </ScrollView>
        );
    }

    show(){
        this.setState({visible: true});
    }

    hide(){
        this.setState({visible: false});
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 20,
        height: 50,
        width: 50
    },
});