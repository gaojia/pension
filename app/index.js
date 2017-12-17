/**
 * @function: app主入口
 * @desc: 进行全局配置。暂存Navigator配置
 * @author: salody on 2017/10/20
 */

import {StackNavigator} from 'react-navigation';

import HomeScreen from './view/HomeScreen'
import Typhoon from './view/Typhoon';

// 定义StackNavigator
const RouteConfigs = {
	Main: {screen: HomeScreen},
	Typhoon: {screen: Typhoon}
};

const StackNavigatorConfig = {
	initialRouterName: 'Main',
	//headerMode: 'none'
};

const App = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default App;
