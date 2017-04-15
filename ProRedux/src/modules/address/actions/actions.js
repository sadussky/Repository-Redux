/*
 * Copyright (c) 1992-2010 by Sadu.Stephen.  ALL RIGHTS RESERVED.
 * Consult your license regarding permissions and restrictions.
 * @date 2017/04/14
 * @since v1.0.0,build,33889
 * github: https://github.com/sadussky
 * web : http:www.sadussky.com
 */

export const TYPE_ON_INIT_MIX_OBJECT = 'TYPE_ON_INIT_MIX_OBJECT';
export const TYPE_ON_UPDATE_PROVINCE_DATA = 'TYPE_ON_UPDATE_PROVINCE_DATA';
export const TYPE_ON_UPDATE_CITY_DATA = 'TYPE_ON_UPDATE_CITY_DATA';
export const TYPE_ON_SELECT_PROVINCE = 'TYPE_ON_SELECT_PROVINCE';
export const TYPE_ON_SELECT_CITY = 'TYPE_ON_SELECT_CITY';
export const TYPE_ON_SELECT_AREA = 'TYPE_ON_SELECT_AREA';
export const TYPE_PLACEHOLDER_STATE = 'address_modules_a_mixobj';


function onInitMixAddressObject(provinceCode, cityCode, areaCode) {
    return {
        type: TYPE_ON_INIT_MIX_OBJECT,
        pCode: provinceCode,
        cCode: cityCode,
        aCode: areaCode,
        stateHodler: TYPE_PLACEHOLDER_STATE
    }
}


function onUpdateProvinceData(provinceCode) {
    return {
        type: TYPE_ON_UPDATE_PROVINCE_DATA,
        provinceCode,
        stateHodler: TYPE_PLACEHOLDER_STATE
    }
}


function onUpdateCityData(cityCode) {
    return {
        type: TYPE_ON_UPDATE_CITY_DATA,
        cityCode,
        stateHodler: TYPE_PLACEHOLDER_STATE
    }
}

function onSelectProvince(provinceCode) {
    return {
        type: TYPE_ON_SELECT_PROVINCE,
        provinceCode,
        stateHodler: TYPE_PLACEHOLDER_STATE
    }
}


function onSelectCity(cityCode) {
    return {
        type: TYPE_ON_SELECT_CITY,
        cityCode,
        stateHodler: TYPE_PLACEHOLDER_STATE
    }
}

function onSelectArea(areaCode) {
    return {
        type: TYPE_ON_SELECT_AREA,
        areaCode,
        stateHodler: TYPE_PLACEHOLDER_STATE
    }
}

export {
    onInitMixAddressObject,
    onUpdateProvinceData,
    onUpdateCityData,
    onSelectProvince,
    onSelectCity,
    onSelectArea
}