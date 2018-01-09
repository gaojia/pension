/**
 * 描述：
 * 2017/12/31
 * 作者：高佳
 */

import HostAPI from './HostApi';
//let pensionHost = HostAPI.Pension;
let pensionHost = '/api/pad-watch/';
let PensionUrl = {
    getAllWarnMsgByMac: pensionHost + 'pad-all-room-trace',
    getAllWarnMsgByRoomId: pensionHost + 'pad--room-trace',
    getBuildingInfo: pensionHost + 'buildings',
    getUnitByBuildingId: pensionHost + 'units',
    getAllMsgByMac: pensionHost + 'pad-all-room-trace-history',
    watchRoomByBuilding: pensionHost + 'building-watch',
    watchRoomByUnit: pensionHost + 'unit-watch',
    watchRoomByFloor: pensionHost + 'floor-watch',
    watchRoomById: pensionHost + 'room-watch',
    cancelWatchRoomById: pensionHost + 'room-unwatch',
    cancelRoomByMac: pensionHost + 'unwatch',
    test: pensionHost + 'test',
};

export default PensionUrl;