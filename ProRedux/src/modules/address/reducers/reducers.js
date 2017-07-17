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
    TYPE_ON_INIT_MIX_OBJECT,
    TYPE_ON_UPDATE_PROVINCE_DATA,
    TYPE_ON_UPDATE_CITY_DATA,
    TYPE_ON_SELECT_PROVINCE,
    TYPE_ON_SELECT_CITY,
    TYPE_ON_SELECT_AREA
} from '../actions/actions';
import  * as apiAdress from '../api/apiAddress';


const addressInitState = {
    curPCode: '',
    curCCode: '',
    curACode: '',
    provinceArray: [],
    cityArray: [],
    areaArray: []
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
        if (obj.areaArray && obj.areaArray.length > 0) {
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
    if (obj.areaArray && obj.areaArray.length > 0) {
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
        let newObj = Object.assign({}, obj);
        newObj.curPCode = provinceCode;
        newObj.curCCode = '';
        newObj.curACode = '';
        onUpdateProvinceData(newObj);
        // throw {error:12121,msg:'sdfdsfds'};
        return newObj;
    }
    return obj
}


/**
 * 界面下拉选择市的时候调用此方法
 * @param obj
 * @param cityCode
 */
function onSelectCity(obj, cityCode) {
    if (cityCode) {
        let newObj = Object.assign({}, obj);
        newObj.curCCode = cityCode;
        newObj.curACode = '';
        onUpdateCityData(newObj);
        return newObj;
    }
    return obj;
}

/**
 * 界面下拉选择市的时候调用此方法
 * @param obj
 * @param cityCode
 */
function onSelectArea(obj, areaCode) {
    if (areaCode) {
        let newObj = Object.assign({}, obj);
        newObj.curACode = areaCode;
        return newObj;
    }
    return obj;
}


function address(state = addressInitState, action) {
    switch (action.type) {
        case TYPE_ON_INIT_MIX_OBJECT :
            return Object.assign({}, state, {
                curPCode: action.pCode,
                curCCode: action.cCode,
                curACode: action.aCode,
                provinceArray: apiAdress.fetchProvince(),
                cityArray: [],
                areaArray: []
            });
        case TYPE_ON_UPDATE_PROVINCE_DATA :
            if (state) {
                state.curPCode = action.provinceCode;
                return Object.assign({}, onUpdateProvinceData(state));
            }
            break;
        case TYPE_ON_UPDATE_CITY_DATA :
            if (state) {
                state.curCCode = action.cityCode;
                return Object.assign({}, onUpdateCityData(state));
            }
            break;
        case TYPE_ON_SELECT_PROVINCE :
            return onSelectProvince(state, action.provinceCode);
        case TYPE_ON_SELECT_CITY :
            return onSelectCity(state, action.cityCode);
        case TYPE_ON_SELECT_AREA :
            return onSelectArea(state, action.areaCode);
    }
    return state;
}

const rootReducer = combineReducers({
    address
})

export default rootReducer;