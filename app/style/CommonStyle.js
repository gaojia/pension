/**
 * 公共样式
 * 2017/7/27 0028
 * 作者：高佳
 */

import StyleVariable from "./StyleVariable";

export default class CommonStyle extends StyleVariable {

    static get color() {
        return Object.assign(super.color, {
            white: '#ffffff',
            black: '#000000',
        })
    }

    static get fontSize() {
        return Object.assign(super.color, {
            hugeBig: 19,
            superBig: 20,
        });
    }

    //屏幕背景
    static get container() {
        return {
            flex: 1,
            backgroundColor: this.color.background,
        }
    }

    static get contentContainer() {
        return {
            backgroundColor: this.color.content,
        }
    }

    //页面内容左右margin
    static get marginStyle() {
        return {
            marginHorizontal: 16,
        }
    }

    //主题背景色
    static get primaryBackgroundColor() {
        return {
            backgroundColor: this.color.primary,
        }
    }

    //主题颜色
    static get primaryColor() {
        return {
            color: this.color.primary,
        }
    }

    //分割线颜色
    static get dividerColor() {
        return {
            color: this.color.divider,
        }
    }

    //文本主题颜色
    static get textPrimaryColor() {
        return {
            color: this.color.textPrimary,
        }
    }

    //次之文本颜色
    static get textSecondaryColor() {
        return {
            color: this.color.textSecondary,
        }
    }

    //第三文本颜色
    static get textTertiaryColor() {
        return {
            color: this.color.textTertiary,
        }
    }

    //居中
    static get center() {
        return {
            alignItems: 'center',
            justifyContent: 'center',
        }
    }

    //基本按钮颜色
    static get basicBtnStyle() {
        return {
            color: this.color.white,
            backgroundColor: this.color.primary,
        }
    }

    //40dp头像
    static get headerImage40Style() {
        return {
            width: 40,
            height: 40,
            borderRadius: 20
        }
    }

    //50dp头像
    static get headerImage50Style() {
        return {
            width: 50,
            height: 50,
            borderRadius: 25
        }
    }

    //60dp头像
    static get headerImage60Style() {
        return {
            width: 60,
            height: 60,
            borderRadius: 30
        }
    }

    //76dp头像
    static get headerImage76Style() {
        return {
            width: 76,
            height: 76,
            borderRadius: 38
        }
    }

    //row方向
    static get directionRow() {
        return {
            flexDirection: 'row',
        }
    }
}
