/**
 * 描述：
 * 2017/12/24
 * 作者：高佳
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    PixelRatio,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

import Picker from 'react-native-picker';
import BaseComponent from '../../common/BaseComponent';
import StyleVariable from '../../style/StyleVariable'
import RowSplitLine from '../../components/basic/RowSplitLine';

export default class RegionSet extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectBuildingData: '',
            buildingData: [],
            unitData: []
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._requestData();
        });

        this.router.refresh({onRight: () => this._reset()})
    }

    componentWillUnmount() {
        Picker.hide();
    }

    render(){
        return(
            <View style= {styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.topLContainer}>
                        <TouchableOpacity style={styles.selectBuilding}
                                          onPress={() => {Picker.show();}}
                                          activeOpacity={1}>
                            <View style={{flexDirection: 'row', marginLeft: 10}}>
                                <Image {...this.images.building} style={styles.buildingImg}/>
                                <Text style={{marginLeft: 5}}>{this.state.selectBuildingData}</Text>
                            </View>
                            <Image {...this.images.select_drop} resizeMode='contain' style={styles.selectImg}/>
                        </TouchableOpacity>
                    </View>

                    {/*<View style={{flex: 0.1, height:1, transform: [{rotateZ:'90deg'}], borderWidth:1}}>*/}
                        {/*<RowSplitLine style={styles.topMContainer}/>*/}
                    {/*</View>*/}

                    <View style={styles.topRContainer}>
                        <View style= {styles.tipContainer}>
                            <View style={[styles.colorTip,{backgroundColor:'#3f51b5',}]}></View>
                            <Text style={{marginLeft: 5}}>已选房间</Text>
                        </View>
                        <View style= {[styles.tipContainer, {marginLeft: 20}]}>
                            <View style={[styles.colorTip,{backgroundColor:'#ff9800'}]}></View>
                            <Text style={{marginLeft: 5}}>未选房间</Text>
                        </View>
                    </View>
                </View>
                <ImageBackground source = {this.images.bgImage.source} resizeMode='stretch' style={{flex:1}}>
                </ImageBackground>
            </View>
        )
    }

    _requestData = async () => {
        let pickerData = [];
        let buildingData = await this._getBuildingInfo();
        if(buildingData.result) {
            this.state.buildingData = buildingData.data;
            buildingData.data.map((item) => {
                pickerData.push(item.text)
            });
            this._initPicker(pickerData);
            this.setState({
                selectBuildingData: buildingData.data.length > 0 ? buildingData.data[0].text : ''
            })
        } else {
            this.toast(buildingData.data)
        }
    };

    _initPicker = (data) => {
        Picker.init({
            pickerData: data,
            pickerTitleText: '楼栋',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: (data, index) => {
                this.toast(data + ','+ this.state.buildingData[index].value);
                this._getUnitData(this.state.buildingData[index].value);
            },
            onPickerCancel: data => {
                console.log(data);
            },
        });
    };

    _getUnitData = async (buidingId) => {
        let pickerData = [];
        let unitData = await this._getUnitInfoByBuidingId(buidingId);
        if(unitData.result) {
            this.state.unitData = unitData.data;
            unitData.data.map((item) => {
                pickerData.push(item.text)
            });
            this._showUnitPicker(pickerData);

        } else {
            this.toast(unitData.data)
        }
    };

    _showUnitPicker = (data) => {
        Picker.init({
            pickerData: data,
            pickerTitleText: '单元',
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            onPickerConfirm: (data, index) => {
                this.toast(data + ','+ this.state.unitData[index].value);

                this.setState({
                    selectBuildingData: this.state.selectBuildingData + ' ' + data
                })

            },
            onPickerCancel: data => {
                console.log(data);
            },
        });
        Picker.show();
    };

    _getBuildingInfo = () => {
        return new Promise((reslove, reject) => {
            this.request.sendGet({
                url: this.apis.getBuildingInfo,
                success: (data) => {
                    if(data.code === 200){
                        reslove({
                            result:true,
                            data: data.message
                        });
                    } else {
                        reslove({
                            result:false,
                            data: data.message
                        });
                    }

                },
                error: (err) => {reject({
                    result:false,
                    data: err
                })}
            })
        });
    };

    _getUnitInfoByBuidingId = (buidingId) => {
        if(!buidingId)
        {
            return;
        }
        return new Promise((reslove, reject) => {
            this.request.sendGet({
                url: this.apis.getUnitByBuildingId + `?buildingId=${buidingId}`,
                success: (data) => {
                    if(data.code === 200){
                        reslove({
                            result:true,
                            data: data.message
                        });
                    } else {
                        reslove({
                            result:false,
                            data: data.message
                        });
                    }

                },
                error: (err) => {reject({
                    result:false,
                    data: err
                })}
            })
        });
    };

    _reset = () => {
        this.request.sendPost({
            url: this.apis.cancelRoomByMac,
            body: {
                MacId: this.mac
            },
            success: () => {this.toast('reset success')},
            error: () => {}
        })
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleVariable.color.background,
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row'
    },
    topLContainer: {
        flex: 0.5,
        // flexDirection: 'row',
        alignItems: 'center'
    },
    topMContainer: {
        flex: 0.01,
        transform: [{rotateZ:'90deg'}]
    },
    topRContainer: {
        flex: 0.5,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1/PixelRatio.get(),
        borderColor: '#ccc'
    },
    selectBuilding: {
        flex: 1,
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth:1/PixelRatio.get(),
        borderRadius: 5,
        borderColor: '#ccc'
    },
    buildingImg: {
        width: 15,
        height: 15,
    },
    selectImg: {
        width: 10,
        height: 10,
        marginRight: 10
    },
    colorTip: {
        width:15,
        height: 15,
        backgroundColor:'#3f51b5',
        borderWidth:1,
        borderRadius:7.5
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});