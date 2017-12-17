/**
 * 全局样式库
 * 2017/4/11
 * 作者:郭凯
 */

import Reflect from  'harmony-reflect'


// 全局的基础字体大小
const baseFontSize = 14;

export default class StyleVariable {

    // 全局颜色
    static get color(){
       return {
           container: '#ffffff',//容器背景色
           background: '#F5F7FA',//背景色
           content: '#ffffff',//内容背景色
           primary: '#1ab2ff',//主色调
           divider: '#dce1e5',//分割线
           textPrimary: '#313233',//文字主要颜色
           textSecondary: '#626466',//文字第二颜色
           textTertiary: '#939699',//文字第三颜色
           btnBackgroundColor: '#1ab2ff',//文字或按钮的红
       }
    }

    static get sizeValue(){
    	return {

			//常用间隔
			marginHuge:30,
			marginLarge: 20,
			marginMid: 10,
			marginSmall: 5
		}
	}

    // 全局文字字体大小
    static get fontSize(){
        return {
            specialBig: baseFontSize + 3,
            big: baseFontSize + 2,
            someBig: baseFontSize + 1,
            normal: baseFontSize,
            someSmall: baseFontSize - 1,
            small: baseFontSize - 2,
            mini: baseFontSize - 4,
        }
    }

    static get center(){
        return {
            alignItems:'center',
            justifyContent:'center',
        }
    }

    // 获取当前对象定义的样式集合
    static get styles(){
        let ob = this;
        let styles = {};
        while(ob){
            let mArr = Reflect.ownKeys(ob);

            mArr.map(value=>{
                if(value=="styles" || value=='color'){
                    return false;
                }
                if(typeof this[value] == "object"
                    && this[value] != null
                    && value != "prototype"){
                    styles[value] = this[value];
                }
            });

            if(ob.__proto__.hasOwnProperty('styles')){
                break;
            }

            ob = ob.__proto__;
        }

        return styles;
    }
}

