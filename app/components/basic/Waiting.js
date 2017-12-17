/**
 *
 * 2017/6/14 0014
 * 作者：高佳
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Platform,
    ActivityIndicator,
} from 'react-native';
import ModalBox from './ModalBox';

export default class Waiting extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <ModalBox ref = {(component) => {this.modal = component}}
                      transparent={true}
                      swipeToClose = {false}
                      animationDuration = {0}
                      backdropColor = 'transparent'
                      backdropPressToClose = {false}
                      style={[styles.modalBoxContainer,this.props.modalStyle]} {...this.props.modalProps}>
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <ActivityIndicator
                            style={Platform.OS === 'ios' && {
                                position: 'relative',
                                left    : 1.5,
                                top     : 1.5,
                            }}
                            color='#ff6666'
                            animating={true}
                            size="large"/>
                    </View>
                </View>
            </ModalBox>
        );
    }

    show(){
        this.modal.open();
    }

    hide(){
        this.modal.close();
    }
}

let styles = StyleSheet.create({
    modalBoxContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d7d8db',
        height: 50,
        width: 50
    },
});