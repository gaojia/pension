/**
 * Created by ZHOU on 2016/8/2.
 */
import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Badge from './Badge';
import BaseComponent from '../../common/BaseComponent';

const propTypes={
    title : PropTypes.string.isRequired,
    icon : PropTypes.string,
    iconColor : PropTypes.string,
    iconSize : PropTypes.number,//default:14
    onPress : PropTypes.func,

    //右侧Badge
    badgeNumber: PropTypes.number,//default:-1
    badgeBackgroundColor : PropTypes.string,

    //右侧提示文本Tips
    tips : PropTypes.string,
    tipsColor:PropTypes.string,

    //字体颜色
    titleColor:PropTypes.string,
    titleSize:PropTypes.number,//default:15

    //高度
    height:PropTypes.number
};

class RowMenu extends BaseComponent {
    constructor(props) {
        super(props);
    }

    renderMoreIcon(){
        return (
            <Icon style={styles.moreIcon} name='ios-arrow-forward' color='#a7a7a7' size={14} />
        );
    }

    renderBadge(number, backgroundColor){
        if(number>0) {
            let strNumber = number>99 ? '99+' : number.toString();
            return (
                <Badge style={styles.badge} number={strNumber} backgroudColor={backgroundColor}/>
            );
        }
        return ;
    }

    renderTips(tips, tipsColor){
        if(tips) {
            return (
                <Text style={[styles.tips,{color:tipsColor}]}>{tips}</Text>
            );
        }
        return ;
    }

    renderTitleIcon(icon,iconColor, iconSize){
        if(icon) {
            return(
                <Icon style={styles.icon}
                        name={ icon }
                        color={ iconColor }
                        size={ iconSize } />
            );
        }
        return ;
    }

    render(){
        return(
            <TouchableHighlight onPress = {this.props.onPress} underlayColor='#999'>
                <View style={[styles.container,{height:this.props.height}]}>
                    <View style={styles.leftContainer}>
                        { this.renderTitleIcon(this.props.icon, this.props.iconColor, this.props.iconSize) }
                        <Text style={[styles.title,{color:this.props.titleColor,fontSize:this.props.titleSize}]}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.rightContainer}>
                        { this.renderTips(this.props.tips, this.props.tipsColor) }
                        { this.renderBadge(this.props.badgeNumber, this.props.badgeBackgroundColor) }
                        { this.renderMoreIcon() }
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

let styles = StyleSheet.create({
    container: {
     //   flex:1,
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:10,
        //backgroundColor:'#ccc',
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:10,
        //backgroundColor:'#ccc',
    },
    title: {
        fontSize: 15,
        color:'#3b3b3b',
    },
    icon:{
        marginRight:5,
    },
    moreIcon:{
        marginLeft:5,
    },
    tips:{
        fontSize: 12,
        color:'#a7a7a7',
    },
    badge:{
        paddingHorizontal:5,
    }
});

RowMenu.propTypes = propTypes;

RowMenu.defaultProps = {
    iconSize:23,
    iconColor:'#ccc',
    tips:'',
    tipsColor:'#a7a7a7',
    titleColor:'#3b3b3b',
    titleSize:15,
    badgeNumber:-1,
    height:50,
};

export default RowMenu;
