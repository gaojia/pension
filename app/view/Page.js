/**
 * 描述：
 * 2017/10/30
 * 作者：高佳
 */

// export {default as ShipList} from './ship/ShipList';
// export {default as ShipDetail} from './ship/ShipDetail';
//
// export {default as VideoDetail} from './video/VideoDetail';
// export {default as VideoPlay} from './video/VideoPlay';

import home from './HomeScreen';

import message from './message/Message';

import regionSet from './setting/RegionSet';
import setting from  './setting/Setting';
import serviceConfig from './setting/ServiceConfig';

let homePages = {
    home: home
};

let messagePages = {
    message: message
};

let settingPages = {
    regionSet: regionSet,
    setting: setting,
    serviceConfig: serviceConfig
};

export default {
    homePages: homePages,
    messagePages: messagePages,
    settingPages: settingPages
}
