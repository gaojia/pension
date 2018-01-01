/**
 * Created by ZHOU on 2016/8/1.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View,TouchableOpacity,TouchableWithoutFeedback,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes={
    title : PropTypes.string,
    titleColor: PropTypes.string,
    leftText:PropTypes.string,
    icon : PropTypes.string,
    iconColor : PropTypes.string,
    iconSize : PropTypes.number,
    backgroundColor: PropTypes.string,
    haveMore : PropTypes.bool,//default=false
    moreColor:PropTypes.string,
    onPress : PropTypes.func,
};

class BlockTitle extends Component {

    renderMore(haveMore){
        if(haveMore){
            return (
                <Icon name='ios-arrow-forward'
                      color={ this.props.moreColor }
                      size={this.props.imgSize||14 } />
            );
        }
    }

    renderTitleIcon(icon) {
        if(icon){
            return(
            <View style={[this.props.iconViewStyle]}>
                <Icon name={ this.props.icon }
                      color={ this.props.iconColor }
                      size={ this.props.iconSize } />
            </View>
            );
        }
        return;
    }

    renderLeftImage(img){
        if(img){
            return(
                <View style={[this.props.imageViewStyle]}>
                <Image source={img} style={[{width: 30,height: 30},this.props.imgStyle]}/>
                </View>
            );
        }
        return;
    }

    render(){
        return(
            <TouchableOpacity onPress = { this.props.onPress }>
                <View style={[styles.container,{ backgroundColor:this.props.backgroundColor, }] }>
                    <View style={ [styles.titleContainer,{ marginLeft:this.props.iconleftmarginLeft?this.props.iconleftmarginLeft:10,}] }>
                        { this.renderTitleIcon(this.props.icon)}
                        {this.renderLeftImage(this.props.leftImage)}
                        <Text style={[styles.text,{ color:this.props.titleColor?this.props.titleColor:'#333333'},this.props.textStyle]}> {this.props.title} </Text>
                    </View>
                    <View style={ styles.more }>
                        <Text style={{marginRight:5,fontSize:13,color:"#aaaaaa"}}>{this.props.leftText}</Text>
                        { this.renderMore(this.props.haveMore) }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    container:{
        height:44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',

    },
    text:{
        fontSize:14,
        marginLeft:10,

    },
    more:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:15,
    },
});

BlockTitle.propTypes = propTypes;

BlockTitle.defaultProps = {
    title : '',
    height : 40,
    iconColor: '#ff5001',
    iconSize : 20,
    backgroundColor:'#fff',
    titleColor: '#333333',
    haveMore: false,
    moreColor: '#aaaaaa',
};

export default BlockTitle;