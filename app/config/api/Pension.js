/**
 * 描述：
 * 2017/12/31
 * 作者：高佳
 */

import HostAPI from './HostApi';
let pensionHost = HostAPI.Pension;

let PensionUrl = {
    getAllWarnMsgByMac: pensionHost + 'pad-all-room-trace',
    getAllWarnMsgByRoomId: pensionHost + 'pad--room-trace',
    getBuildingInfo: pensionHost + 'buildings',
    getUnitByBuildingId: pensionHost + 'units',
    watchRoomByBuilding: pensionHost + 'building-watch',
    watchRoomByUnit: pensionHost + 'unit-watch',
    watchRoomByFloor: pensionHost + 'floor-watch',
    watchRoomById: pensionHost + 'room-watch',
    cancelWatchRoomById: pensionHost + 'room-unwatch',
    cancelRoomByMac: pensionHost + 'unwatch',
};

export default PensionUrl;