/*
 edit by GJ 20170321
 传入参数：
 defaultDate：默认时间Date类型，默认为当前时间
 ifDate: 是否显示两个时间选择器（下层为Date类型），默认false
 type :时间选择器类型，date', 'time', 'datetime，
 回调方法：
 cancleClick：点击取消的回调事件
 enterClick：点击确定的回调事件
 
*/

import React, { Component } from 'react'
import {
    Text,
    DatePickerIOS,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Modal,
    View
} from 'react-native'


class WithLabel extends Component {
    render() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.labelView}>
                    <Text style={styles.label}>
                        {this.props.label}
                    </Text>
                </View>
                {this.props.children}
            </View>
        );
    }
};
class Heading extends Component {
    render() {
        return (
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {this.props.label}
                </Text>
            </View>
        );
    }
};

class DatePickMy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.defaultDate || new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
            temDate: new Date(),
            ifDate: this.props.ifDate || false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.state.temDate = date;
        this.setState({ date: date });
    }
    //取消
    cancleClick() {
        this.props.cancleClick();
    }
    //确定
    enterClick() {
        this.props.enterClick(this.state.date);
    }
    render() {

        let ifDate = (
            this.props.ifDate ? <DatePickerIOS
                date={this.state.date}
                mode="date"
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange}
                /> : null
        )
        return (
            <Modal
                animationType='none'
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    // this._setModalVisible(false)
                } }
                >
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                    </View>
                    <View style={styles.innerContainer}>
                        <View flexDirection='row' style={{backgroundColor:'#efeff4'}}>
                            <TouchableHighlight onPress={() => this.cancleClick()} style={[styles.touchContainer,{marginLeft: 20}]}>
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ color: '#ffffff', fontSize: 15 }}>
                                        取消
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <View style={{ flex: 1,justifyContent:'center',flexDirection:'column',height:50}}>
                                <Text style={{color:'#3B3B3B',fontSize:14,textAlign:'center'}}> 请选择时间 </Text>
                            </View>

                            <TouchableHighlight onPress={() => this.enterClick()} style={[styles.touchContainer,{ marginRight: 20}]}>
                                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ color: '#ffffff', fontSize: 15 }}>
                                        确定
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <DatePickerIOS
                            date={this.state.date}
                            mode={this.props.type || 'datetime'}
                            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                            onDateChange={this.onDateChange}
                            minimumDate= {this.props.minimumDate ?this.props.minimumDate :new Date(new Date().setFullYear(1971,1,1))}
                            />
                        {ifDate}
                        {/*<DatePickerIOS
                            date={this.state.date}
                            mode="time"
                            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                            onDateChange={this.onDateChange}
                            minuteInterval={10}
                            />*/}
                    </View>

                </View>
            </Modal>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        backgroundColor: '#ffffff',
    },
    touchContainer:{
        alignItems: 'center', 
        height: 30,
        width:60, 
        backgroundColor: '#FF5001', 
        justifyContent: 'center',
        marginTop: 10, marginBottom: 10, 
        borderRadius: 5  
    },
    textinput: {
        height: 26,
        width: 50,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        padding: 4,
        fontSize: 13,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    labelView: {
        marginRight: 10,
        paddingVertical: 2,
    },
    label: {
        fontWeight: '500',
    },
    headingContainer: {
        padding: 4,
        backgroundColor: '#f6f7f8',
    },
    heading: {
        fontWeight: '500',
        fontSize: 14,
    },
});

module.exports = DatePickMy;