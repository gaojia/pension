/**
 *
 * 2017/4/27 0027
 * 作者：高佳
 */
import Api from './api/Index';
import AppConfig from './AppConfig';
import OtherConfig from './OtherConfig';
import StorageConfig from './StorageConfig';

module.exports = {
     ...Api,
    AppConfig,
    OtherConfig,
    StorageConfig,
};
