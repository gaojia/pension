/**
 * Created by Lz on 2017/4/17.
 */

import React, {PropTypes} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import StyleVariable from '../../style/StyleVariable';

export default function NavbarButton(props) {
    const {
        style,
        tintColor,
        title,
        handler,
        disabled,
        accessible,
        accessibilityLabel
    } = props;

    return (
        <TouchableOpacity
            style={styles.navBarButton}
            onPress={handler}
            disabled={disabled}
            accessible={accessible}
            accessibilityLabel={accessibilityLabel}
        >
            <View style={style}>
                <Text style={[styles.navBarButtonText, {color: tintColor}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

NavbarButton.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    tintColor: PropTypes.string,
    title: PropTypes.string,
    handler: PropTypes.func,
    disabled: PropTypes.bool,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
};

NavbarButton.defaultProps = {
    style: {},
    title: '',
    tintColor: '#0076FF',
    disabled: false,
    handler: () => ({}),
};

const styles = StyleSheet.create({
    container: {
        height:40,
        marginLeft:20,
        marginRight:20,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:StyleVariable.color.primary,
    }
})
