/**
 * 描述：多个模块的Scene在这里合并
 * 2017/9/27
 * 作者：高佳
 */

import LoginScenes from './LoginScenes';

const Scenes = new Array().concat(
    LoginScenes,
);
export default Scenes;
