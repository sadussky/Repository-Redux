/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */
import {combineReducers} from 'redux';
import {
    TYPE_ON_INIT_MIX_OBJECT
    TYPE_ON_UPDATE_PROVINCE_DATA,
    TYPE_ON_UPDATE_CITY_DATA,
    TYPE_ON_SELECT_CITY,
    TYPE_ON_SELECT_AREA
} from '../actions/actions';
import  * as apiAdress from '../api/apiAddress';


function onInitMixAddressObject(action) {
    return {
        curPCode: action.pCode,
        curCCode: action.cCode,
        curACode: action.aCode,
        provinceArray: apiAdress.fetchProvince(),
        cityArray: [],
        areaArray: []
    }
}


/**
 * 省代码变化时，更新地址信息
 * @param obj like this object ::
 *  let mixedAddressObj = {
        curPCode: defProvinceCode,  //默认勾选的省份代码
        curCCode: defCityCode,//默认勾选的市代码
        curACode: defAreaCode,//默认勾选的区代码
        provinceArray: loadProvince(),
        cityArray: [],
        areaArray: []
    }
 *
 */
function onUpdateProvinceData(obj) {
    obj.curPCode = obj.curPCode ? obj.curPCode : obj.provinceArray[0].code;
    obj.cityArray = apiAdress.fetchCity(obj.curPCode);
    if (obj.cityArray && obj.cityArray.length > 0) {
        obj.curCCode = obj.curCCode ? obj.curCCode : obj.cityArray[0].code;
        obj.areaArray = apiAdress.fetchArea(obj.curCCode);
        if (obj.areaArray && obj.length > 0) {
            obj.curACode = obj.curACode ? obj.curACode : obj.areaArray[0].code;
        } else {
            obj.areaArray = [];
            obj.curACode = '';
        }
    } else {
        obj.cityArray = [];
        obj.curCCode = '';
        obj.areaArray = [];
        obj.curACode = '';
    }
    return obj;
}


/**
 * 市代码变化时，更新地址信息
 * @param obj like this object ::
 *  let mixedAddressObj = {
        curPCode: defProvinceCode,  //默认勾选的省份代码
        curCCode: defCityCode,//默认勾选的市代码
        curACode: defAreaCode,//默认勾选的区代码
        provinceArray: loadProvince(),
        cityArray: [],
        areaArray: []
    }
 *
 */
function onUpdateCityData(obj) {
    obj.areaArray = apiAdress.fetchArea(obj.curCCode);
    if (obj.areaArray && obj.length > 0) {
        obj.curACode = obj.areaArray[0].code;
    } else {
        obj.areaArray = [];
        obj.curACode = '';
    }
    return obj;
}


/**
 * 界面下拉选择省份的时候调用此方法
 * @param obj
 * @param provinceCode
 */
function onSelectProvince(obj, provinceCode) {
    if (provinceCode) {
        obj.curPCode = provinceCode;
        obj.curCCode = '';
        obj.curACode = '';
        onUpdateProvinceData(obj);
    }
    return obj;
}


/**
 * 界面下拉选择市的时候调用此方法
 * @param obj
 * @param cityCode
 */
function onSelectCity(obj, cityCode) {
    if (cityCode) {
        obj.curCCode = cityCode;
        obj.curACode = '';
        onUpdateCityData(obj);
    }
    return obj;
}

function handleAddressUpdate(state = {}, action) {
    switch (action.type) {
        case TYPE_ON_INIT_MIX_OBJECT :
            return Object.assign({}, state,
                {[action.stateHodler]: onInitMixAddressObject(action)});
        case TYPE_ON_UPDATE_PROVINCE_DATA :
            let srcObj = state[action.stateHodler];
            if (srcObj) {
                srcObj.curPCode = action.provinceCode;
                return Object.assign({}, state,
                    {[action.stateHodler]: onUpdateProvinceData(srcObj)});
            }
            break;
        case TYPE_ON_UPDATE_CITY_DATA :
            let srcObj = state[action.stateHodler];
            if (srcObj) {
                srcObj.curCCode = action.cityCode;
                return Object.assign({}, state,
                    {[action.stateHodler]: onUpdateCityData(srcObj)});
            }
            break;
        case TYPE_ON_SELECT_CITY :
            let srcObj = state[action.stateHodler];
            if (srcObj) {
                return Object.assign({}, state,
                    {[action.stateHodler]: onSelectProvince(srcObj, action.provinceCode)});
            }
            break;
        case TYPE_ON_SELECT_AREA :
            let srcObj = state[action.stateHodler];
            if (srcObj) {
                return Object.assign({}, state,
                    {[action.stateHodler]: onSelectCity(srcObj, action.cityCode)});
            }
            break;
    }
    return state;
}

const rootReducer = combineReducers({
    handleAddressUpdate,
})

export default rootReducer;