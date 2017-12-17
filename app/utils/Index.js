/**
 *
 * 2017/4/24 0024
 * 作者：高佳
 */

//basic
import basicUtil from './basic/Index';

//function
import functionUtil from './function/Index';

//plugin
import pluginUtil from './plugin/Index';

//ui
import uiUtil from './ui/Index';

module.exports = {
    ...basicUtil,
    ...functionUtil,
    ...pluginUtil,
    ...uiUtil,
};